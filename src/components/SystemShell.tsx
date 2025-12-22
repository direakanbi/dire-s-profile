import React, { useState, useEffect } from "react";
import { Terminal, Activity, Server, Cpu, Command as CommandIcon, Github, Mail, Linkedin, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemShellProps {
  children: React.ReactNode;
}

const SystemShell: React.FC<SystemShellProps> = ({ children }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`].slice(-20));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      addLog(`NAVIGATION: ACCESSING /${id}`);
    } else {
      addLog(`ERROR: NODE /${id} NOT FOUND`);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // the boot logs
    const bootSequence = [
      "Initializing System Core...",
      "Loading kernel modules...",
      "Mounting user profile: direakanbi",
      "Establishing secure connection...",
      "READY."
    ];

    bootSequence.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-8));
      }, i * 500);
    });

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-terminal-bg text-terminal-text font-mono selection:bg-terminal-green selection:text-terminal-bg">
      <div className="crt-overlay" />
      <div className="scanline" />

      {/* Header / Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-10 border-b border-terminal-green-dim bg-terminal-bg/80 backdrop-blur-md z-40 flex items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-terminal-green">
            <Terminal size={14} />
            <span className="font-bold">SYSTEM_OS v1.0.4</span>
          </div>
          <div className="flex items-center gap-2 text-terminal-green/60">
            <Activity size={14} />
            <span>CPU: 12%</span>
          </div>
          <div className="flex items-center gap-2 text-terminal-green/60 uppercase">
            <Server size={14} />
            <span>Local Node: dires-profile</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>{currentTime.toLocaleString()}</span>
          <div className="flex items-center gap-3">
            <a href="https://github.com/direakanbi" target="_blank" rel="noreferrer" className="hover:text-terminal-green transition-colors">
              <Github size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-terminal-green transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="mailto:direakanbi@icloud.com" className="hover:text-terminal-green transition-colors">
              <Mail size={16} />
            </a>
            <a href="tel:09015329612" className="hover:text-terminal-green transition-colors">
              <Phone size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex pt-10 min-h-screen">
        {/* Sidebar / Nav */}
        <nav className="w-16 md:w-64 border-r border-terminal-green-dim flex flex-col p-2 gap-2 h-[calc(100vh-40px)] sticky top-10">
          <div className="px-2 py-4 mb-4 hidden md:block">
            <h2 className="text-xl font-black text-terminal-green flex items-center gap-2">
              <Cpu className="animate-pulse" /> DIRE_AKANBI
            </h2>
            <p className="text-[10px] text-terminal-green/40 mt-1 uppercase tracking-widest">Fullstack Engineer // Frontend Architect</p>
          </div>

          {[
            { id: "root", label: "/root", icon: <Terminal size={18} /> },
            { id: "projects", label: "/var/www/projects", icon: <Server size={18} /> },
            { id: "tech", label: "/etc/tech-stack", icon: <Cpu size={18} /> },
            { id: "contact", label: "/var/log/contact", icon: <Activity size={18} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center gap-3 px-3 py-2 rounded border border-transparent hover:border-terminal-green-dim hover:bg-terminal-green/5 text-terminal-green/70 hover:text-terminal-green transition-all group overflow-hidden active:scale-95"
            >
              {item.icon}
              <span className="hidden md:inline whitespace-nowrap">{item.label}</span>
            </button>
          ))}

          <div className="mt-auto px-2 mb-2 hidden md:block w-full">
            <div className="terminal-card rounded p-2 text-[9px] opacity-90 border border-terminal-green-dim/30 bg-black/40">
              <div className="flex items-center justify-between mb-2 border-b border-terminal-green-dim/30 pb-1">
                <span className="text-terminal-green/50 font-bold">SYSTEM_LOGS.EXE</span>
                <Activity size={10} className="text-terminal-green/50" />
              </div>
              <div className="space-y-1 overflow-y-auto h-48 scrollbar-thin scrollbar-thumb-terminal-green/20 scrollbar-track-transparent">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-terminal-green shrink-0 tracking-tighter break-all whitespace-pre-wrap">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="md:flex hidden items-center justify-between text-[10px] text-terminal-green/40 border-t border-terminal-green-dim/30 pt-4">
              <span>STATUS: ONLINE</span>
              <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 relative overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* Activity Log Dashboard (Bottom Right Floating) */}

        </main>
      </div>

      {/* Shortcut Indicator */}
      <div className="fixed bottom-4 left-4 text-[10px] text-terminal-green/30 flex items-center gap-2 bg-terminal-bg/50 px-2 py-1 rounded">
        <CommandIcon size={10} />
        <span>PRESS <kbd className="border border-terminal-green-dim px-1 rounded mx-1">CTRL</kbd> + <kbd className="border border-terminal-green-dim px-1 rounded">K</kbd> TO NAVIGATE COMMANDS</span>
      </div>
    </div>
  );
};

export default SystemShell;
