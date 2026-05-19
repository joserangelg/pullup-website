import {
  ArrowRight,
  Bell,
  CalendarCheck,
  Check,
  Clock3,
  Compass,
  Link2,
  LockKeyhole,
  MapPin,
  MessageCircle,
  MousePointer2,
  Radio,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from 'lucide-react';

const waitlistEmail = 'hello@pullupapp.co';

const activitySignals = [
  { label: 'Coffee Walk', meta: '12 nearby · Fremont', x: '68%', y: '36%', tone: 'lime' },
  { label: 'Run Club', meta: '22 open · Green Lake', x: '24%', y: '58%', tone: 'cyan' },
  { label: 'Creator Meet', meta: '6 spots · Belltown', x: '58%', y: '70%', tone: 'violet' },
];

const howItWorks = [
  {
    icon: Radio,
    title: 'See who’s nearby',
    body: 'Live signals show people, circles, and plans forming around you without exposing exact locations.',
  },
  {
    icon: Compass,
    title: 'Find something to do',
    body: 'Browse real plans by vibe, time, proximity, and trust signals so the next move is obvious.',
  },
  {
    icon: MousePointer2,
    title: 'Pull up',
    body: 'Request, RSVP, share a link, or open chat once the host approves. Less planning, more showing up.',
  },
];

const previewCards = [
  {
    eyebrow: 'Map view',
    title: 'Live nearby signals',
    body: 'Soft-radius discovery with moving activity pulses.',
    icon: MapPin,
  },
  {
    eyebrow: 'LIVE mode',
    title: 'What is happening now',
    body: 'A real-time layer for friends, circles, and open plans.',
    icon: Zap,
  },
  {
    eyebrow: 'Invite flow',
    title: 'RSVP from a link',
    body: 'Going, Maybe, or No before the app gate.',
    icon: Link2,
  },
  {
    eyebrow: 'Profile cards',
    title: 'Trust before meeting',
    body: 'Mutuals, verification, activity, and circles.',
    icon: ShieldCheck,
  },
];

const liveFeed = [
  ['Ana joined Coffee Walk', '4 mutuals nearby'],
  ['Rooftop Recovery opened', '18 active'],
  ['Leo needs two more', 'Sports crew'],
];

function Logo() {
  return <img className="brand-logo" src="/pullup-main-logo-transparent.png" alt="PullUp - Live Near You" />;
}

function WaitlistForm({ compact = false }) {
  return (
    <form className={compact ? 'waitlist-form compact' : 'waitlist-form'} action={`mailto:${waitlistEmail}`} method="post" encType="text/plain">
      <input name="email" type="email" placeholder="Email or phone" aria-label="Email or phone" required />
      <button type="submit">
        Join waitlist
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

function SignalMap() {
  return (
    <div className="signal-map" aria-hidden="true">
      <div className="map-lines" />
      <div className="you-node">
        <span />
        <b>You</b>
      </div>
      {activitySignals.map((signal) => (
        <div key={signal.label} className={`signal-node ${signal.tone}`} style={{ left: signal.x, top: signal.y }}>
          <i />
          <strong>{signal.label}</strong>
          <small>{signal.meta}</small>
        </div>
      ))}
      <div className="map-caption">
        <span />
        Live activity nearby
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="phone-mockup">
      <div className="phone-bar" />
      <div className="phone-header">
        <Logo />
        <div className="avatar">JG</div>
      </div>
      <SignalMap />
      <div className="phone-sheet">
        <div className="sheet-handle" />
        <p className="eyebrow">Nearby now</p>
        <h3>Coffee Walk</h3>
        <p>Fremont · 3:30 PM · 4 mutuals</p>
        <div className="mini-proof">
          <span><UsersRound size={14} /> 12 nearby</span>
          <span><LockKeyhole size={14} /> exact after approval</span>
        </div>
        <div className="phone-actions">
          <button>Pull Up</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
}

function AppPreviewShowcase() {
  return (
    <div className="showcase-grid">
      <article className="preview-large">
        <div className="preview-topline">
          <span><Radio size={16} /> LIVE</span>
          <small>212 nearby</small>
        </div>
        <SignalMap />
      </article>
      <article className="activity-card">
        <p className="eyebrow cyan">Nearby activity</p>
        {liveFeed.map(([title, meta]) => (
          <div key={title}>
            <span />
            <b>{title}</b>
            <small>{meta}</small>
          </div>
        ))}
      </article>
      <article className="invite-preview">
        <p className="eyebrow lime">Invite flow</p>
        <h3>Pull up to Coffee Walk?</h3>
        <p>Tap to RSVP. Open PullUp to see who else is going.</p>
        <div className="rsvp-row">
          <button>Going</button>
          <button>Maybe</button>
          <button>No</button>
        </div>
      </article>
      <article className="profile-preview">
        <div className="profile-avatar">MC</div>
        <div>
          <p className="eyebrow">Profile card</p>
          <h3>Maya Chen</h3>
          <p>4 mutuals · IG verified · Coffee Walk</p>
        </div>
        <button>Pull Up</button>
      </article>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <nav className="nav">
        <a href="#top" aria-label="PullUp home"><Logo /></a>
        <div>
          <a href="#what">What</a>
          <a href="#how">How</a>
          <a href="#previews">Previews</a>
          <a href="#waitlist">Waitlist</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-media">
          <img src="/pullup-brand-board.png" alt="" />
        </div>
        <div className="hero-scene">
          <PhoneMockup />
        </div>
        <div className="hero-copy">
          <div className="launch-chip"><Sparkles size={15} /> Coming soon</div>
          <h1>See what’s happening nearby.</h1>
          <p>
            PullUp helps you discover live plans, nearby activity, and real-world connections in real time, so making a plan feels instant again.
          </p>
          <WaitlistForm />
          <div className="hero-proof">
            <span><Check size={15} /> Real plans</span>
            <span><Check size={15} /> Soft-location privacy</span>
            <span><Check size={15} /> Live social signals</span>
          </div>
        </div>
      </section>

      <section className="what-section" id="what">
        <p className="eyebrow lime">What is PullUp</p>
        <h2>Real plans. Real people. Right now.</h2>
        <p>
          PullUp is a live social layer for real life. It shows what is forming nearby, who is open to doing something, and where your friends or circles are creating momentum, without turning discovery into endless scrolling.
        </p>
      </section>

      <section className="how-section" id="how">
        <div className="section-heading">
          <p className="eyebrow cyan">How it works</p>
          <h2>From maybe later to right now.</h2>
        </div>
        <div className="how-grid">
          {howItWorks.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={28} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="previews-section" id="previews">
        <div className="section-heading">
          <p className="eyebrow lime">App previews</p>
          <h2>Designed to make the next move clear.</h2>
        </div>
        <AppPreviewShowcase />
        <div className="preview-strip">
          {previewCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title}>
                <Icon size={22} />
                <p>{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <span>{card.body}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="philosophy-section">
        <div>
          <MessageCircle size={28} />
          <h2>Social media keeps people online. PullUp helps people show up.</h2>
          <p>
            Pulling people to real life means less performative posting and more lightweight coordination, trust, and timing. See the signal, choose the plan, and move.
          </p>
        </div>
        <div className="philosophy-points">
          <span><Clock3 size={18} /> real-time context</span>
          <span><MapPin size={18} /> nearby discovery</span>
          <span><Bell size={18} /> host approvals</span>
          <span><Zap size={18} /> instant coordination</span>
        </div>
      </section>

      <section className="final-cta" id="waitlist">
        <CalendarCheck size={34} />
        <h2>Pulling people to real life.</h2>
        <p>Join the waitlist for early access, TestFlight drops, and the first city rollout.</p>
        <WaitlistForm compact />
      </section>
    </main>
  );
}
