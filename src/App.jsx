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
  Plus,
  Radio,
  ShieldCheck,
  Sparkles,
  Send,
  UserRound,
  UsersRound,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const waitlistEndpoint = '/api/waitlist';

const activitySignals = [
  { label: 'Rooftop Hangout', meta: 'starts in 22 min · 6 mutuals', x: '68%', y: '36%', tone: 'lime' },
  { label: 'Volleyball Game', meta: '22 open · Green Lake', x: '24%', y: '58%', tone: 'cyan' },
  { label: 'Matcha Meetup', meta: '8 spots · Capitol Hill', x: '58%', y: '70%', tone: 'violet' },
];

const howItWorks = [
  {
    icon: Radio,
    title: 'See who’s nearby',
    body: 'Live signals show friends, circles, and plans forming around you without exposing exact locations.',
  },
  {
    icon: Compass,
    title: 'Find something to do',
    body: 'Browse real plans by vibe, time, proximity, and mutuals so the next move feels obvious.',
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
    title: 'The move, on a map',
    body: 'Soft-radius signals show where real-life energy is building.',
    icon: MapPin,
  },
  {
    eyebrow: 'LIVE mode',
    title: 'Before it is over',
    body: 'See plans while they are still forming, not after the recap.',
    icon: Zap,
  },
  {
    eyebrow: 'Invite flow',
    title: 'RSVP from a link',
    body: 'Going, Maybe, or No from the preview. Details open in PullUp.',
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
  ['Maya joined Rooftop Hangout', 'starts in 22 min'],
  ['Volleyball Game opened', '22 nearby · 4 spots'],
  ['Nina dropped Matcha Meetup', '8 spots · waitlist on'],
];

const appScreens = [
  {
    type: 'map',
    eyebrow: 'Map',
    title: 'See what is nearby.',
  },
  {
    type: 'details',
    eyebrow: 'Details',
    title: 'Know before you go.',
  },
  {
    type: 'pulse',
    eyebrow: 'Pulse',
    title: 'Drop, chat, and move.',
  },
];

function Logo() {
  return <img className="brand-logo" src="/pullup-main-logo-transparent.png" alt="PullUp - Live Near You" />;
}

function WaitlistForm({ compact = false }) {
  const [status, setStatus] = useState('idle');
  const [showCelebration, setShowCelebration] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const emailOrPhone = String(formData.get('emailOrPhone') || '').trim();

    if (!emailOrPhone) return;

    setStatus('loading');

    try {
      const response = await fetch(waitlistEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone,
          source: 'pullupapp.co',
        }),
      });

      if (!response.ok) throw new Error('Waitlist unavailable');

      form.reset();
      setStatus('success');
      setShowCelebration(true);
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <>
      <form className={compact ? 'waitlist-form compact' : 'waitlist-form'} action={waitlistEndpoint} method="post" onSubmit={handleSubmit}>
        <div className="waitlist-control">
          <input name="emailOrPhone" type="text" placeholder="Email or phone" aria-label="Email or phone" required />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Joining...' : 'Get early access'}
            <ArrowRight size={18} />
          </button>
        </div>
        <p className={`form-status ${status}`}>
          {status === 'success' && 'You’re on the list.'}
          {status === 'error' && 'Something did not go through. Try again in a moment.'}
        </p>
      </form>

      {showCelebration && (
        <div className="celebration-overlay" role="dialog" aria-modal="true" aria-labelledby="celebration-title">
          <div className="celebration-card">
            <div className="celebration-burst" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <button className="celebration-close" type="button" aria-label="Close thank you message" onClick={() => setShowCelebration(false)}>
              ×
            </button>
            <div className="celebration-logo">
              <Logo />
            </div>
            <div className="celebration-check">
              <Check size={22} />
            </div>
            <p className="celebration-kicker">You’re early</p>
            <h3 id="celebration-title">Thank you for joining PullUp.</h3>
            <p>
              We can’t wait to launch and pull up together for the next drop. We’ll send news, early access, and the first live invites soon.
            </p>
            <button className="celebration-action" type="button" onClick={() => setShowCelebration(false)}>
              I’m ready
              <Sparkles size={17} />
            </button>
          </div>
        </div>
      )}
    </>
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
    <div className="phone-mockup iphone-frame">
      <div className="phone-bar" />
      <div className="phone-header">
        <Logo />
        <div className="avatar">JG</div>
      </div>
      <SignalMap />
      <div className="phone-sheet">
        <div className="sheet-handle" />
        <p className="eyebrow">Nearby now</p>
        <h3>Rooftop Hangout</h3>
        <p>Starts in 22 min · 6 mutuals going</p>
        <div className="mini-proof">
          <span><UsersRound size={14} /> 18 friends nearby</span>
          <span><LockKeyhole size={14} /> exact spot after approval</span>
        </div>
        <div className="phone-actions">
          <button>Pull Up</button>
          <button>Maybe</button>
        </div>
      </div>
      <BottomTabs active="map" />
    </div>
  );
}

