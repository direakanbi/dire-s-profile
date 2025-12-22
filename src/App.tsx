import SystemShell from "./components/SystemShell";
import ProjectGrid from "./components/ProjectGrid";
import CommandPalette from "./components/CommandPalette";
import TechStack from "./components/TechStack";
import AIChatTerminal from "./components/AIChatTerminal";
import { Terminal, Zap, Activity } from "lucide-react";

function App() {
  return (
    <SystemShell>
      <CommandPalette />
      <AIChatTerminal />
      <div className="space-y-12 pb-20">
        {/* Bento Grid Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
          {/* Main Hero Bento Block */}
          <section id="root" className="md:col-span-3 md:row-span-2 terminal-card p-8 rounded-lg flex flex-col justify-center space-y-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-terminal-green/10 border border-terminal-green-dim text-terminal-green text-[10px] font-bold uppercase tracking-widest animate-pulse">
                <Zap size={12} fill="currentColor" /> SYSTEM_LIVE
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-7xl font-black text-terminal-green tracking-tighter leading-none italic">
                DIRE <br /> <span className="text-terminal-text">AKANBI</span>
              </h1>
              <p className="text-sm md:text-lg text-terminal-text/60 leading-relaxed max-w-xl font-bold">
                FULLSTACK ENGINEER // <span className="text-terminal-green underline decoration-terminal-green/30 underline-offset-4">FRONTEND ARCHITECT</span>
              </p>
            </div>

            <p className="text-xs md:text-sm text-terminal-text/40 max-w-md leading-relaxed">
              Engineering high-performance fullstack applications and robust web architectures with
              <span className="text-terminal-green/80"> Node.js and Ruby on Rails.</span>
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/DIRE-AKANBI'S-RESUME.pdf"
                download="Dire_Akanbi_Resume.pdf"
                className="px-6 py-2 bg-terminal-green text-terminal-bg font-bold text-xs hover:bg-terminal-text transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 shadow-glow"
              >
                <Terminal size={14} /> DOWNLOAD_CV.SH
              </a>
              <button
                onClick={() => {
                  const pingSound = new Audio("https://www.soundjay.com/buttons/button-09.mp3");
                  pingSound.play().catch(() => { });
                  alert("SYSTEM PING: 24ms - CONNECTION STABLE");
                }}
                className="px-6 py-2 border border-terminal-green text-terminal-green font-bold text-xs hover:bg-terminal-green/10 transition-all active:scale-95"
              >
                PING_SYSTEM
              </button>
            </div>
          </section>

          {/* Activity / Ping Bento Block */}
          <div className="terminal-card p-6 rounded-lg flex flex-col justify-center items-center gap-4 bg-terminal-green/5 border-terminal-green shadow-glow-strong">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-terminal-green flex items-center justify-center animate-pulse">
                <Activity size={32} className="text-terminal-green" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-terminal-green rounded-full border-2 border-terminal-bg animate-ping" />
            </div>
            <div className="text-center">
              <p className="text-[10px] text-terminal-green/40 uppercase tracking-[0.2em] mb-1">Server Ping</p>
              <p className="text-2xl font-black text-terminal-green antialiased">24<span className="text-xs ml-1 opacity-50">ms</span></p>
            </div>
          </div>

          {/* Tech/Hardware Bento Block */}
        </div>

        {/* Tech Stack Section */}
        <section id="tech" className="scroll-mt-24">
          <TechStack />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectGrid />
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="pt-12 border-t border-terminal-green-dim flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-terminal-green tracking-tighter italic">INITIATE_CONTACT</h3>
            <p className="text-xs text-terminal-text/50 max-w-xs uppercase">Available for architectural consultation and fullstack application development.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:direakanbi@icloud.com" className="group">
              <div className="px-6 py-4 border border-terminal-green-dim group-hover:border-terminal-green group-hover:shadow-glow transition-all text-center rounded-lg bg-terminal-bg">
                <p className="text-[10px] text-terminal-green/40 mb-1">EMAIL_CHANNEL</p>
                <p className="text-xs font-bold text-terminal-text uppercase tracking-widest">DIREAKANBI@ICLOUD.COM</p>
              </div>
            </a>
            <a href="tel:09015329612" className="group">
              <div className="px-6 py-4 border border-terminal-green-dim group-hover:border-terminal-green group-hover:shadow-glow transition-all text-center rounded-lg bg-terminal-bg">
                <p className="text-[10px] text-terminal-green/40 mb-1">SECURE_LINE</p>
                <p className="text-xs font-bold text-terminal-text uppercase tracking-widest">09015329612</p>
              </div>
            </a>
            <div className="px-6 py-4 border border-terminal-green-dim text-center rounded-lg bg-terminal-bg">
              <p className="text-[10px] text-terminal-green/40 mb-1">UPLINK_STATUS</p>
              <p className="text-xs font-bold text-terminal-text">127.0.0.1 // ESTABLISHED</p>
            </div>
          </div>
        </footer>
      </div>
    </SystemShell>
  );
}

export default App;
