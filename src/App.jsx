import { ArrowRight, Bell, CalendarCheck, Check, Clock, LockKeyhole, MapPin, MessageCircle, Radio, ShieldCheck, Sparkles, UsersRound, Zap } from 'lucide-react';

const inviteUrl = 'https://pullupapp.co/i/rooftop-recovery-capitol-hill';

const pullups = [
  { emoji: '🔥', title: 'Rooftop Recovery', meta: 'Capitol Hill · Now', active: '18 active', tone: 'cyan' },
  { emoji: '☕', title: 'Coffee Walk', meta: 'Fremont · 3:30 PM', active: '8 spots', tone: 'lime' },
  { emoji: '🏐', title: 'Sunset Volleyball', meta: 'Green Lake · 5:45 PM', active: '3 spots', tone: 'violet' },
];

const features = [
  {
    icon: Radio,
    title: 'Live plans nearby',
    body: 'See what is actually happening around you right now, from low-key coffee walks to invite-only rooftop hangs.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-first location',
    body: 'PullUp shows soft neighborhoods first. Exact locations unlock only after approval or check-in rules.',
  },
  {
    icon: MessageCircle,
    title: 'Chat after approval',
    body: 'Guest list, ETA, host updates, and group chat stay inside the app where the context belongs.',
  },
];

const steps = [
  'Share a clean PullUp link in text, DM, or story.',
  'Friends can RSVP Going, Maybe, or No from the public page.',
  'The app unlocks who else is going, chat, exact details, and check-in.',
];

function Logo() {
  return <img className="brand-logo" src="/pullup-main-logo-transparent.png" alt="PullUp - Live Near You" />;
}

function PhonePreview() {
  return (
    <div className="phone-preview" aria-label="PullUp app preview">
      <div className="phone-top">
        <Logo />
        <div className="avatar">JG</div>
      </div>
      <div className="map-panel">
        <img src="/pullup-brand-board.png" alt="" />
        <div className="map-overlay" />
        <div className="hotspot hotspot-one"><span>🔥</span><b>18</b></div>
        <div className="hotspot hotspot-two"><span>☕</span><b>12</b></div>
        <div className="hotspot hotspot-three"><span>🏐</span><b>22</b></div>
        <div className="live-pill"><span />212 nearby</div>
      </div>
      <div className="detail-sheet">
        <div className="handle" />
        <p className="eyebrow">Details</p>
        <h3>Rooftop Recovery</h3>
        <p>Barry&apos;s Capitol Hill · Now</p>
        <strong>Location unlocks after approval</strong>
        <div className="action-row">
          <button>Pull Up</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
}

function InvitePreview() {
  return (
    <div className="invite-card">
      <div className="message-label">Shared from PullUp</div>
      <div className="invite-visual">
        <div className="invite-aura" />
        <div className="signal-mark">
          <span>🔥</span>
        </div>
        <p className="eyebrow">PullUp invite</p>
        <h3>Rooftop Recovery</h3>
        <p>Now in Capitol Hill</p>
      </div>
      <div className="invite-body">
        <p>Tap to RSVP. Open PullUp to see who else is going, chat, and unlock exact details after approval.</p>
        <div className="rsvp-row">
          <button>Going</button>
          <button>Maybe</button>
          <button>No</button>
        </div>
        <div className="link-strip">
          <span>{inviteUrl}</span>
        </div>
      </div>
    </div>
  );
}

function WaitlistForm({ compact = false }) {
  return (
    <form className={compact ? 'waitlist-form compact' : 'waitlist-form'} action="mailto:hello@pullupapp.co" method="post" encType="text/plain">
      <input name="email" type="email" placeholder="Email or phone" aria-label="Email or phone" required />
      <button type="submit">
        Join waitlist
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

export default function App() {
  return (
    <main>
      <nav className="nav">
        <a href="#top" aria-label="PullUp home"><Logo /></a>
        <div>
          <a href="#invites">Invites</a>
          <a href="#app">App</a>
          <a href="#waitlist">Waitlist</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-bg">
          <img src="/pullup-brand-board.png" alt="" />
        </div>
        <div className="hero-copy">
          <div className="launch-chip"><Sparkles size={15} /> Coming soon on iPhone</div>
          <h1>Real plans. Real people. Right now.</h1>
          <p>
            PullUp helps you find live social plans nearby, send beautiful RSVP links, and keep exact details private until people are approved.
          </p>
          <WaitlistForm />
          <div className="proof-row">
            <span><Check size={15} /> Invite links</span>
            <span><Check size={15} /> Soft-location privacy</span>
            <span><Check size={15} /> App-gated guest lists</span>
          </div>
        </div>
        <PhonePreview />
      </section>

      <section className="ticker" aria-label="PullUp live examples">
        {pullups.map((item) => (
          <div key={item.title} className={`ticker-card ${item.tone}`}>
            <span>{item.emoji}</span>
            <div>
              <b>{item.title}</b>
              <p>{item.meta}</p>
            </div>
            <small>{item.active}</small>
          </div>
        ))}
      </section>

      <section className="section split" id="invites">
        <div className="section-copy">
          <p className="eyebrow lime">The invite is the hook</p>
          <h2>Text links that feel like an event, not a random URL.</h2>
          <p>
            Friends can tap a PullUp link, understand the plan instantly, and RSVP Going, Maybe, or No from the preview page. The app unlocks the social layer.
          </p>
          <div className="step-list">
            {steps.map((step, index) => (
              <div key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
        <InvitePreview />
      </section>

      <section className="section feature-grid" id="app">
        <div className="feature-intro">
          <p className="eyebrow cyan">Built for showing up</p>
          <h2>Less scrolling. More plans.</h2>
        </div>
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title}>
              <Icon size={26} />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          );
        })}
      </section>

      <section className="section privacy-band">
        <div>
          <LockKeyhole size={28} />
          <h2>Public enough to hook. Private enough to trust.</h2>
          <p>
            Public links can show the vibe, time, neighborhood, and RSVP buttons. The full guest list, chat, exact address, and verification stay behind PullUp.
          </p>
        </div>
        <div className="privacy-points">
          <span><MapPin size={18} /> Soft neighborhood first</span>
          <span><UsersRound size={18} /> Guest list in app</span>
          <span><Clock size={18} /> RSVP without install</span>
          <span><Bell size={18} /> Host approval alerts</span>
        </div>
      </section>

      <section className="final-cta" id="waitlist">
        <CalendarCheck size={34} />
        <h2>Be first to PullUp.</h2>
        <p>Join the launch list for early access, TestFlight drops, and the first city rollout.</p>
        <WaitlistForm compact />
        <small>Launching first in select nightlife, fitness, creator, and casual communities.</small>
      </section>
    </main>
  );
}
