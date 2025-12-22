import { PROJECTS } from "../data";

// --- NLP UTILITIES (Simulated) ---

// 1. Tokenization & Normalization
const tokenize = (text: string): string[] => {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/)
        .filter((word) => word.length > 2); // Filter out tiny words
};

// 2. Stop words to ignore
const STOP_WORDS = new Set([
    "the", "and", "is", "a", "to", "of", "in", "for", "with", "on", "at", "my", "me", "i", "what", "how", "who", "where", "when", "why", "can", "you", "tell", "about"
]);

// 3. Corpus Data (The "Knowledge Base")
const KNOWLEDGE_BASE = [
    {
        id: "bio",
        keywords: ["who", "dire", "akanbi", "yourself", "background", "bio", "profile", "resume", "cv", "introduction"],
        content: "I am Dire Akanbi, a Dedicated Backend Web Developer with extensive experience in building scalable, high-performance server-side applications. I specialize in NodeJS, Go, and Python, with a strong focus on robust APIs and system architecture."
    },
    {
        id: "contact",
        keywords: ["contact", "email", "phone", "reach", "hire", "message", "call", "mail"],
        content: "You can reach me securely via encrypted channel: direakanbi@icloud.com or via secure line: 09015329612. I am also available on GitHub."
    },
    {
        id: "skills",
        keywords: ["skills", "stack", "tech", "technology", "languages", "frameworks", "tools", "database", "cloud", "aws", "docker"],
        content: `My technical arsenal includes:
• Languages: NodeJS, Go (Golang), Python, TypeScript, Ruby
• Frameworks: Express.js, Django, Ruby on Rails, Gin
• Infrastructure: AWS, Docker, Kubernetes, CI/CD`
    },
    {
        id: "experience",
        keywords: ["experience", "work", "job", "history", "career", "microverse", "fidelity", "mastercard"],
        content: "My professional log includes roles as a Code Reviewer and Mentor at Microverse, where I guided junior devs and reviewed backend code. I also completed high-level job simulations for Mastercard (Cybersecurity) and Fidelity Investments."
    }
];

// Add Projects to Knowledge Base dynamically
PROJECTS.forEach(p => {
    KNOWLEDGE_BASE.push({
        id: `project-${p.id}`,
        keywords: [...tokenize(p.title), ...tokenize(p.description), ...p.tags.map(t => t.toLowerCase()), "project", "app", "built"],
        content: `[PROJECT: ${p.title}] ${p.description} (Tech: ${p.tags.join(", ")}) - Status: ${p.status}`
    });
});


// --- THE ENGINE ---

export interface AIResponse {
    text: string;
    confidence: number;
    source?: string;
}

export const processLocalQuery = (query: string): AIResponse => {
    const tokens = tokenize(query).filter(t => !STOP_WORDS.has(t));

    if (tokens.length === 0) {
        return {
            text: "INPUT_NULL: Please provide a valid query parameter.",
            confidence: 0
        };
    }

    // Scoring Algorithm
    let bestMatch = { id: "", score: 0, content: "" };

    KNOWLEDGE_BASE.forEach(doc => {
        let score = 0;
        tokens.forEach(token => {
            // Exact keyword match
            if (doc.keywords.includes(token)) score += 3;
            // Partial match (fuzzy)
            else if (doc.keywords.some(k => k.includes(token))) score += 1;
        });

        if (score > bestMatch.score) {
            bestMatch = { id: doc.id, score, content: doc.content };
        }
    });

    // Threshold check
    if (bestMatch.score >= 2) {
        return {
            text: bestMatch.content,
            confidence: Math.min(bestMatch.score / 10, 1.0), // Normalize roughly
            source: "LOCAL_DB"
        };
    }

    return {
        text: "QUERY_UNRESOLVED: Data not found in local index. I can tell you about my 'Skills', 'Projects', or 'Background'.",
        confidence: 0,
        source: "SYSTEM_FALLBACK"
    };
};

export type AIProvider = "openai" | "gemini" | "claude";

export const processCloudQuery = async (query: string, apiKey: string, provider: AIProvider = "openai"): Promise<AIResponse> => {
    try {
        const systemContext = `
        You are an advanced AI assistant representing Dire Akanbi (Fullstack Engineer). 
        CONTEXT:
        - Name: Dire Akanbi
        - Role: Fullstack Engineer // Frontend Architect
        - Contact: direakanbi@icloud.com | 09015329612
        - Stack: Node.js, Ruby on Rails, React, TypeScript, Go.
        PROJECTS:
        ${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.tags.join(", ")})`).join("\n")}
        INSTRUCTIONS:
        - Answer as if you are Dire's digital assistant (System v2.0).
        - Keep answers concise, technical, and slightly "cyberpunk".
        - If asked about contact, provide his email/phone.
        `;

        let url = "";
        let body: any = {};
        let headers: any = { "Content-Type": "application/json" };

        if (provider === "openai") {
            url = "https://api.openai.com/v1/chat/completions";
            headers["Authorization"] = `Bearer ${apiKey}`;
            body = {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemContext },
                    { role: "user", content: query }
                ],
                temperature: 0.7,
                max_tokens: 150
            };
        } else if (provider === "claude") {
            url = "https://api.anthropic.com/v1/messages";
            headers["x-api-key"] = apiKey;
            headers["anthropic-version"] = "2023-06-01";
            headers["anthropic-dangerously-allow-browser"] = "true"; // Required for client-side demo
            body = {
                model: "claude-3-haiku-20240307",
                max_tokens: 150,
                system: systemContext,
                messages: [{ role: "user", content: query }]
            };
        } else if (provider === "gemini") {
            url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
            body = {
                contents: [{
                    parts: [{ text: `${systemContext}\n\nUSER QUERY: ${query}` }]
                }]
            };
        }

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.error?.message || JSON.stringify(data.error) || "Connection refused by uplink.";
            throw new Error(errorMsg);
        }

        let outputText = "";
        if (provider === "openai") outputText = data.choices[0].message.content;
        else if (provider === "claude") outputText = data.content[0].text;
        else if (provider === "gemini") outputText = data.candidates[0].content.parts[0].text;

        return {
            text: outputText,
            confidence: 1.0,
            source: `${provider.toUpperCase()}_UPLINK`
        };

    } catch (error: any) {
        return {
            text: `Connect Error: ${error.message}. Checking local database...`,
            confidence: 0,
            source: "SYSTEM_ERROR"
        };
    }
};
