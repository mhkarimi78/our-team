const CONTACT_EMAIL = "hello@mahsatech.com"; // TODO: replace with your real email

const services = [
  { title: "Landing pages", text: "Fast, clean, SEO-ready pages that turn visitors into customers." },
  { title: "Web apps", text: "Dashboards, portals and custom tools built with Next.js and TypeScript." },
  { title: "Maintenance", text: "Bug fixes, performance tuning and new features for existing sites." },
];

const team = [
  { name: "Mahsa", role: "Developer", github: "https://github.com/mhkarimi78" },
  { name: "Ahmad", role: "Developer", github: "" },
];

const steps = ["Tell us your idea", "Get a quote & timeline", "We build, you review", "Launch & support"];

export default function Home() {
  return (
    <>
      <header className="nav">
        <a href="#" className="logo">Mahsa<span>Tech</span></a>
        <nav>
          <a href="#services">Services</a>
          <a href="#team">Team</a>
          <a href="#contact" className="btn small">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="badge">Available for new projects</p>
          <h1>We build websites that <em>get results.</em></h1>
          <p className="lead">MahsaTech is a small team of two developers. Direct communication, fast delivery, no agency overhead.</p>
          <div className="actions">
            <a href="#contact" className="btn">Start a project</a>
            <a href="#services" className="btn ghost">What we do</a>
          </div>
        </section>

        <section id="services" className="section">
          <h2>Services</h2>
          <div className="grid">
            {services.map((s) => (
              <div className="card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>How it works</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s}><b>{i + 1}</b>{s}</li>
            ))}
          </ol>
        </section>

        <section id="team" className="section">
          <h2>The team</h2>
          <div className="grid two">
            {team.map((m) => (
              <div className="card person" key={m.name}>
                <div className="avatar">{m.name[0]}</div>
                <div>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                  {m.github && <a href={m.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section cta">
          <h2>Have a project in mind?</h2>
          <p>Send us a message and we&apos;ll reply within 24 hours.</p>
          <a className="btn" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} MahsaTech. All rights reserved.</footer>
    </>
  );
}
