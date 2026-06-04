import ProjectGrid from "./components/ProjectGrid";
import { SOCIAL_LINKS } from "./data";
import { ArrowUpRight } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col items-center">
      <div className="w-full max-w-2xl px-6 py-20 md:py-32 space-y-16 fade-in">
        
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-accent-white">
            dire akanbi
          </h1>
          <p className="text-sm font-mono text-text-muted tracking-wider">
            systems & software
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-6 text-[15px] leading-relaxed text-text-secondary font-light">
          <p>
            I’m interested in building resilient systems and understanding how data moves, so most of my work sits somewhere between backend engineering, system architecture, and developer experience, and I like creating software that is quiet, reliable, and built to scale.
          </p>
          <p>
            My background is grounded in practical cybersecurity forensics and risk analysis. This training forces me to think defensively. I look at systems through the lens of secure architecture and vulnerability mitigation. To me, good design is as much about what you keep out as what you let in.
          </p>
          <p>
            Right now, I’m focused on building autonomous AI agents, multi tenant architectures, and tools that reduce developer friction. Most of what I ship solves specific infrastructural headaches, whether that is automating B2B lead generation with ScoutLine, eliminating environment drift with Sentinel Gateway, or routing logistics on QuickRun. I also contribute to Odysseus, an open source self hosted AI workspace.
          </p>
          <p className="text-text-muted">
            This site is a collection of my work, thoughts, and experiments.
          </p>
        </section>

        {/* Projects Section */}
        <section className="pt-4">
          <ProjectGrid />
        </section>

        {/* Interests Section */}
        <section className="space-y-4 pt-4">
          <h2 className="text-xs font-bold tracking-[0.2em] text-text-muted uppercase font-heading">
            Interests
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary font-light">
            Outside of building systems, I spend a lot of time researching zero-day exploits. I'm also a big believer in building in public, sharing the friction and decisions that go into shipping software. In my spare time, I enjoy playing video games and engaging in football banter. I'm a massive Manchester United fan, with a somewhat obscure appreciation for unpacking fresh white socks.
          </p>
        </section>

        {/* Connect Section / Footer */}
        <footer className="space-y-6 pt-10 border-t border-border-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xs font-bold tracking-[0.2em] text-text-muted uppercase font-heading">
                Connect
              </h2>
              <p className="text-xs text-text-muted font-light">
                Feel free to reach out for collaboration or technical chat.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <a 
                href={SOCIAL_LINKS.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-secondary hover:text-accent-white inline-flex items-center gap-0.5 hover:underline transition-colors"
              >
                GitHub <ArrowUpRight size={12} className="opacity-45" />
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-secondary hover:text-accent-white inline-flex items-center gap-0.5 hover:underline transition-colors"
              >
                LinkedIn <ArrowUpRight size={12} className="opacity-45" />
              </a>
              <a 
                href={SOCIAL_LINKS.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-secondary hover:text-accent-white inline-flex items-center gap-0.5 hover:underline transition-colors"
              >
                X <ArrowUpRight size={12} className="opacity-45" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between text-[11px] text-text-muted font-mono pt-4">
            <div>
              <span>Email: </span>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-text-secondary transition-colors underline">
                {SOCIAL_LINKS.email}
              </a>
            </div>
            <div>
              <span>© {new Date().getFullYear()} Dire Akanbi</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
