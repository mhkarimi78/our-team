"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Blocks, Compass, Eye, Focus, Globe, Handshake,
  Languages, Mail, Moon, Palette, Rocket, Search, Share2, Smartphone, Sparkles, Sun,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import Background from "./components/Background";
import CodeWindow from "./components/CodeWindow";
import Counter from "./components/Counter";
import Reveal from "./components/Reveal";
import SpotlightCard from "./components/SpotlightCard";
import { CONTACT_EMAIL, content, type Lang } from "./content";

type Theme = "dark" | "light";

const Github = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
);
const Linkedin = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
);

const serviceIcons = [Globe, Smartphone, Blocks, BrainCircuit, Palette, Compass];
const marketingIcons = [Sparkles, Search, Share2, Rocket];
const principleIcons = [Focus, Eye, Handshake];

function Head({ i, title, sub }: { i: number; title: string; sub: string }) {
  return (
    <Reveal className="head">
      <span className="eyebrow">0{i}</span>
      <h2>{title}</h2>
      <p className="sub">{sub}</p>
    </Reveal>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [word, setWord] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const d = document.documentElement;
    setLang(d.lang === "fa" ? "fa" : "en");
    setTheme(d.dataset.theme === "light" ? "light" : "dark");
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => w + 1), 2400);
    return () => clearInterval(id);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "en" ? "fa" : "en";
    const d = document.documentElement;
    d.lang = next;
    d.dir = next === "fa" ? "rtl" : "ltr";
    setLang(next);
    try { localStorage.setItem("lang", next); } catch {}
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch {}
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project inquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const c = content[lang];
  const locale = lang === "fa" ? "fa-IR" : "en-US";
  const words = c.words;
  const brand = <span>{c.brand[0]}<em>{c.brand[1]}</em></span>;
  const marquee = c.groups.flatMap((g) => g.tools);

  return (
    <>
      <Background />
      <motion.div className="progress" style={{ scaleX: progress }} />

      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-in">
          <a href="#top" className="logo"><i className="mark">M</i>{brand}</a>
          <nav>
            <a className="nl" href="#services">{c.nav.services}</a>
            <a className="nl" href="#tools">{c.nav.tools}</a>
            <a className="nl" href="#marketing">{c.nav.marketing}</a>
            <a className="nl" href="#principles">{c.nav.principles}</a>
            <a className="nl" href="#team">{c.nav.team}</a>
            <button className="icon" onClick={toggleLang} aria-label="Switch language"><Languages size={16} /><span>{lang === "en" ? "فا" : "EN"}</span></button>
            <button className="icon sq" onClick={toggleTheme} aria-label="Toggle theme">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
            <a href="#contact" className="btn small">{c.nav.contact}</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <motion.p className="badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <i className="pulse" />{c.badge}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <span>{c.heroPre}</span>
              <span className="rot">
                <AnimatePresence mode="wait">
                  <motion.em
                    key={`${lang}-${word % words.length}`}
                    className="grad"
                    initial={{ y: "70%", opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-70%", opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {words[word % words.length]}
                  </motion.em>
                </AnimatePresence>
              </span>
            </motion.h1>
            <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>{c.lead}</motion.p>
            <motion.div className="actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <a href="#contact" className="btn">{c.cta1}<ArrowRight size={18} className="flip" /></a>
              <a href="#services" className="btn ghost">{c.cta2}</a>
            </motion.div>
          </div>
          <motion.div className="hero-art" initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <CodeWindow />
          </motion.div>
        </section>

        <Reveal className="stats">
          {c.stats.map((s) => (
            <div className="stat" key={s.label}>
              <b dir={s.suffix === "+" ? "ltr" : undefined}><Counter to={s.n} locale={locale} /><small>{s.suffix}</small></b>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>

        <div className="marquee" aria-hidden>
          <div className="track">
            {[...marquee, ...marquee].map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>

        <section id="services" className="section">
          <Head i={1} title={c.servicesTitle} sub={c.servicesSub} />
          <div className="grid">
            {c.items.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.1}>
                  <SpotlightCard className="card">
                    <div className="ico"><Icon size={22} /></div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <ul className="tags">{s.tags.map((t) => <li key={t} dir="ltr">{t}</li>)}</ul>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="tools" className="section">
          <Head i={2} title={c.toolsTitle} sub={c.toolsSub} />
          <div className="tgrid">
            {c.groups.map((g, i) => (
              <Reveal key={g.name} delay={(i % 4) * 0.07} className={i === 0 ? "wide" : ""}>
                <SpotlightCard className="card tcard">
                  <h3><i />{g.name}</h3>
                  <ul className="tags">{g.tools.map((t) => <li key={t} dir="ltr">{t}</li>)}</ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="marketing" className="section">
          <Head i={3} title={c.marketingTitle} sub={c.marketingSub} />
          <div className="grid four">
            {c.marketing.map((m, i) => {
              const Icon = marketingIcons[i];
              return (
                <Reveal key={m.title} delay={i * 0.08}>
                  <SpotlightCard className="card">
                    <div className="ico"><Icon size={22} /></div>
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="principles" className="section">
          <Head i={4} title={c.principlesTitle} sub={c.principlesSub} />
          <div className="grid">
            {c.principles.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <Reveal key={p.title} delay={i * 0.1}>
                  <SpotlightCard className="card">
                    <div className="ico"><Icon size={22} /></div>
                    <h3>{p.title}</h3>
                    {p.alt && <span className="alt" dir="ltr">{p.alt}</span>}
                    <p>{p.text}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="process" className="section">
          <Head i={5} title={c.processTitle} sub={c.processSub} />
          <div className="steps">
            {c.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12} className="step">
                <b>{(i + 1).toLocaleString(locale)}</b>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="team" className="section">
          <Head i={6} title={c.teamTitle} sub={c.teamSub} />
          <div className="grid">
            {c.people.map((m, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <SpotlightCard className="card person">
                  <div className="avatar"><span>{m.name[0]}</span></div>
                  <div>
                    <h3>{m.name}</h3>
                    <p>{m.role}</p>
                    {(m.github || m.linkedin) && (
                      <div className="socials">
                        {m.github && <a className="soc" href={m.github} target="_blank" rel="noreferrer"><Github size={16} />GitHub<ArrowUpRight size={13} /></a>}
                        {m.linkedin && <a className="soc" href={m.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn<ArrowUpRight size={13} /></a>}
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <Reveal>
            <div className="cta">
              <div className="cta-text">
                <h2>{c.ctaTitle}</h2>
                <p>{c.ctaText}</p>
                <a className="link big" href={`mailto:${CONTACT_EMAIL}`}><Mail size={18} />{CONTACT_EMAIL}</a>
              </div>
              <form onSubmit={onSubmit} className="form">
                <input name="name" required placeholder={c.form.name} />
                <input name="email" type="email" required placeholder={c.form.email} />
                <textarea name="message" required rows={4} placeholder={c.form.message} />
                <button className="btn" type="submit">{c.form.send}<ArrowRight size={18} className="flip" /></button>
                <small>{c.form.hint}</small>
              </form>
            </div>
          </Reveal>
        </section>
      </main>

      <footer>
        <a href="#top" className="logo"><i className="mark">M</i>{brand}</a>
        <span>© {new Date().getFullYear()} {c.brand.join("")}. {c.rights}</span>
      </footer>
    </>
  );
}
