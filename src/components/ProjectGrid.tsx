import React from "react";
import { PROJECTS } from "../data";
import { ArrowUpRight } from "lucide-react";

const ProjectGrid: React.FC = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-xs font-bold tracking-[0.2em] text-text-muted uppercase font-heading">
                SELECTED WORK
            </h2>
            <div className="space-y-10">
                {PROJECTS.map((project) => {
                    const projectLink = project.liveUrl || project.githubUrl;
                    return (
                        <div 
                            key={project.id} 
                            className="group flex flex-col space-y-2 transition-all duration-300"
                        >
                            <div className="flex items-center gap-2">
                                <h3 className="font-heading font-medium text-lg text-text-primary group-hover:text-accent-white transition-colors duration-200">
                                    {projectLink ? (
                                        <a 
                                            href={projectLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="hover:underline inline-flex items-center gap-1"
                                        >
                                            {project.title}
                                            <ArrowUpRight size={14} className="text-text-muted opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                                        </a>
                                    ) : (
                                        project.title
                                    )}
                                </h3>
                                {project.isContribution && (
                                    <span className="text-[9px] uppercase tracking-widest text-text-muted border border-border-subtle px-1.5 py-0.5 rounded font-sans font-medium">
                                        Contributor
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-text-secondary text-sm leading-relaxed max-w-xl font-light">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted font-mono font-light">
                                {project.tags.map((tag) => (
                                    <span key={tag}>#{tag.toLowerCase()}</span>
                                ))}
                            </div>
                            
                            {project.liveUrl && project.githubUrl && (
                                <div className="flex gap-4 text-xs font-light pt-1">
                                    <a 
                                        href={project.githubUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-text-muted hover:text-text-primary underline transition-colors"
                                    >
                                        Source code
                                    </a>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectGrid;
