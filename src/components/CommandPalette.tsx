import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, Cpu, Server, Globe } from "lucide-react";

const COMMANDS = [
    { id: "root", label: "Go to /root", icon: <Terminal size={14} />, cmd: "cd /root" },
    { id: "projects", label: "View Projects", icon: <Server size={14} />, cmd: "ls /var/www" },
    { id: "tech", label: "Inspect Tech Stack", icon: <Cpu size={14} />, cmd: "cat /etc/tech" },
    { id: "contact", label: "Establish Connection", icon: <Globe size={14} />, cmd: "ping direakanbi.dev" },
];

const CommandPalette: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const filteredCommands = COMMANDS.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.cmd.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-terminal-bg/80 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-lg bg-terminal-bg border border-terminal-green shadow-glow-strong rounded overflow-hidden pointer-events-auto"
                    >
                        <div className="flex items-center px-4 py-3 border-b border-terminal-green-dim">
                            <Search size={18} className="text-terminal-green/50 mr-3" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="EXECUTE COMMAND..."
                                className="flex-1 bg-transparent border-none outline-none text-terminal-green placeholder:text-terminal-green/30 text-sm font-mono"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center gap-1 text-[10px] text-terminal-green/30 ml-4">
                                <kbd className="border border-terminal-green-dim px-1 rounded">ESC</kbd>
                                <span>TO CLOSE</span>
                            </div>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto p-2">
                            {filteredCommands.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredCommands.map((cmd) => (
                                        <button
                                            key={cmd.id}
                                            className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-terminal-green/10 group transition-colors text-left"
                                            onClick={() => {
                                                const elementId = cmd.id;
                                                const element = document.getElementById(elementId);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: "smooth" });
                                                }
                                                setIsOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-terminal-green/50 group-hover:text-terminal-green">
                                                    {cmd.icon}
                                                </div>
                                                <span className="text-sm text-terminal-text/80 group-hover:text-terminal-text">
                                                    {cmd.label}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-terminal-green/30 font-mono italic">
                                                {cmd.cmd}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-terminal-green/30 text-xs">
                                    NO COMMANDS MATCHING "{query.toUpperCase()}"
                                </div>
                            )}
                        </div>

                        <div className="bg-terminal-green/5 px-4 py-2 border-t border-terminal-green-dim flex items-center justify-between text-[9px] text-terminal-green/40 uppercase tracking-widest">
                            <span>System Control v1.0.4</span>
                            <span>Root Access Granted</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
