import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import './styles.css';

async function submitNetlifyForm(event, onSuccess, onFailure) {
  event.preventDefault();
  const form = event.currentTarget;
  const body = new URLSearchParams(new FormData(form));

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!response.ok) throw new Error(`Netlify form returned ${response.status}`);
    onSuccess();
  } catch {
    onFailure();
  }
}

const projects = [
  {
    id: 'floorsnap',
    number: '01',
    label: 'FIELD SOFTWARE',
    name: 'FloorSnap',
    status: 'LIVE ON THE APP STORE',
    stack: 'SWIFTUI · LIDAR · PDF',
    description:
      'A flooring estimator built around the way contractors actually work: measure a room, make the judgment calls, and leave the job with a client-ready bid.',
    note: 'Fourteen years in flooring shaped the product before a line of Swift was written.',
    icon: '/floorsnap-icon.png',
    images: [
      ['floorsnap-lidar.jpg', 'LiDAR measurement'],
      ['floorsnap-scan.jpg', 'Room scan'],
      ['floorsnap-estimate.jpg', 'Estimate builder'],
      ['floorsnap-bid.jpg', 'Client bid'],
    ],
  },
  {
    id: 'arca',
    number: '02',
    label: 'CALM INFORMATION',
    name: 'Arca',
    status: 'IN REVIEW',
    stack: 'SWIFTUI · RSS · AVFOUNDATION',
    description:
      'A technology reader with a focused feed, a native reading space, podcasts, and saved stories for people who want to keep up without opening the whole internet.',
    note: 'The product is opinionated about attention: useful reporting first, noise last.',
    icon: '/arca-icon.png',
    images: [
      ['arca-feed.jpg', 'Focused feed'],
      ['arca-reader.jpg', 'Native reader'],
      ['arca-player.jpg', 'Podcast player'],
      ['arca-saved.jpg', 'Saved stories'],
    ],
  },
  {
    id: 'jarvis',
    number: '03',
    label: 'PERSONAL SYSTEM',
    name: 'Jarvis',
    status: 'IN DEVELOPMENT',
    stack: 'SWIFTUI · CLAUDE SDK · VOICE',
    description:
      'A personal operator for the whole day: project signals, voice capture, habits, workouts, and learning in one system that is built for use rather than presentation.',
    note: 'A daily tool can be strange, specific, and genuinely useful at the same time.',
    icon: '/jarvis-icon.png',
    images: [
      ['jarvis-voice.jpg', 'Voice capture'],
      ['jarvis-chat.jpg', 'Project chat'],
      ['jarvis-stats.jpg', 'Stats and XP'],
      ['jarvis-learn.jpg', 'Learning deck'],
    ],
  },
];

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Charlie Piazza home">
        <span className="wordmark-mark">CP</span>
        <span>Charlie Piazza</span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#method">Process</a>
        <a className="nav-contact" href="#contact">Say hello <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

function ArrowLink({ children, href = '#work', inverse = false }) {
  return (
    <a className={`arrow-link${inverse ? ' arrow-link-inverse' : ''}`} href={href}>
      <span>{children}</span>
      <span className="arrow-link-icon" aria-hidden="true">↗</span>
    </a>
  );
}

