import { useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Search,
  Shield,
  Terminal,
  Map,
  FlaskConical,
  Lock,
  Menu,
  X,
  CircleDot,
} from "lucide-react";
import { profile, projects, skills, journey } from "./config";
import Swarm from "./Swarm";

// Lucide 1.x removed brand icons, so the GitHub mark is inline here.
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const categories = ["All", "Security", "Learning", "Web App"];
const categoryIcon = { Security: Shield, Learning: Map, "Web App": Terminal };

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionOn, setMotionOn] = useState(true);
  const [swarmOn, setSwarmOn] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (filter === "All" || p.category === filter) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q)))
    );
  }, [filter, query]);

  const nav = [
    ["Work", "#work"],
    ["Skills", "#skills"],
    ["Journey", "#journey"],
    ["Contact", "#contact"],
  ];

  return (
    <div className={motionOn ? "" : "no-motion"}>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <header className="nav">
        <a className="brand" href="#top">
          <span className="brand-mark">P</span> Professor
          <span className="brand-dot">.</span>
        </a>
        <nav className={menuOpen ? "links open" : "links"}>
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href={profile.github} target="_blank" rel="noreferrer">
            <GithubIcon size={16} /> GitHub
          </a>
        </nav>
        <div className="nav-actions">
          <button
            className="motion-toggle"
            onClick={() => setMotionOn((v) => !v)}
            aria-pressed={motionOn}
            title="Toggle motion"
          >
            Motion {motionOn ? "On" : "Off"}
          </button>
          <button
            className="motion-toggle swarm-toggle"
            onClick={() => setSwarmOn((v) => !v)}
            aria-pressed={swarmOn}
            title="Toggle the Swarm particle animation in the hero"
          >
            Swarm {swarmOn ? "On" : "Off"}
          </button>
          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <Swarm active={motionOn && swarmOn} />
          <p className="eyebrow">
            <CircleDot size={14} /> {profile.availability} — {profile.location}
          </p>
          <figure className="mask-wrap">
            <img className="hero-photo" src={`${import.meta.env.BASE_URL}hero.jpg`} alt="Artwork chosen by Professor — an anime face, half shattering, with a glowing orange eye" width="512" height="768" />
            <figcaption>{profile.photoNote}</figcaption>
          </figure>
          <h1>
            PROFESSOR
            <span className="hero-line">Aspiring</span>
            <span className="hero-line red">Red Team</span>
            <span className="hero-line">Professional</span>
          </h1>
          <p className="hero-tag">{profile.tagline}</p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#work">
              See selected work <ArrowUpRight size={18} />
            </a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon size={18} /> GitHub
            </a>
          </div>
          <p className="hero-note">
            <Lock size={14} /> Lab only — my own machine, or targets I have permission to test.
          </p>
          <p className="swarm-hint">
            Move your pointer across the hero — the swarm follows it. Turn it off with Swarm in the nav.
          </p>
          <div className="hero-stats">
            <div><strong>{projects.length}</strong><span>projects</span></div>
            <div><strong>3</strong><span>live on GitHub</span></div>
            <div><strong>{profile.hackathons}</strong><span>hackathons — participant</span></div>
            <div><strong>2</strong><span>in progress</span></div>
            <div><strong>0</strong><span>fake claims</span></div>
          </div>
        </section>

        <section id="work" className="section">
          <Reveal>
            <p className="kicker">01 — Selected Work</p>
            <h2>What I am building<span className="red-dot">.</span></h2>
            <p className="section-intro">
              Real repos, real labs. “In progress” means exactly that — no link until it is on GitHub.
            </p>
          </Reveal>
          <div className="controls">
            <div className="filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={filter === c ? "chip active" : "chip"}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                aria-label="Search projects"
              />
            </label>
          </div>
          {shown.length === 0 ? (
            <p className="empty">No project matches that search. Try another word.</p>
          ) : (
            <div className="grid">
              {shown.map((p, i) => {
                const Icon = categoryIcon[p.category] || FlaskConical;
                return (
                  <Reveal key={p.id} delay={(i % 3) * 0.08}>
                    <article className="card">
                      <div className="card-top">
                        <span className="card-icon"><Icon size={20} /></span>
                        <span className={p.link ? "status live" : "status progress"}>{p.status}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <div className="stack">
                        {p.stack.map((s) => <span key={s}>{s}</span>)}
                      </div>
                      {p.link ? (
                        <a className="card-link" href={p.link} target="_blank" rel="noreferrer">
                          View on GitHub <ArrowUpRight size={16} />
                        </a>
                      ) : (
                        <span className="card-link muted">In progress — no link yet</span>
                      )}
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </section>

        <section id="skills" className="section">
          <Reveal>
            <p className="kicker">02 — Skills &amp; About</p>
            <h2>Learning, honestly<span className="red-dot">.</span></h2>
          </Reveal>
          <div className="about-grid">
            <Reveal>
              <p className="about-text">{profile.about}</p>
              <p className="hackathon-line">
                <FlaskConical size={16} /> Hackathon Participant ×{profile.hackathons}
                <span> — names, dates and results not listed yet.</span>
              </p>
              <p className="caveat">“Build it, break it in the lab, write it down, build again.”</p>
            </Reveal>
            <div className="skills">
              {skills.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.05}>
                  <div className="skill">
                    <div className="skill-head">
                      <strong>{s.name}</strong>
                      <span>{s.level}</span>
                    </div>
                    <p>{s.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="focus-banner" aria-label="One target">
          <Reveal>
            <div className="focus-inner">
              <img src={`${import.meta.env.BASE_URL}${profile.focus.image}`} alt={profile.focus.alt} width="736" height="1308" loading="lazy" />
              <div className="focus-text">
                <p className="kicker">Focus</p>
                <h2>{profile.focus.title}<span className="red-dot">.</span></h2>
                <p className="focus-caption">{profile.focus.caption}</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="journey" className="section">
          <Reveal>
            <p className="kicker">03 — Learning Journey</p>
            <h2>How I got here<span className="red-dot">.</span></h2>
            <p className="section-intro">A learning timeline — not a work history. No jobs claimed.</p>
          </Reveal>
          <ol className="timeline">
            {journey.map((j, i) => (
              <Reveal key={j.date} delay={i * 0.05}>
                <li>
                  <span className="timeline-date">{j.date}</span>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section id="contact" className="section contact">
          <Reveal>
            <p className="kicker">04 — Contact</p>
            <h2>Find me on GitHub<span className="red-dot">.</span></h2>
            <p className="section-intro">
              That is the only contact channel for now. See the code, the commits, and what I am learning next.
            </p>
            <a className="btn primary big" href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon size={20} /> GitHub — Professor
            </a>
          </Reveal>
        </section>
      </main>

      <footer>
        <span>© 2026 Professor — Aspiring Red Team Professional</span>
        <span>Built with React + Vite · Lab only · India</span>
      </footer>
    </div>
  );
}
