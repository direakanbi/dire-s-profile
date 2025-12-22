export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    githubUrl: string;
    uptime: string;
    version: string;
    status: "ONLINE" | "MAINTENANCE" | "DEPRECATED";
}

export const PROJECTS: Project[] = [
    {
        id: "quickrun-bot",
        title: "QuickRun-Bot",
        description: "Messaging service for logistics operations featuring Paystack integration and automated messaging workflows.",
        tags: ["JavaScript", "Paystack", "WPPConnect", "Node.js"],
        githubUrl: "https://github.com/direakanbi/quickrun-bot",
        uptime: "99.8%",
        version: "1.4.2",
        status: "ONLINE"
    },
    {
        id: "wespa",
        title: "WESPA-Core",
        description: "A comprehensive revamp of the WESPA platform, serving as a global community hub for Scrabble enthusiasts.",
        tags: ["TypeScript", "React", "Node.js", "Systems"],
        githubUrl: "https://github.com/direakanbi/WESPA",
        uptime: "99.9%",
        version: "2.0.1",
        status: "ONLINE"
    },
    {
        id: "hydra-sec",
        title: "Hydra-Security",
        description: "Intelligent, open-source security agent designed to redefine automated application vulnerability testing.",
        tags: ["Python", "Security", "Automation"],
        githubUrl: "https://github.com/direakanbi/hydra",
        uptime: "99.2%",
        version: "0.8.5-alpha",
        status: "ONLINE"
    },
    {
        id: "wuckman-brand",
        title: "WUCKMAN-Store",
        description: "E-commerce platform for a clothing brand, built with a focus on modern UI and seamless user experience.",
        tags: ["TypeScript", "E-commerce", "React"],
        githubUrl: "https://github.com/direakanbi/WUCKMAN",
        uptime: "99.7%",
        version: "1.2.0",
        status: "ONLINE"
    },
    {
        id: "excel-scanner",
        title: "Excel-Scanner-Total",
        description: "Specialized inventory management tool for rapid stock keeping and Excel data synchronization.",
        tags: ["JavaScript", "IndexedDB", "Excel-JS"],
        githubUrl: "https://github.com/direakanbi/excel-scanner-total",
        uptime: "98.9%",
        version: "1.0.8",
        status: "ONLINE"
    },
    {
        id: "classify-api",
        title: "Classify-Math-API",
        description: "RESTful API that analyzes numeric properties and provides cultural/historical fun facts for data sets.",
        tags: ["JavaScript", "API", "Node.js"],
        githubUrl: "https://github.com/direakanbi/classify-api",
        uptime: "100%",
        version: "1.1.0",
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