function IPhoneFrame({ src, alt, width, height, priority = false }) {
  return (
    <div className="device-shell">
      <span className="device-button device-button-action" aria-hidden="true" />
      <span className="device-button device-button-volume-up" aria-hidden="true" />
      <span className="device-button device-button-volume-down" aria-hidden="true" />
      <span className="device-button device-button-power" aria-hidden="true" />
      <div className="device-screen">
        <span className="device-island" aria-hidden="true" />
        <img src={src} width={width} height={height} fetchPriority={priority ? 'high' : undefined} loading={priority ? undefined : 'lazy'} decoding="async" alt={alt} />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="kicker"><span className="kicker-rule" /> Buffalo, NY · product builder</p>
        <h1 id="hero-title">I build software for work that doesn&apos;t fit in a spreadsheet.</h1>
        <p className="hero-lede">
          Fourteen years in flooring taught me where software breaks. Now I design, build, and ship iOS tools for people doing difficult, physical, high-consequence work.
        </p>
        <div className="hero-links">
          <ArrowLink>See the work</ArrowLink>
          <ArrowLink href="#method">How I work</ArrowLink>
        </div>
      </div>

      <div className="hero-visual" aria-label="FloorSnap estimate proof point">
        <div className="hero-visual-top mono"><span>01 / FIELD PROOF</span><span>FLOORSNAP</span></div>
        <div className="hero-visual-stage">
          <div className="hero-visual-backdrop" aria-hidden="true">
            <span>MEASURE</span><span>ESTIMATE</span><span>DELIVER</span>
          </div>
          <figure className="hero-device">
            <IPhoneFrame src="/floorsnap-estimate.jpg" width="540" height="1173" priority alt="FloorSnap estimate showing material needed and project cost" />
          </figure>
          <div className="hero-proof-card">
            <span className="mono">BUILT FROM</span>
            <strong>14 years</strong>
            <span>in flooring operations</span>
          </div>
        </div>
        <div className="hero-visual-bottom mono"><span>FLOORSNAP / ESTIMATE</span><span>LIVE ON APP STORE ↗</span></div>
      </div>
    </section>
  );
}

