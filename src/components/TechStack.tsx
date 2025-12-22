import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Network, Code, Terminal, ChevronRight, Layers } from "lucide-react";
import { SKILLS } from "../data";

const TechStack: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const getIcon = (category: string) => {
        switch (category) {
            case "LANGUAGES": return <Code size={18} />;
            case "BACKEND_FRAMEWORKS": return <Layers size={18} />;
            case "DATABASES": return <Database size={18} />;
            case "APIS_INTEGRATIONS": return <Network size={18} />;
            case "TOOLS_METHODS": return <Terminal size={18} />;
            default: return <Cpu size={18} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <Cpu className="text-terminal-green animate-pulse" size={24} />
                <h2 className="text-2xl font-black text-terminal-green tracking-tighter">
                    SYSTEM_MODULES // <span className="text-terminal-text/60">TECH_STACK</span>
                </h2>
                <div className="h-px flex-1 bg-terminal-green-dim/50 ml-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SKILLS.map((skillGroup, index) => (
                    <motion.div
                        key={skillGroup.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                        onMouseEnter={() => setActiveCategory(skillGroup.category)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <div className="absolute -inset-0.5 bg-terminal-green/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative h-full bg-terminal-bg border border-terminal-green-dim group-hover:border-terminal-green p-5 rounded-lg transition-all duration-300 flex flex-col">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-4 border-b border-terminal-green-dim/30 pb-2">
                                <div className="flex items-center gap-2 text-terminal-green">
                                    {getIcon(skillGroup.category)}
                                    <span className="font-bold text-xs tracking-widest">{skillGroup.category}</span>
                                </div>
                                <span className="text-[9px] text-terminal-green/40 font-mono">
                                    MOD_ID: 0{index + 1}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="space-y-2 flex-1">
                                {skillGroup.items.map((item) => (
                                    <div key={item} className="flex items-center gap-2 group/item">
                                        <ChevronRight size={12} className="text-terminal-green/30 group-hover/item:text-terminal-green transition-colors" />
                                        <span className="text-sm text-terminal-text/70 group-hover/item:text-terminal-text transition-colors font-mono">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer / Status */}
                            <div className="mt-4 pt-3 border-t border-terminal-green-dim/20 flex justify-between items-center">
                                <span className="text-[9px] text-terminal-green/40 uppercase">
                                    {skillGroup.items.length} MODULES LOADED
                                </span>
                                <div className={`w-2 h-2 rounded-full ${activeCategory === skillGroup.category ? 'bg-terminal-green animate-ping' : 'bg-terminal-green/20'}`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Terminal Output Simulation */}
            <div className="mt-8 p-4 rounded bg-black/40 border border-terminal-green-dim/30 font-mono text-xs overflow-hidden">
                <div className="flex gap-2 text-terminal-green/50 mb-2 border-b border-terminal-green-dim/20 pb-1">
                    <Terminal size={12} />
                    <span>KERNEL_LOGS</span>
                </div>
                <div className="space-y-1">
                    <p className="text-terminal-text/60">
                        <span className="text-terminal-green">root@dire-sys:~$</span> check_dependencies --verbose
                    </p>
                    {activeCategory ? (
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-terminal-green/80"
                        >
                            {`> ANALYZING ${activeCategory}...\n> [OK] ALL MODULES OPERATIONAL\n> OPTIMIZED FOR HIGH-PERFORMANCE`}
                        </motion.div>
                    ) : (
                        <p className="text-terminal-text/40 italic">
                            Waiting for module selection... (Hover to inspect)
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechStack;
