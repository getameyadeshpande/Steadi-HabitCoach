import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ChevronRight,
  Coffee,
  Dumbbell,
  Footprints,
  Heart,
  Leaf,
  Moon,
  MessageCircle,
  Sparkles,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: SteadiApp,
});

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Persona = "priya" | "rahul" | "new";
type Screen = "landing" | "onboarding" | "checkin" | "log" | "progress";
type Tab = "checkin" | "log" | "progress";
type HabitKey = "move" | "sleep" | "eat" | "stress";

type Msg =
  | { kind: "ai"; text: string }
  | { kind: "human"; name: string; text: string }
  | { kind: "user"; text: string };

type DayGroup = { date: string; messages: Msg[] };

/* ------------------------------------------------------------------ */
/* Root                                                               */
/* ------------------------------------------------------------------ */

function SteadiApp() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [persona, setPersona] = useState<Persona | null>(null);
  const [tab, setTab] = useState<Tab>("checkin");

  const goLanding = () => {
    setScreen("landing");
    setPersona(null);
    setTab("checkin");
  };

  const startPersona = (p: Persona) => {
    setPersona(p);
    if (p === "new") {
      setScreen("onboarding");
    } else {
      setScreen("checkin");
      setTab("checkin");
    }
  };

  const finishOnboarding = () => {
    setScreen("checkin");
    setTab("checkin");
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col">
        {screen === "landing" && <Landing onStart={startPersona} />}
        {screen === "onboarding" && <Onboarding onDone={finishOnboarding} onBack={goLanding} />}
        {(screen === "checkin" || screen === "log" || screen === "progress") && persona && (
          <AppShell
            persona={persona}
            tab={tab}
            onTab={setTab}
            onBack={goLanding}
            screen={screen}
            setScreen={setScreen}
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Landing                                                            */
/* ------------------------------------------------------------------ */

function Landing({ onStart }: { onStart: (p: Persona) => void }) {
  return (
    <div className="flex flex-col gap-8 px-5 pb-14 pt-10">
      {/* Brand */}
      <header className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_2px_0_rgba(47,82,51,0.08)]">
          <Leaf className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-serif text-5xl leading-none text-foreground">Steadi</h1>
          <p className="mt-3 max-w-[26ch] text-[15px] leading-relaxed text-muted-foreground">
            Habit coaching for real life. No streaks, no guilt, no end date.
          </p>
        </div>
      </header>

      {/* Thesis hero */}
      <section className="rounded-3xl border border-border bg-card p-6 shadow-[0_2px_0_rgba(47,82,51,0.03)]">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary-deep">
            Made for the long run
          </p>
        </div>
        <h2 className="mt-3 font-serif text-[34px] leading-[1.05] text-foreground">
          Habits that outlast the hype.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Most habit apps peak in week one. Steadi is designed for the messy middle. Sick
          days, travel, bad weeks, and quiet comebacks. All part of the plan.
        </p>

        {/* Rhythm ribbon — 24 weeks of real life */}
        <RhythmRibbon />
      </section>

      {/* Quote */}
      <section className="rounded-3xl bg-primary-soft/70 p-6">
        <p className="font-serif text-[22px] leading-snug text-primary-deep">
          &ldquo;I&rsquo;ve done this before and it didn&rsquo;t stick.&rdquo;
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-primary-deep/80">
          That&rsquo;s why we don&rsquo;t count streaks. Missed a day? It&rsquo;s just a day.
          Come back when you can.
        </p>
      </section>

      {/* Auth */}
      <section className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-muted-foreground">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="h-12 rounded-2xl border border-border bg-card px-4 text-[15px] outline-none placeholder:text-muted-foreground/70 focus:border-primary/60"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-muted-foreground">Password</span>
          <input
            type="password"
            placeholder="••••••••"
            className="h-12 rounded-2xl border border-border bg-card px-4 text-[15px] outline-none placeholder:text-muted-foreground/70 focus:border-primary/60"
          />
        </label>

        <button className="mt-2 h-12 rounded-full bg-primary text-[15px] font-semibold text-primary-foreground transition-transform active:scale-[0.99]">
          Sign in
        </button>
        <button className="text-[13px] text-muted-foreground hover:text-foreground">
          New to Steadi? <span className="font-medium text-primary-deep">Create an account</span>
        </button>

        <div className="my-2 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          className="flex h-12 items-center justify-center gap-2 rounded-full text-[14px] font-medium text-white"
          style={{ backgroundColor: "#0f0f0f" }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M16.365 1.43c0 1.14-.47 2.24-1.23 3.05-.82.86-2.15 1.52-3.24 1.44-.14-1.11.44-2.28 1.15-3.05.79-.86 2.19-1.5 3.32-1.44zM20.5 17.36c-.55 1.27-.82 1.83-1.54 2.95-1 1.57-2.42 3.52-4.17 3.53-1.56.01-1.96-1.02-4.08-1.01-2.12.01-2.56 1.03-4.12 1.02-1.75-.01-3.09-1.78-4.09-3.35C.85 17.53.51 12.75 2.28 10.2c1.26-1.83 3.25-2.9 5.12-2.9 1.9 0 3.1 1.04 4.66 1.04 1.52 0 2.44-1.04 4.65-1.04 1.66 0 3.42.91 4.66 2.48-4.1 2.24-3.44 8.1-.87 7.58z" />
          </svg>
          Continue with Apple
        </button>
        <button className="flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card text-[14px] font-medium text-foreground">
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c6.9 0 9.6-4.8 9.6-7.3 0-.5-.1-.9-.1-1.3H12z" />
            <path fill="#34A853" d="M3.9 7.4l3 2.2C7.6 8 9.6 6.9 12 6.9c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.4 12 2.4 8.3 2.4 5.1 4.5 3.9 7.4z" />
            <path fill="#FBBC05" d="M12 21.6c2.5 0 4.6-.8 6.1-2.2l-2.9-2.4c-.8.6-1.9 1-3.2 1-2.5 0-4.6-1.7-5.4-4l-3 2.3c1.2 2.9 4.4 5.3 8.4 5.3z" />
            <path fill="#4285F4" d="M21.5 12c0-.5-.1-.9-.1-1.3H12v3.9h5.5c-.3 1.4-1.1 2.5-2.3 3.3l2.9 2.4c1.7-1.6 2.9-4 2.9-8.3z" />
          </svg>
          Continue with Google
        </button>
      </section>

      {/* Stakeholder demo */}
      <section className="rounded-3xl border border-dashed border-primary-deep/30 bg-primary-soft/25 p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary-deep">
          Stakeholder demo
        </p>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          Skip auth and jump into a scenario.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => onStart("priya")}
            className="flex flex-col items-start gap-2 rounded-2xl bg-primary-deep p-4 text-left text-primary-foreground shadow-[0_2px_0_rgba(47,82,51,0.15)]"
          >
            <span className="text-[11px] uppercase tracking-widest opacity-70">On track</span>
            <span className="font-serif text-lg leading-tight">Continue as Priya</span>
            <span className="text-[12px] leading-snug opacity-80">
              Consistent week. Coach reinforcing progress.
            </span>
          </button>
          <button
            onClick={() => onStart("rahul")}
            className="flex flex-col items-start gap-2 rounded-2xl bg-human p-4 text-left text-human-foreground shadow-[0_2px_0_rgba(160,70,40,0.15)]"
          >
            <span className="text-[11px] uppercase tracking-widest opacity-80">Needs support</span>
            <span className="font-serif text-lg leading-tight">Continue as Rahul</span>
            <span className="text-[12px] leading-snug opacity-90">
              Busy week. Human coach stepping in.
            </span>
          </button>
        </div>

        <button
          onClick={() => onStart("new")}
          className="mt-3 flex w-full items-center justify-between rounded-2xl border border-border bg-card p-4 text-left"
        >
          <div>
            <div className="text-[14px] font-medium text-foreground">Continue as New User</div>
            <div className="text-[12px] text-muted-foreground">
              Full onboarding flow
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </section>

      <footer className="pt-2 text-center text-[11px] text-muted-foreground">
        A prototype. No account, no data stored.
      </footer>
    </div>
  );
}

/* Rhythm ribbon — 24 weeks proving the thesis visually */
function RhythmRibbon() {
  // 24 weeks × 7 days. Values: "done" | "rest" | "empty" | "today"
  // Composed to feel real: strong start, a rough patch around w6-w8, quiet
  // comeback, travel week, sustained but imperfect middle.
  const weeks = useMemo(() => generateRhythm(), []);
  const currentWeek = 16;

  // Retention curve points across 24 weeks
  const curvePath = useMemo(() => {
    const pts = [
      [0, 62],
      [12, 46],
      [26, 40],
      [42, 52],
      [58, 44],
      [74, 42],
      [90, 46],
      [110, 44],
      [130, 48],
      [150, 46],
      [170, 50],
      [190, 48],
      [210, 52],
      [230, 50],
      [252, 52],
    ];
    return pts
      .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
      .join(" ");
  }, []);

  return (
    <div className="mt-6 rounded-2xl border border-border/70 bg-background/60 p-4">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary-deep/80">
          Six months of real life
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" />
            done
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary-soft" />
            rest
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full border border-border" />
            quiet
          </span>
        </div>
      </div>

      <div className="relative mt-3">
        <svg viewBox="0 0 252 84" className="block w-full">
          {/* baseline */}
          <line x1="0" y1="72" x2="252" y2="72" stroke="oklch(0.88 0.015 85)" strokeWidth="0.5" />
          {/* dots */}
          {weeks.map((week, wi) =>
            week.map((d, di) => {
              const x = wi * (252 / 24) + 2;
              const y = 6 + di * 9;
              if (d === "done")
                return <circle key={`${wi}-${di}`} cx={x} cy={y} r="2.6" fill="oklch(0.42 0.055 150)" />;
              if (d === "rest")
                return <circle key={`${wi}-${di}`} cx={x} cy={y} r="2.6" fill="oklch(0.9 0.03 145)" />;
              if (d === "today")
                return (
                  <circle
                    key={`${wi}-${di}`}
                    cx={x}
                    cy={y}
                    r="2.8"
                    fill="none"
                    stroke="oklch(0.42 0.055 150)"
                    strokeWidth="1"
                    strokeDasharray="1.2 1.2"
                  />
                );
              return (
                <circle
                  key={`${wi}-${di}`}
                  cx={x}
                  cy={y}
                  r="1.6"
                  fill="none"
                  stroke="oklch(0.88 0.015 85)"
                  strokeWidth="0.7"
                />
              );
            }),
          )}
          {/* sustained curve overlay */}
          <path
            d={curvePath}
            fill="none"
            stroke="oklch(0.34 0.06 150)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* today marker */}
          <line
            x1={currentWeek * (252 / 24) + 2}
            y1="0"
            x2={currentWeek * (252 / 24) + 2}
            y2="80"
            stroke="oklch(0.42 0.055 150)"
            strokeWidth="0.6"
            strokeDasharray="1.5 2"
            opacity="0.5"
          />
        </svg>

        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>Wk 1</span>
          <span>Wk 8</span>
          <span>Wk 16</span>
          <span>Wk 24</span>
        </div>
      </div>

      {/* Coach bubble anchored at the rough patch */}
      <div className="mt-4 flex items-start gap-2 rounded-2xl bg-primary-soft/60 p-3">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Sparkles className="h-3 w-3" />
        </div>
        <div className="text-[13px] leading-snug text-primary-deep">
          <span className="font-medium">Week 7 was heavy.</span> We shrank the goal, kept
          the rhythm, and picked back up in week nine. That&rsquo;s the plan working.
        </div>
      </div>
    </div>
  );
}

function generateRhythm(): ("done" | "rest" | "empty" | "today")[][] {
  // Curated pattern for 24 weeks
  const template = [
    "DDRDDRR", // wk 1
    "DDRDDDR",
    "DDRDDRR",
    "DRDRDRR",
    "DRDREER", // dip start (travel)
    "EDRERER",
    "REEEERE", // rough patch
    "REEEERR",
    "DREREER", // quiet comeback
    "DRDREER",
    "DRDRDRR",
    "DDRDRDR",
    "DRDRDRR",
    "DDRDRDR",
    "DRDRDRR",
    "DDRDRDR",
    "DTRRRRR", // current week — today is Mon
    "EEEEEEE",
    "EEEEEEE",
    "EEEEEEE",
    "EEEEEEE",
    "EEEEEEE",
    "EEEEEEE",
    "EEEEEEE",
  ];
  const map: Record<string, "done" | "rest" | "empty" | "today"> = {
    D: "done",
    R: "rest",
    E: "empty",
    T: "today",
  };
  return template.map((row) => row.split("").map((c) => map[c] ?? "empty"));
}

/* ------------------------------------------------------------------ */
/* Onboarding                                                         */
/* ------------------------------------------------------------------ */

const HABITS: {
  key: HabitKey;
  emoji: string;
  label: string;
  question: string;
  options: string[];
  goal: string;
}[] = [
  {
    key: "move",
    emoji: "🚶",
    label: "Move more",
    question: "When could a short walk actually fit your day?",
    options: ["Before work", "Lunch break", "After dinner", "Whenever it fits"],
    goal: "2 walks this week",
  },
  {
    key: "sleep",
    emoji: "🌙",
    label: "Sleep better",
    question: "What's the hardest part about sleep right now?",
    options: ["Winding down", "Phone in bed", "Waking up tired", "Falling asleep"],
    goal: "one no-phone hour before bed, twice this week",
  },
  {
    key: "eat",
    emoji: "🥗",
    label: "Eat mindfully",
    question: "Which meal feels the most rushed?",
    options: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    goal: "one unrushed meal this week",
  },
  {
    key: "stress",
    emoji: "🌿",
    label: "Reduce stress",
    question: "What tends to spike your stress most?",
    options: ["Work overload", "Poor sleep", "Family things", "Doom scrolling"],
    goal: "two 5-minute pauses this week",
  },
];

function Onboarding({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [habit, setHabit] = useState<HabitKey | null>(null);
  const [context, setContext] = useState<string | null>(null);

  const chosen = HABITS.find((h) => h.key === habit);

  return (
    <div className="flex min-h-screen flex-col px-5 pb-10 pt-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => (step === 0 ? onBack() : setStep(step - 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <div className="h-9 w-9" />
      </div>

      <div className="mt-8 flex flex-1 flex-col">
        {step === 0 && (
          <>
            <h2 className="font-serif text-3xl leading-tight">What&rsquo;s one habit you want to build?</h2>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Pick one. You can always change it later.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {HABITS.map((h) => (
                <button
                  key={h.key}
                  onClick={() => {
                    setHabit(h.key);
                    setContext(null);
                    setStep(1);
                  }}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                    habit === h.key
                      ? "border-primary bg-primary-soft/50"
                      : "border-border bg-card"
                  }`}
                >
                  <span className="text-2xl">{h.emoji}</span>
                  <span className="text-[15px] font-medium">{h.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && chosen && (
          <>
            <h2 className="font-serif text-3xl leading-tight">{chosen.question}</h2>
            <p className="mt-2 text-[14px] text-muted-foreground">
              No wrong answer. This just helps me nudge at the right time.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {chosen.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setContext(opt);
                    setStep(2);
                  }}
                  className={`rounded-2xl border p-4 text-left text-[15px] transition-colors ${
                    context === opt
                      ? "border-primary bg-primary-soft/50"
                      : "border-border bg-card"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && chosen && (
          <>
            <div className="rounded-3xl bg-primary-deep p-6 text-primary-foreground shadow-[0_8px_28px_-12px_rgba(47,82,51,0.4)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                {chosen.emoji}
              </div>
              <h2 className="mt-5 font-serif text-3xl leading-tight">
                Let&rsquo;s start with {chosen.goal}.
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed opacity-90">
                That&rsquo;s it. No streaks. No pressure. If life happens, we&rsquo;ll adjust
                together.
              </p>
            </div>

            <div className="mt-5 rounded-3xl border border-border bg-card p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary-deep">
                Our promise
              </p>
              <ul className="mt-3 flex flex-col gap-2.5 text-[14px]">
                {[
                  "No end date. Ever.",
                  "AI that adapts to you, not the other way around.",
                  "Real humans when you need them.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft">
                      <Check className="h-3 w-3 text-primary-deep" />
                    </span>
                    <span className="text-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1" />
            <button
              onClick={onDone}
              className="mt-8 flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-primary-foreground"
            >
              Start with Steadi
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App shell (checkin / log / progress)                               */
/* ------------------------------------------------------------------ */

function AppShell({
  persona,
  tab,
  onTab,
  onBack,
  screen,
  setScreen,
}: {
  persona: Persona;
  tab: Tab;
  onTab: (t: Tab) => void;
  onBack: () => void;
  screen: Screen;
  setScreen: (s: Screen) => void;
}) {
  const initial = persona === "priya" ? "P" : persona === "rahul" ? "R" : "N";

  return (
    <div className="flex min-h-screen flex-col pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/70 bg-background/85 px-5 py-3 backdrop-blur">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="font-serif text-lg">Steadi</span>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft/70 text-[13px] font-semibold text-primary-deep">
          {initial}
        </div>
      </div>

      {tab === "checkin" && <CheckIn persona={persona} />}
      {tab === "log" && <LogScreen />}
      {tab === "progress" && <ProgressScreen persona={persona} />}

      {/* Bottom tabs */}
      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-[440px] items-stretch justify-around border-t border-border bg-card/95 px-3 py-2.5 backdrop-blur">
        {(
          [
            { key: "checkin", label: "Check-in", icon: MessageCircle },
            { key: "log", label: "Log", icon: Check },
            { key: "progress", label: "Progress", icon: Heart },
          ] as const
        ).map((t) => {
          const active = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => {
                onTab(t.key);
                setScreen(t.key);
              }}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] transition-colors ${
                active ? "text-primary-deep" : "text-muted-foreground"
              }`}
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={active ? 2.25 : 1.75}
              />
              <span className={active ? "font-semibold" : "font-medium"}>{t.label}</span>
            </button>
          );
        })}
      </nav>
      {/* silence unused screen var */}
      <span className="hidden">{screen}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Check-in                                                           */
/* ------------------------------------------------------------------ */

function CheckIn({ persona }: { persona: Persona }) {
  const cfg = useMemo(() => getCheckinConfig(persona), [persona]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [persona]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 pb-6 pt-5">
      {/* AI opener */}
      <div className="rounded-3xl bg-gradient-to-b from-primary-soft/70 to-card p-5 shadow-[0_2px_0_rgba(47,82,51,0.03)]">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-deep px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-primary-foreground">
            <Sparkles className="h-3 w-3" /> AI Coach
          </span>
          <span className="text-[11px] text-muted-foreground">Today, Thu 24 Jul</span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground">{cfg.opener}</p>
      </div>

      {/* Stats card */}
      <div className="mt-4 rounded-3xl border border-border bg-card p-5">
        {persona === "new" ? (
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-2xl">
              🌱
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-widest text-primary-deep">
                Week 1 · Day 1
              </div>
              <div className="mt-1 text-[14px] text-foreground">
                Your goal: <span className="font-medium">a gentle start</span>.
              </div>
            </div>
          </div>
        ) : (
          <>
            <MiniBars data={cfg.week} />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {cfg.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-primary-soft/40 px-2 py-3">
                  <div className="font-serif text-2xl leading-none text-primary-deep">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* History */}
      <div className="mt-6 flex flex-col gap-6">
        {cfg.history.map((day) => (
          <div key={day.date}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {day.date}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="flex flex-col gap-3">
              {day.messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="sticky bottom-0 mt-6 -mx-5 border-t border-border bg-background/90 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
          <input
            placeholder="Reply to your coach"
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/70"
          />
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  if (msg.kind === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary-soft px-4 py-2.5 text-[14px] text-primary-deep">
          {msg.text}
        </div>
      </div>
    );
  }
  if (msg.kind === "human") {
    return (
      <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-human/20 bg-human-soft/70 p-4">
        <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-human px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-human-foreground">
          <Heart className="h-3 w-3" /> Human Coach · {msg.name}
        </div>
        <p className="text-[14px] leading-relaxed text-foreground">{msg.text}</p>
      </div>
    );
  }
  return (
    <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-border bg-card p-4">
      <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-primary-deep/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary-foreground">
        <Sparkles className="h-3 w-3" /> AI Coach
      </div>
      <p className="text-[14px] leading-relaxed text-foreground">{msg.text}</p>
    </div>
  );
}

function MiniBars({ data }: { data: number[] }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return <BarChart data={data} labels={days} height={80} emptyLabel="A quiet week so far. Log when it's useful." />;
}

function BarChart({
  data,
  labels,
  height,
  emptyLabel,
}: {
  data: number[];
  labels: string[];
  height: number;
  emptyLabel?: string;
}) {
  const max = Math.max(1, ...data);
  const allZero = data.every((v) => v === 0);
  return (
    <div>
      <div className="relative" style={{ height }}>
        {/* gridlines */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-px w-full bg-border/60" style={{ opacity: i === 3 ? 1 : 0.5 }} />
          ))}
        </div>
        <div className="relative flex h-full items-end justify-between gap-1.5">
          {data.map((v, i) => {
            const h = v === 0 ? 6 : Math.max(10, (v / max) * 100);
            return (
              <div key={i} className="flex flex-1 items-end justify-center h-full">
                {v === 0 ? (
                  <div
                    className="w-full rounded-md border border-dashed border-border bg-transparent"
                    style={{ height: `${h}%` }}
                  />
                ) : (
                  <div
                    className="w-full rounded-md bg-gradient-to-t from-primary-deep to-primary shadow-[0_1px_0_rgba(47,82,51,0.08)]"
                    style={{ height: `${h}%` }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {allZero && emptyLabel && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-card/90 px-3 py-1 text-[11px] leading-relaxed text-muted-foreground shadow-[0_1px_0_rgba(47,82,51,0.04)]">
              {emptyLabel}
            </span>
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-between px-0.5 text-[10px] text-muted-foreground">
        {labels.map((d, i) => (
          <span key={i} className="flex-1 text-center">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function getCheckinConfig(persona: Persona): {
  opener: string;
  week: number[];
  stats: { value: string; label: string }[];
  history: DayGroup[];
} {
  if (persona === "priya") {
    return {
      opener:
        "Morning, Priya. Three walks in already this week, and Tuesday's rest day was a smart call. Want to keep today light and aim for one more walk after work?",
      week: [3, 0, 2, 1, 2, 1, 0],
      stats: [
        { value: "3", label: "Walks" },
        { value: "2", label: "Rest days" },
        { value: "5", label: "Balanced meals" },
      ],
      history: [
        {
          date: "Mon 21 Jul",
          messages: [
            {
              kind: "ai",
              text: "Nice start to the week. Morning walk logged. How did it feel?",
            },
            { kind: "user", text: "Actually really good. Slept better too." },
          ],
        },
        {
          date: "Tue 22 Jul",
          messages: [
            {
              kind: "ai",
              text: "Your calendar looks packed today. Want to call this a rest day and pick back up tomorrow?",
            },
            { kind: "user", text: "Yeah, let's rest." },
            {
              kind: "ai",
              text: "Rest day it is. That's part of the plan, not a break from it.",
            },
          ],
        },
        {
          date: "Wed 23 Jul",
          messages: [
            {
              kind: "human",
              name: "Meera",
              text: "Hey Priya, just popping in. Three weeks of consistent movement is real. Really proud of the way you're pacing yourself, especially taking Tuesday off without guilt. Small suggestion: try a short walk before dinner this week. It tends to make evenings feel less rushed. No pressure though. You're steering.",
            },
            { kind: "user", text: "Thanks Meera, that means a lot. Will try tonight." },
          ],
        },
      ],
    };
  }

  if (persona === "rahul") {
    return {
      opener:
        "Hey Rahul. Looks like this week got heavy. No worries at all. Want to shrink the goal to just one short walk today, whenever it fits?",
      week: [1, 0, 0, 0, 0, 0, 0],
      stats: [
        { value: "1", label: "Walks" },
        { value: "4", label: "Rest days" },
        { value: "2", label: "Meals logged" },
      ],
      history: [
        {
          date: "Mon 21 Jul",
          messages: [
            { kind: "ai", text: "One walk in. Nice. How are you feeling about the week ahead?" },
            { kind: "user", text: "Honestly slammed. Product launch this week." },
            {
              kind: "ai",
              text: "Got it. Let's not add pressure. I'll lower the bar and check in less. You focus on the launch.",
            },
          ],
        },
        {
          date: "Wed 23 Jul",
          messages: [
            {
              kind: "ai",
              text: "No activity logged yesterday or today. That's fine. Just checking in.",
            },
          ],
        },
        {
          date: "Fri 25 Jul",
          messages: [
            {
              kind: "human",
              name: "Arjun",
              text: "Hey Rahul, Arjun here. I noticed the AI's been backing off this week, which is right. Launch weeks are launch weeks.",
            },
            {
              kind: "human",
              name: "Arjun",
              text: "Here's what I want to do: for the next seven days, we drop walking entirely. Your only ask is to tap your mood once a day. That's it. Below the bar, on purpose.",
            },
            {
              kind: "human",
              name: "Arjun",
              text: "When things settle, we'll rebuild slowly. You're not behind. You're just busy. Different thing.",
            },
            { kind: "user", text: "Okay. That actually helps. Thank you." },
          ],
        },
        {
          date: "Mon 28 Jul",
          messages: [
            {
              kind: "ai",
              text: "Fresh week. No walking goal, just mood. Whenever you have a second, tap how you're feeling.",
            },
          ],
        },
      ],
    };
  }

  // new user
  return {
    opener:
      "Welcome in. You picked 2 walks this week, which is a great starting size. I won't ping you every day. I'll check in when it's actually useful.",
    week: [0, 0, 0, 0, 0, 0, 0],
    stats: [
      { value: "0", label: "Walks" },
      { value: "0", label: "Rest days" },
      { value: "0", label: "Meals logged" },
    ],
    history: [
      {
        date: "Thu 24 Jul",
        messages: [
          {
            kind: "ai",
            text: "Quick note on how I work: I adapt. If you have a great week, we'll gently increase. If you have a rough one, we'll shrink the goal so you can still show up. There's no failing here.",
          },
          {
            kind: "ai",
            text: "Whenever you're ready, head to the Log tab and tap what you did today. Under ten seconds.",
          },
        ],
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Log                                                                */
/* ------------------------------------------------------------------ */

function LogScreen() {
  const [walk, setWalk] = useState(0);
  const [workout, setWorkout] = useState(0);
  const [rest, setRest] = useState(0);
  const [meal, setMeal] = useState(false);
  const [mood, setMood] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const hasInput = walk + workout + rest > 0 || meal || mood !== null;

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_28px_-12px_rgba(47,82,51,0.4)]">
          <Check className="h-9 w-9" strokeWidth={2.5} />
        </div>
        <h2 className="mt-6 font-serif text-3xl leading-tight">Today&rsquo;s log is in.</h2>
        <p className="mt-3 text-[14px] text-muted-foreground">
          Locked in for Thu, 24 Jul. See you tomorrow.
        </p>
        <div className="mt-8 flex flex-col gap-2 text-[13px] text-muted-foreground">
          {walk > 0 && <div>Walk ×{walk}</div>}
          {workout > 0 && <div>Workout ×{workout}</div>}
          {rest > 0 && <div>Rest ×{rest}</div>}
          {meal && <div>Meal logged</div>}
          {mood !== null && <div>Mood recorded</div>}
        </div>
      </div>
    );
  }

  const activities = [
    { key: "walk", label: "Walk", meta: "10 min", Icon: Footprints, value: walk, set: setWalk },
    {
      key: "workout",
      label: "Workout",
      meta: "15 min",
      Icon: Dumbbell,
      value: workout,
      set: setWorkout,
    },
    { key: "rest", label: "Rest Day", meta: "recovery", Icon: Coffee, value: rest, set: setRest },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-5 pb-8 pt-5">
      <h2 className="font-serif text-3xl leading-tight">Habit log</h2>
      <p className="mt-1 text-[13px] text-muted-foreground">Logging for Thu, 24 Jul</p>
      <p className="mt-2 text-[13px] text-muted-foreground">
        Tap what you did. Under 10 seconds, promise.
      </p>

      {/* Activity */}
      <section className="mt-6">
        <SectionHeader label="Activity" done={walk + workout + rest > 0} summary={`Walk ×${walk}, Workout ×${workout}, Rest ×${rest}`} />
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {activities.map((a) => {
            const on = a.value > 0;
            const Icon = a.Icon;
            return (
              <button
                key={a.key}
                onClick={() => a.set(a.value + 1)}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors ${
                  on ? "border-primary bg-primary-soft/70" : "border-border bg-card"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${on ? "text-primary-deep" : "text-muted-foreground"}`}
                  strokeWidth={on ? 2 : 1.75}
                />
                <span className="text-[13px] font-medium">{a.label}</span>
                <span className="text-[11px] text-muted-foreground">{a.meta}</span>
                {on && (
                  <span className="absolute right-2 top-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    ×{a.value}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Meal */}
      <section className="mt-6">
        <SectionHeader label="Meal" done={meal} summary="Meal logged" />
        {!meal ? (
          <button
            onClick={() => setMeal(true)}
            className="mt-3 flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center"
          >
            <Camera className="h-6 w-6 text-muted-foreground" strokeWidth={1.75} />
            <span className="text-[14px] font-medium">Snap your meal</span>
            <span className="text-[12px] text-muted-foreground">
              We&rsquo;ll take a look, no calories counted.
            </span>
          </button>
        ) : (
          <div className="mt-3 flex items-start gap-3 rounded-2xl bg-primary-soft/70 p-4">
            <Utensils className="h-5 w-5 shrink-0 text-primary-deep" strokeWidth={2} />
            <div>
              <div className="text-[11px] font-medium uppercase tracking-widest text-primary-deep">
                AI feedback
              </div>
              <div className="mt-1 text-[14px] text-foreground">
                Looks like a balanced plate.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Mood */}
      <section className="mt-6">
        <SectionHeader label="Mood" done={mood !== null} summary="Mood recorded" />
        <div className="mt-3 grid grid-cols-5 gap-2">
          {[
            { e: "😔", l: "Low" },
            { e: "😕", l: "Meh" },
            { e: "😐", l: "Okay" },
            { e: "🙂", l: "Good" },
            { e: "😊", l: "Happy" },
          ].map((m, i) => {
            const on = mood === i;
            return (
              <button
                key={m.l}
                onClick={() => setMood(i)}
                className={`flex flex-col items-center gap-1 rounded-2xl border py-3 text-center transition-colors ${
                  on
                    ? "border-primary bg-primary-soft/70 text-primary-deep"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <span className="text-xl leading-none">{m.e}</span>
                <span className="text-[10px] font-medium">{m.l}</span>
              </button>
            );
          })}
        </div>
      </section>

      <button
        onClick={() => setSubmitted(true)}
        disabled={!hasInput}
        className={`mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-colors ${
          hasInput
            ? "bg-primary text-primary-foreground"
            : "bg-border text-muted-foreground"
        }`}
      >
        Submit Today&rsquo;s Log
      </button>
    </div>
  );
}

function SectionHeader({
  label,
  done,
  summary,
}: {
  label: string;
  done: boolean;
  summary?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="font-serif text-lg">{label}</h3>
        {done && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
            <Check className="h-2.5 w-2.5 text-primary-foreground" strokeWidth={3} />
          </span>
        )}
      </div>
      {done && summary && (
        <span className="text-[11px] text-muted-foreground">{summary}</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress                                                           */
/* ------------------------------------------------------------------ */

function ProgressScreen({ persona }: { persona: Persona }) {
  const cfg = useMemo(() => getProgressConfig(persona), [persona]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex-1 overflow-y-auto px-5 pb-8 pt-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary-deep">
        This week
      </p>
      <h2 className="mt-1.5 font-serif text-3xl leading-tight">How your week&rsquo;s going</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{cfg.sub}</p>

      {/* Movement */}
      <Card>
        <CardHeader icon={<Footprints className="h-4 w-4" />} label="Movement" value={`${cfg.movement.reduce((a, b) => a + b, 0)} sessions`} />
        <div className="mt-4">
          <BarChart
            data={cfg.movement}
            labels={days.map((d) => d[0])}
            height={96}
            emptyLabel="Nothing logged yet. Your week is a blank page."
          />
        </div>
      </Card>

      {/* Nutrition */}
      <Card>
        <CardHeader
          icon={<UtensilsCrossed className="h-4 w-4" />}
          label="Nutrition"
          value={`${cfg.meals.filter(Boolean).length} balanced meals`}
        />
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {cfg.meals.map((m, i) => (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-xl text-lg ${
                m ? "bg-primary-soft/70" : "bg-border/40 text-muted-foreground/40"
              }`}
            >
              {m ? "🥗" : ""}
            </div>
          ))}
        </div>
      </Card>

      {/* Mood */}
      <Card>
        <CardHeader
          icon={<Heart className="h-4 w-4" />}
          label="Mood"
          value={cfg.moodAvg}
        />
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {cfg.moods.map((m, i) => (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-xl text-lg ${
                m ? "bg-card border border-border" : "bg-border/40"
              }`}
            >
              {m ? m : <Moon className="h-3.5 w-3.5 text-muted-foreground/50" />}
            </div>
          ))}
        </div>
        {cfg.moods.some((m) => !m) && (
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            Empty days mean no activity logged. That&rsquo;s fine, not a miss.
          </p>
        )}
      </Card>

      {/* Retention thesis */}
      <Card>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary-deep">
          Built for the long run
        </p>
        <div className="mt-4">
          <RetentionChart />
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
          Most programs peak in Week 1 and drop off by Week 12. Steadi has no end date. We
          adapt with you, gently, for as long as you need.
        </p>
      </Card>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-[0_2px_0_rgba(47,82,51,0.03)]">
      {children}
    </div>
  );
}

function CardHeader({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-primary-deep">
        {icon}
        <span className="text-[13px] font-medium">{label}</span>
      </div>
      <span className="font-serif text-lg text-foreground">{value}</span>
    </div>
  );
}

function RetentionChart() {
  return (
    <svg viewBox="0 0 300 140" className="block w-full">
      <defs>
        <linearGradient id="steadiFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.42 0.055 150)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="oklch(0.42 0.055 150)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[20, 50, 80, 110].map((y) => (
        <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="oklch(0.88 0.015 85)" strokeWidth="1" opacity={y === 110 ? 1 : 0.5} />
      ))}
      {/* steadi fill */}
      <path
        d="M 4 90 C 60 76, 120 68, 180 62 S 260 52, 296 50 L 296 110 L 4 110 Z"
        fill="url(#steadiFill)"
      />
      {/* typical program */}
      <path
        d="M 4 78 C 40 30, 80 22, 120 34 S 200 108, 296 116"
        fill="none"
        stroke="oklch(0.5 0.02 90)"
        strokeWidth="1.6"
        strokeDasharray="4 4"
      />
      {/* steadi */}
      <path
        d="M 4 90 C 60 76, 120 68, 180 62 S 260 52, 296 50"
        fill="none"
        stroke="oklch(0.42 0.055 150)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="296" cy="50" r="3.5" fill="oklch(0.42 0.055 150)" />
      <text x="196" y="44" fontSize="10" fill="oklch(0.34 0.06 150)" fontWeight="600">
        Steadi
      </text>
      <text x="176" y="108" fontSize="10" fill="oklch(0.5 0.02 90)">
        Typical program
      </text>
      <text x="4" y="130" fontSize="9" fill="oklch(0.5 0.02 90)">
        Wk 1
      </text>
      <text x="140" y="130" fontSize="9" fill="oklch(0.5 0.02 90)">
        Wk 12
      </text>
      <text x="270" y="130" fontSize="9" fill="oklch(0.5 0.02 90)">
        Wk 24+
      </text>
    </svg>
  );
}

function getProgressConfig(persona: Persona): {
  sub: string;
  movement: number[];
  meals: boolean[];
  moods: (string | null)[];
  moodAvg: string;
} {
  if (persona === "priya") {
    return {
      sub: "Consistent rhythm this week, with a smart rest day mid-week.",
      movement: [3, 0, 2, 1, 2, 1, 0],
      meals: [true, true, false, true, true, true, false],
      moods: ["🙂", "😐", "🙂", "🙂", "😊", "😊", null],
      moodAvg: "avg 😊 4.2",
    };
  }
  if (persona === "rahul") {
    return {
      sub: "Heavy week. Below-the-bar plan in place. That&rsquo;s the point.",
      movement: [1, 0, 0, 0, 0, 0, 0],
      meals: [true, false, true, false, false, false, false],
      moods: ["😕", null, "😐", null, "😔", null, null],
      moodAvg: "avg 😕 2.3",
    };
  }
  return {
    sub: "Fresh start. Your week is a blank page. Log when it&rsquo;s useful.",
    movement: [0, 0, 0, 0, 0, 0, 0],
    meals: [false, false, false, false, false, false, false],
    moods: [null, null, null, null, null, null, null],
    moodAvg: "—",
  };
}