function BottomTabs({ active = 'map' }) {
  const tabs = [
    { id: 'map', label: 'Map', icon: Radio },
    { id: 'pulse', label: 'Pulse', icon: Sparkles },
    { id: 'drop', label: 'Drop', icon: Plus },
    { id: 'chats', label: 'Chats', icon: MessageCircle },
    { id: 'you', label: 'You', icon: UserRound },
  ];

  return (
    <div className="bottom-tabs" aria-hidden="true">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <span key={tab.id} className={active === tab.id ? 'active' : ''}>
            <i><Icon size={22} /></i>
            <b>{tab.label}</b>
          </span>
        );
      })}
    </div>
  );
}

function PreviewPhone({ type }) {
  if (type === 'share') {
    return (
      <div className="preview-phone iphone-frame share-phone">
        <div className="phone-bar" />
        <div className="message-screen">
          <div className="message-top">
            <span>Messages</span>
            <b>Today 7:12 PM</b>
          </div>
          <div className="text-row incoming">
            <div className="text-avatar">N</div>
            <p>Pull up tonight?</p>
          </div>
          <div className="message-bubble">
            <p>Nina sent you a PullUp</p>
            <div className="imessage-preview-card">
              <div className="share-card-top">
                <Logo />
                <span><Link2 size={15} /> pullupapp.co/i/matcha-meetup</span>
              </div>
              <div className="share-pulse">
                <i />
                <i />
                <i />
              </div>
              <p className="eyebrow lime">PullUp invite</p>
              <h3>Matcha Meetup</h3>
              <p>Tonight · 8:00 PM · 6 mutuals going · 8 spots</p>
              <div className="share-rsvp">
                <button>Going</button>
                <button>Maybe</button>
                <button>No</button>
              </div>
            </div>
            <small>Tap to RSVP. Open PullUp for details and who else is going.</small>
          </div>
          <div className="text-row outgoing">
            <p>I’m in</p>
          </div>
          <div className="message-compose">
            <span>iMessage</span>
            <Send size={15} />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'shareLegacy') {
    return (
      <div className="preview-phone iphone-frame">
        <div className="phone-bar" />
        <div className="share-card in-phone">
          <div className="share-card-top">
            <Logo />
            <span><Link2 size={15} /> pullupapp.co/i/rooftop</span>
          </div>
          <div className="share-pulse">
            <i />
            <i />
            <i />
          </div>
          <p className="eyebrow lime">PullUp invite</p>
          <h3>Rooftop Hangout</h3>
          <p>Today · starts in 22 min · 6 mutuals going</p>
          <div className="share-rsvp">
            <button>Going</button>
            <button>Maybe</button>
            <button>No</button>
          </div>
          <button className="share-open">Open PullUp <Send size={15} /></button>
        </div>
      </div>
    );
  }

  if (type === 'details') {
    return (
      <div className="preview-phone iphone-frame app-screen-phone">
        <div className="phone-bar" />
        <div className="phone-header">
          <Logo />
          <div className="avatar">JG</div>
        </div>
        <div className="details-screen">
          <div className="screen-topline">
            <p className="eyebrow lime">Details</p>
            <button>Open</button>
          </div>
          <h3>Rooftop Hangout</h3>
          <p>Belltown · 7:30 PM · host approval required</p>
          <strong>Creator hang, skyline view, and open guest spots.</strong>
          <div className="detail-pills">
            <span>18 people looking nearby</span>
            <span>4 spots left</span>
          </div>
          <div className="avatar-stack">
            <i>MC</i>
            <i>AR</i>
            <i>LB</i>
            <i>+6</i>
            <b>18 active</b>
          </div>
          <div className="get-there">
            <p className="eyebrow lime">Get there</p>
            <div>
              <span>Walk <b>11 min</b></span>
              <span>Uber <b>4 min</b></span>
              <span>Lyft <b>6 min</b></span>
            </div>
          </div>
          <div className="phone-actions">
            <button>Pull Up</button>
            <button>Share</button>
          </div>
          <div className="secondary-actions">
            <button>Preview Chat</button>
            <button>Check in</button>
          </div>
        </div>
        <BottomTabs active="map" />
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div className="preview-phone iphone-frame app-screen-phone">
        <div className="phone-bar" />
        <div className="phone-header">
          <Logo />
          <div className="avatar">JG</div>
        </div>
        <div className="pulse-screen">
          <p className="eyebrow lime">Pulse</p>
          <h3>The city is moving.</h3>
          <p>Fresh drops, friends joining, and open plans update here first.</p>
          <div className="pulse-stats">
            <span>42 friends active</span>
            <span>18 fresh joins</span>
            <span>7 crew chats</span>
            <span>4 on the way</span>
          </div>
          <div className="vibe-row">
            <span>🔥<b>Capitol Hill</b></span>
            <span>🏐<b>Green Lake</b></span>
            <span>🎵<b>Belltown</b></span>
          </div>
          <div className="drop-card">
            <p className="eyebrow cyan">Drop</p>
            <h4>Create a PullUp in seconds.</h4>
            <span>Choose vibe, circle, host approval, capacity, and whether extra requests go to waitlist.</span>
            <div className="host-controls" aria-hidden="true">
              <b>Limit 12</b>
              <b>8 spots left</b>
              <b>Waitlist on</b>
            </div>
          </div>
          <div className="chat-card">
            <p className="eyebrow lime">Chats</p>
            <h4>Rooftop crew</h4>
            <span>Ana: I am 6 min away. Save me a spot.</span>
          </div>
        </div>
        <BottomTabs active="pulse" />
      </div>
    );
  }

  return (
    <div className="preview-phone iphone-frame">
      <div className="phone-bar" />
      <div className="phone-header">
        <Logo />
        <div className="avatar">JG</div>
      </div>
      <SignalMap />
      <div className="phone-sheet">
        <div className="sheet-handle" />
        <p className="eyebrow">Nearby now</p>
        <h3>Rooftop Hangout</h3>
        <p>Starts in 22 min · 6 mutuals going</p>
        <div className="phone-actions">
          <button>Pull Up</button>
          <button>Maybe</button>
        </div>
      </div>
      <BottomTabs active="map" />
    </div>
  );
}

function AppPreviewShowcase() {
  return (
    <div className="phone-showcase">
      {appScreens.map((screen) => (
        <article key={screen.title}>
          <PreviewPhone type={screen.type} />
          <p className={screen.eyebrow === 'Pulse' || screen.eyebrow === 'Chats' ? 'eyebrow cyan' : 'eyebrow lime'}>{screen.eyebrow}</p>
          <h3>{screen.title}</h3>
        </article>
      ))}
    </div>
  );
}

function ShareWindow() {
  return (
    <div className="share-window">
      <PreviewPhone type="share" />
      <div className="share-copy">
        <p className="eyebrow cyan">Share window</p>
        <h2>A shared PullUp should feel useful before the app opens.</h2>
        <p>
          A PullUp link should feel useful before someone downloads the app: clear plan, quick RSVP, mutuals, timing, and just enough social context to make opening PullUp feel worth it.
        </p>
        <div className="share-details">
          <span><Check size={16} /> Going, Maybe, or No from the link</span>
          <span><Check size={16} /> Full details and guest list inside the app</span>
          <span><Check size={16} /> Built for iPhone, Android, and text previews</span>
        </div>
      </div>
    </div>
  );
}

function InvitePage() {
  return (
    <main className="invite-page">
      <section className="invite-hero">
        <a href="/" aria-label="PullUp home"><Logo /></a>
        <div className="invite-layout">
          <PreviewPhone type="share" />
          <div className="invite-page-copy">
            <p className="eyebrow lime">PullUp invite</p>
            <h1>Matcha Meetup</h1>
            <p>Nina sent you a PullUp for tonight at 8:00 PM. RSVP from the preview, then open PullUp for the full plan, host approval, and who else is going.</p>
            <div className="invite-page-actions" aria-label="RSVP options">
              <button>Going</button>
              <button>Maybe</button>
              <button>No</button>
            </div>
            <a className="invite-app-link" href="/">Join the early access list</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  return (
    <main className="legal-page">
      <nav className="nav legal-nav">
        <a href="/" aria-label="PullUp home"><Logo /></a>
        <div>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/#waitlist">Waitlist</a>
        </div>
      </nav>
      <section className="legal-card">
        <p className="eyebrow lime">PullUp</p>
        <h1>{isPrivacy ? 'Privacy Policy' : 'Terms of Use'}</h1>
        <p className="legal-date">Last updated May 20, 2026</p>
        {isPrivacy ? (
          <>
            <p>PullUp is being prepared for early access. This policy explains how the waitlist site handles information before the app launches.</p>
            <h2>Information we collect</h2>
            <p>When you join early access, we collect the email address or phone number you submit, the submission time, and basic technical information needed to run the site.</p>
            <h2>How we use it</h2>
            <p>We use waitlist information to send launch updates, beta access, product news, and invite-related communications. We do not sell your waitlist information.</p>
            <h2>Third-party services</h2>
            <p>Waitlist submissions are processed through Formspree. Hosting, analytics, email, and app infrastructure may be added as PullUp moves toward beta.</p>
            <h2>Contact</h2>
            <p>Questions about privacy can be sent to hello@pullupapp.co.</p>
          </>
        ) : (
          <>
            <p>These terms cover use of the PullUp coming-soon website and early access waitlist.</p>
            <h2>Early access</h2>
            <p>Joining the waitlist does not guarantee beta access, app availability, or a specific launch date. Features shown on the site are previews and may change.</p>
            <h2>Acceptable use</h2>
            <p>Do not misuse the site, attempt to disrupt service, submit false information at scale, or use PullUp branding without permission.</p>
            <h2>Product changes</h2>
            <p>PullUp is in development. We may update, pause, or change parts of the site, invite flow, and app experience as we build.</p>
            <h2>Contact</h2>
            <p>Questions about these terms can be sent to hello@pullupapp.co.</p>
          </>
        )}
      </section>
    </main>
  );
}

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith('/i/')) return <InvitePage />;
  if (path === '/privacy') return <LegalPage type="privacy" />;
  if (path === '/terms') return <LegalPage type="terms" />;

  return (
    <main>
      <nav className="nav">
        <a href="#top" aria-label="PullUp home"><Logo /></a>
        <div>
          <a href="#what">What</a>
          <a href="#how">How</a>
          <a href="#previews">Previews</a>
          <a href="#share">Share</a>
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
          <h1>See what’s actually happening nearby.</h1>
          <p>
            Stop wondering what everyone’s doing. PullUp shows live plans, nearby activity, and people who are open to doing something now, so making real plans feels effortless.
          </p>
          <WaitlistForm />
          <div className="hero-proof">
            <span><Check size={15} /> Real plans</span>
            <span><Check size={15} /> Soft-location privacy</span>
            <span><Check size={15} /> People ready now</span>
          </div>
        </div>
      </section>

      <section className="why-section">
        <p className="eyebrow lime">Why PullUp exists</p>
        <h2>Plans should not disappear inside group chats.</h2>
        <p>
          Feeds keep you scrolling. PullUp gives you a live view of nearby plans, people, and moments worth showing up for, designed for the people who still want the internet to lead somewhere real.
        </p>
      </section>

      <section className="what-section" id="what">
        <p className="eyebrow lime">What is PullUp</p>
        <h2>Real plans. Real people. Right now.</h2>
        <p>
          PullUp is a live social layer for real life. It shows what is forming nearby, who is open to doing something, and where your friends or circles are creating momentum, without turning connection into another feed.
        </p>
      </section>

      <section className="how-section" id="how">
        <div className="section-heading">
          <p className="eyebrow cyan">How it works</p>
          <h2>Find the move. Know the people. Pull up.</h2>
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
          <h2>Real app moments, shown at iPhone scale.</h2>
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

      <section className="share-section" id="share">
        <ShareWindow />
      </section>

      <section className="philosophy-section">
        <div>
          <MessageCircle size={28} />
          <h2>Social media keeps people online. PullUp helps people show up.</h2>
          <p>
            Pulling people to real life means less performative posting and more lightweight coordination, trust, and timing. See the signal, choose the plan, and show up while it is still happening.
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
        <h2>Be first to PullUp.</h2>
        <p>Get early access, TestFlight drops, and the first city rollout for a social app built around real plans, not passive scrolling.</p>
        <WaitlistForm compact />
      </section>

      <footer className="site-footer">
        <Logo />
        <div>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:hello@pullupapp.co">Contact</a>
        </div>
      </footer>
    </main>
  );
}
