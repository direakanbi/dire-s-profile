import type { Project } from "../data";
import { PROJECTS } from "../data";
import { ExternalLink, Github, Code, CheckCircle2, AlertCircle, Server } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const statusColor = {
        ONLINE: "text-terminal-green",
        MAINTENANCE: "text-amber-400",
        DEPRECATED: "text-red-400",
    }[project.status];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="terminal-card rounded overflow-hidden group"
        >
            <div className="bg-terminal-green/5 border-b border-terminal-green-dim p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Code size={14} className="text-terminal-green/60" />
                    <span className="font-bold text-sm tracking-tight">{project.title}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                    <span className={`flex items-center gap-1 ${statusColor}`}>
                        {project.status === "ONLINE" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                        {project.status}
                    </span>
                </div>
            </div>

            <div className="p-4 space-y-4">
                <p className="text-xs text-terminal-text/70 leading-relaxed min-h-[40px]">
                    {project.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-terminal-green/40 uppercase tracking-widest border-y border-terminal-green-dim/20 py-3">
                    <div className="flex flex-col gap-1">
                        <span>UPTIME</span>
                        <span className="text-terminal-green font-bold">{project.uptime}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span>VERSION</span>
                        <span className="text-terminal-text">{project.version}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-terminal-green/10 text-terminal-green text-[9px] rounded border border-terminal-green-dim/30">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-terminal-green-dim hover:bg-terminal-green hover:text-terminal-bg text-xs font-bold transition-all active:scale-95"
                    >
                        <Github size={14} /> SOURCE_CODE
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 border border-terminal-green-dim hover:bg-terminal-green/10 text-terminal-green transition-all active:scale-95"
                    >
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectGrid: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-terminal-green flex items-center gap-2">
                        <Server size={20} /> ACTIVE_SERVICES
                    </h3>
                    <p className="text-xs text-terminal-green/40">Listing deployed project instances and health metrics</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-[10px] text-terminal-green/60">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-terminal-green" /> ONLINE
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-amber-400" /> MAINT
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PROJECTS.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </div>
    );
};

export default ProjectGrid;