function ProjectImages({ project, featured }) {
  return (
    <div className={`project-images project-images-${project.id}${featured ? ' project-images-featured' : ''}`}>
      {project.images.map(([src, alt], index) => (
        <figure className={`project-shot${featured && index === 0 ? ' project-shot-primary' : ''}`} key={src}>
          <IPhoneFrame src={`/${src}`} width="540" height="1173" alt={`${project.name} ${alt}`} />
          <figcaption className="mono">{String(index + 1).padStart(2, '0')} / {alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function FloorSnapActions() {
  return (
    <div className="project-actions">
      <a className="store-link" href="https://apps.apple.com/app/id6781897515" target="_blank" rel="noopener noreferrer">
        <img src="/download-on-app-store.svg" width="120" height="40" alt="Download FloorSnap on the App Store" />
      </a>
      <BetaForm />
    </div>
  );
}

function BetaForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  if (sent) {
    return <p className="form-confirmation" role="status">You&apos;re on the v2 list. I&apos;ll send the TestFlight invite.</p>;
  }

  return (
    <form className="inline-form" name="floorsnap-beta" method="POST" data-netlify="true" onSubmit={(event) => submitNetlifyForm(event, () => setSent(true), () => setError(true))}>
      <input type="hidden" name="form-name" value="floorsnap-beta" />
      <label htmlFor="beta-email">Testing the next version? Request v2 access.</label>
      <div className="inline-form-row">
        <input id="beta-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
        <button type="submit">Request access <span aria-hidden="true">↗</span></button>
      </div>
      {error && <p className="form-error" role="alert">Couldn&apos;t send that. Email me directly and I&apos;ll add you.</p>}
    </form>
  );
}

function Project({ project, featured = false }) {
  return (
    <article className={`project project-${project.id}${featured ? ' project-featured' : ''}`} id={project.id}>
      <div className="project-topline">
        <div className="project-identity">
          <img className="project-icon" src={project.icon} width="68" height="68" loading="lazy" decoding="async" alt={`${project.name} app icon`} />
          <div>
            <p className="project-number mono">{project.number}</p>
            <h2>{project.name}</h2>
          </div>
        </div>
        <div className="project-meta mono">
          <span className="status-dot" aria-hidden="true" />
          <span>{project.status}</span>
          <span>{project.stack}</span>
        </div>
      </div>

      <div className="project-body">
        <div className="project-copy">
          <p className="project-label mono">{project.label}</p>
          <p className="project-description">{project.description}</p>
          <p className="project-note">{project.note}</p>
          {project.id === 'floorsnap' && <FloorSnapActions />}
          {project.id === 'arca' && (
            <ArrowLink href="mailto:cpiazza717@gmail.com?subject=Arca%20launch%20updates">Get the launch note</ArrowLink>
          )}
        </div>
        <ProjectImages project={project} featured={featured} />
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="kicker"><span className="kicker-rule" /> Selected work</p>
      <div className="section-heading-row">
          <h2 id="work-title">Products shaped by use.<br /><em>Not by a template.</em></h2>
          <p className="section-intro">The work starts close to the problem: a contractor measuring a room, a reader trying to keep up, a person trying to run a complicated day.</p>
        </div>
      </div>
      <div className="project-list">
        {projects.map((project, index) => <Project key={project.id} project={project} featured={index === 0} />)}
      </div>
    </section>
  );
}

function Method() {
  const principles = [
    ['01', 'See the friction', 'Start with the person, the environment, and the moment where the current process starts to cost them time.'],
    ['02', 'Make it legible', 'Turn messy expertise into a tool that makes the right next action feel obvious.'],
    ['03', 'Ship what survives', 'Scope, design, build, test, distribute, and support the whole product — not just the interesting middle.'],
  ];

  return (
    <section className="method" id="method" aria-labelledby="method-title">
      <div className="method-intro">
        <p className="kicker kicker-light"><span className="kicker-rule" /> How I work</p>
        <h2 id="method-title">From the field<br /><em>to the screen.</em></h2>
        <p>I spent fourteen years owning and running a flooring business before I started writing Swift. That background still sets the bar: software has to survive contact with a busy day.</p>
      </div>
      <div className="principles">
        {principles.map(([number, title, copy]) => (
          <div className="principle" key={number}>
            <span className="principle-number mono">{number}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-topline mono"><span>CONTACT</span><span>CP / 2026</span></div>
      <div className="contact-grid">
        <div>
          <p className="kicker"><span className="kicker-rule" /> Available for the right problem</p>
          <h2 id="contact-title">Have a messy thing worth making better?</h2>
        </div>
        <div className="contact-side">
          <p>Tell me what you&apos;re building, where the current process breaks, and what better would look like.</p>
          <a className="contact-email" href="mailto:cpiazza717@gmail.com">cpiazza717@gmail.com <span aria-hidden="true">↗</span></a>
          <a className="contact-email" href="https://github.com/SUNYCharlieP" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      {!sent ? (
        <form className="contact-form" name="contact" method="POST" data-netlify="true" onSubmit={(event) => {
          setError(false);
          submitNetlifyForm(event, () => setSent(true), () => setError(true));
        }}>
          <input type="hidden" name="form-name" value="contact" />
          <div className="contact-form-fields">
            <label><span className="sr-only">Your name</span><input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
            <label><span className="sr-only">Your email</span><input name="email" type="email" autoComplete="email" placeholder="Your email" required /></label>
            <label className="message-field"><span className="sr-only">What are you building?</span><textarea name="message" rows="4" placeholder="What are you building?" required /></label>
            <button type="submit">Send the brief <span aria-hidden="true">↗</span></button>
          </div>
          {error && <p className="form-error" role="alert">Couldn&apos;t send that. Email me directly and I&apos;ll get back to you.</p>}
        </form>
      ) : (
        <p className="contact-confirmation" role="status">Thanks — message received. I&apos;ll get back to you soon.</p>
      )}
      <div className="contact-bottom mono"><span>CHARLIE PIAZZA</span><span>BUFFALO, NY</span></div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Method />
        <Work />
      </main>
      <Contact />
    </>
  );
}

const rootElement = document.getElementById('root');
// Reuse the root across Vite hot updates so the preview stays clean while iterating.
const appRoot = globalThis.__charliePiazzaRoot ?? createRoot(rootElement);
globalThis.__charliePiazzaRoot = appRoot;
appRoot.render(<App />);

export default App;
