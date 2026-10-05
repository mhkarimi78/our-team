"use client";

import { useEffect, useState } from "react";

const CONTACT_EMAIL = "hello@mahsatech.com"; // TODO: replace with your real email

type Lang = "en" | "fa";
type Theme = "dark" | "light";

const t = {
  en: {
    services: "Services", team: "Team", contact: "Contact",
    badge: "Available for new projects",
    h1a: "We build websites that ", h1b: "get results.",
    lead: "MahsaTech is a small team of two developers. Direct communication, fast delivery, no agency overhead.",
    start: "Start a project", what: "What we do",
    servicesTitle: "Our Services",
    servicesSub: "From idea to launch, we're with you every step.",
    items: [
      { icon: "🌐", title: "Web Development", text: "Design and development of modern websites with cutting-edge technologies.", tags: ["React & Next.js", "TypeScript", "Responsive Design", "SEO Optimization"] },
      { icon: "📱", title: "Mobile Apps", text: "Native and cross-platform mobile applications.", tags: ["React Native", "Flutter", "iOS & Android", "PWA"] },
      { icon: "⛓️", title: "Blockchain", text: "Smart contracts and decentralized platforms.", tags: ["Solidity", "Web3", "Smart Contracts", "DApps"] },
      { icon: "🤖", title: "AI Solutions", text: "Practical AI and machine learning solutions for your product.", tags: ["Machine Learning", "NLP", "Computer Vision", "AI Integration"] },
      { icon: "🎨", title: "UI/UX Design", text: "Beautiful interfaces and a seamless user experience.", tags: ["User Research", "Wireframing", "Prototyping", "Design Systems"] },
      { icon: "🧭", title: "Technical Consulting", text: "Guidance in choosing the right technical solutions.", tags: ["Architecture Design", "Tech Stack", "Performance", "Scalability"] },
    ],
    toolsTitle: "Our Tools",
    toolsSub: "The technologies we build the future with.",
    groups: [
      { name: "Frontend", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"] },
      { name: "Backend", tools: ["Node.js", "Python"] },
      { name: "Blockchain", tools: ["Solidity", "Web3.js"] },
      { name: "Tools", tools: ["Qiskit"] },
      { name: "Design", tools: ["Figma", "UI/UX Design"] },
    ],
    principlesTitle: "Our Principles",
    principlesSub: "The values that guide our team.",
    principles: [
      { title: "Silence & Precision", text: "We write code quietly and precisely." },
      { title: "Transparency", text: "We believe in transparency." },
      { title: "AI Collaboration", text: "We see AI as a teammate, not a tool." },
    ],
    howTitle: "How it works",
    steps: ["Tell us your idea", "Get a quote & timeline", "We build, you review", "Launch & support"],
    teamTitle: "The team",
    people: [{ name: "Mahsa", role: "Developer" }, { name: "Ahmad", role: "Developer" }],
    ctaTitle: "Have a project in mind?",
    ctaText: "Send us a message and we'll reply within 24 hours.",
    rights: "All rights reserved.",
  },
  fa: {
    services: "خدمات", team: "تیم", contact: "تماس",
    badge: "آماده دریافت پروژه‌های جدید",
    h1a: "وب‌سایتی می‌سازیم که ", h1b: "نتیجه می‌دهد.",
    lead: "مهساتک یک تیم کوچک دو نفره از توسعه‌دهندگان است. ارتباط مستقیم، تحویل سریع و بدون هزینه‌های اضافی آژانس.",
    start: "شروع پروژه", what: "کارهای ما",
    servicesTitle: "خدمات ما",
    servicesSub: "از ایده تا اجرا، در کنار شما هستیم.",
    items: [
      { icon: "🌐", title: "توسعه وب", text: "طراحی و توسعه وب‌سایت‌های مدرن با تکنولوژی‌های روز دنیا.", tags: ["React & Next.js", "TypeScript", "Responsive Design", "SEO Optimization"] },
      { icon: "📱", title: "اپلیکیشن موبایل", text: "ساخت اپلیکیشن‌های موبایل بومی و کراس‌پلتفرم.", tags: ["React Native", "Flutter", "iOS & Android", "PWA"] },
      { icon: "⛓️", title: "بلاکچین", text: "توسعه قراردادهای هوشمند و پلتفرم‌های غیرمتمرکز.", tags: ["Solidity", "Web3", "Smart Contracts", "DApps"] },
      { icon: "🤖", title: "هوش مصنوعی", text: "پیاده‌سازی راهکارهای هوش مصنوعی و یادگیری ماشین.", tags: ["Machine Learning", "NLP", "Computer Vision", "AI Integration"] },
      { icon: "🎨", title: "طراحی UI/UX", text: "طراحی رابط کاربری زیبا و تجربه کاربری بی‌نظیر.", tags: ["User Research", "Wireframing", "Prototyping", "Design Systems"] },
      { icon: "🧭", title: "مشاوره فنی", text: "مشاوره و راهنمایی در انتخاب بهترین راهکارهای فنی.", tags: ["Architecture Design", "Tech Stack", "Performance", "Scalability"] },
    ],
    toolsTitle: "ابزارهای ما",
    toolsSub: "تکنولوژی‌هایی که با آن‌ها آینده می‌سازیم.",
    groups: [
      { name: "فرانت‌اند", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"] },
      { name: "بک‌اند", tools: ["Node.js", "Python"] },
      { name: "بلاکچین", tools: ["Solidity", "Web3.js"] },
      { name: "ابزارها", tools: ["Qiskit"] },
      { name: "طراحی", tools: ["Figma", "UI/UX Design"] },
    ],
    principlesTitle: "اصول ما",
    principlesSub: "ارزش‌هایی که جمع ما را هدایت می‌کنند.",
    principles: [
      { title: "سکوت و دقت", en: "Silence & Precision", text: "ما با سکوت و دقت کد می‌نویسیم." },
      { title: "شفافیت", en: "Transparency", text: "ما به شفافیت اعتقاد داریم." },
      { title: "همکاری با هوش مصنوعی", en: "AI Collaboration", text: "ما هوش مصنوعی را همکار می‌دانیم، نه ابزار." },
    ],
    howTitle: "روند کار",
    steps: ["ایده‌تان را بگویید", "قیمت و زمان‌بندی بگیرید", "ما می‌سازیم، شما بررسی می‌کنید", "انتشار و پشتیبانی"],
    teamTitle: "تیم ما",
    people: [{ name: "مهسا", role: "توسعه‌دهنده" }, { name: "احمد", role: "توسعه‌دهنده" }],
    ctaTitle: "پروژه‌ای در ذهن دارید؟",
    ctaText: "پیام بدهید، ظرف ۲۴ ساعت پاسخ می‌دهیم.",
    rights: "تمامی حقوق محفوظ است.",
  },
};

const githubs = ["https://github.com/mhkarimi78", ""];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const d = document.documentElement;
    setLang(d.lang === "fa" ? "fa" : "en");
    setTheme(d.dataset.theme === "light" ? "light" : "dark");
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

  const c = t[lang];

  return (
    <>
      <header className="nav">
        <a href="#" className="logo">{lang === "fa" ? <>مهسا<span>تک</span></> : <>Mahsa<span>Tech</span></>}</a>
        <nav>
          <a href="#services">{c.services}</a>
          <a href="#tools">{c.toolsTitle}</a>
          <a href="#team">{c.team}</a>
          <button className="icon" onClick={toggleLang} aria-label="Switch language">{lang === "en" ? "فا" : "EN"}</button>
          <button className="icon" onClick={toggleTheme} aria-label="Toggle theme">{theme === "dark" ? "☀" : "☾"}</button>
          <a href="#contact" className="btn small">{c.contact}</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="badge">{c.badge}</p>
          <h1>{c.h1a}<em>{c.h1b}</em></h1>
          <p className="lead">{c.lead}</p>
          <div className="actions">
            <a href="#contact" className="btn">{c.start}</a>
            <a href="#services" className="btn ghost">{c.what}</a>
          </div>
        </section>

        <section id="services" className="section">
          <h2>{c.servicesTitle}</h2>
          <p className="sub">{c.servicesSub}</p>
          <div className="grid">
            {c.items.map((s) => (
              <div className="card" key={s.title}>
                <div className="ico">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="tags">
                  {s.tags.map((tag) => <li key={tag} dir="ltr">{tag}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="tools" className="section">
          <h2>{c.toolsTitle}</h2>
          <p className="sub">{c.toolsSub}</p>
          <div className="groups">
            {c.groups.map((g) => (
              <div key={g.name} className="group">
                <h3>{g.name}</h3>
                <ul className="tags">
                  {g.tools.map((tool) => <li key={tool} dir="ltr">{tool}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="principles" className="section">
          <h2>{c.principlesTitle}</h2>
          <p className="sub">{c.principlesSub}</p>
          <div className="grid">
            {c.principles.map((p, i) => (
              <div className="card" key={i}>
                <div className="ico">{["🤫", "🔍", "🤝"][i]}</div>
                <h3>{p.title}</h3>
                {"en" in p && <span className="alt" dir="ltr">{p.en}</span>}
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>{c.howTitle}</h2>
          <ol className="steps">
            {c.steps.map((s, i) => (
              <li key={s}><b>{lang === "fa" ? ["۱", "۲", "۳", "۴"][i] : i + 1}</b>{s}</li>
            ))}
          </ol>
        </section>

        <section id="team" className="section">
          <h2>{c.teamTitle}</h2>
          <div className="grid two">
            {c.people.map((m, i) => (
              <div className="card person" key={i}>
                <div className="avatar">{m.name[0]}</div>
                <div>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                  {githubs[i] && <a href={githubs[i]} target="_blank" rel="noreferrer">GitHub ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section cta">
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaText}</p>
          <a className="btn" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} {lang === "fa" ? "مهساتک" : "MahsaTech"}. {c.rights}</footer>
    </>
  );
}
