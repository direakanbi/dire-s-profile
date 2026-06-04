export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    uptime?: string;
    version?: string;
    status?: "ONLINE" | "MAINTENANCE" | "DEPRECATED";
    isContribution?: boolean;
}

export const PROJECTS: Project[] = [
    {
        id: "scoutline",
        title: "ScoutLine",
        description: "An autonomous B2B lead generation agent built to automate prospecting, data enrichment, and outreach workflows.",
        tags: ["Node.js", "AI Agents", "TypeScript", "Automation"],
        githubUrl: "https://github.com/direakanbi/scoutline",
        status: "ONLINE"
    },
    {
        id: "sentinel-gateway",
        title: "Sentinel Gateway",
        description: "An npm package designed to eliminate environment drift for developers by ensuring strict environment synchronization.",
        tags: ["TypeScript", "Node.js", "DevEx", "CLI"],
        githubUrl: "https://github.com/direakanbi/sentinel-gateway",
        status: "ONLINE"
    },
    {
        id: "quickrun",
        title: "QuickRun",
        description: "A multi tenant logistics and dispatch platform featuring automated routing and secure payment integrations.",
        tags: ["Laravel", "React", "Node.js", "MySQL"],
        liveUrl: "https://quickrun.com.ng",
        status: "ONLINE"
    },
    {
        id: "odysseus",
        title: "Odysseus",
        description: "An open source, self hosted AI workspace designed for running agentic tasks locally. Contributed to core logic and execution boundaries.",
        tags: ["Python", "Docker", "AI Agents", "Open Source"],
        githubUrl: "https://github.com/direakanbi/odysseus",
        isContribution: true,
        status: "ONLINE"
    },
    {
        id: "wespa-core",
        title: "WESPA Core",
        description: "A comprehensive revamp of the WESPA platform, serving as a global community hub for tournament Scrabble players.",
        tags: ["TypeScript", "React", "Node.js", "Systems"],
        githubUrl: "https://github.com/direakanbi/WESPA",
        status: "ONLINE"
    },
    {
        id: "hydra-sec",
        title: "Hydra Security",
        description: "An intelligent security testing agent designed to automate web application vulnerability scanning and threat modeling.",
        tags: ["Python", "Security", "Automation", "Forensics"],
        githubUrl: "https://github.com/direakanbi/hydra",
        status: "ONLINE"
    }
];

export const SKILLS = [
    { category: "LANGUAGES", items: ["NodeJS", "Go (Golang)", "Python", "TypeScript", "JavaScript", "Ruby"] },
    { category: "BACKEND_FRAMEWORKS", items: ["Express.js", "Django", "Ruby on Rails", "Gin (Go)", "FastAPI"] },
    { category: "DATABASES", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"] },
    { category: "APIS_INTEGRATIONS", items: ["RESTful APIs", "GraphQL", "WebSockets", "gRPC", "Paystack"] },
    { category: "TOOLS_METHODS", items: ["Git", "GitHub", "Webpack", "Agile (Scrum/Kanban)", "System Architecture"] }
];

export const SOCIAL_LINKS = {
    github: "https://github.com/direakanbi",
    linkedin: "https://www.linkedin.com/in/dire-akanbi-800834402/",
    twitter: "https://x.com/lamidi_a3",
    email: "direakanbi@icloud.com",
    phone: "09015329612"
};
