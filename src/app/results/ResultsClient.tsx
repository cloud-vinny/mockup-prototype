"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MockPageShell } from "@/components/MockPageShell";
import styles from "./page.module.css";

type Origin = "native" | "invasive" | "unknown";

type WaterBand = "high" | "moderate" | "low";

type ResultRow = {
  id: string;
  species: string;
  time: string;
  confidence: string;
  origin: Origin;
  waterBand: WaterBand;
  lengthCm: number;
  weightG: number;
};

const MOCK_ROWS: ResultRow[] = [
  {
    id: "1",
    species: "Clownfish",
    time: "0:12",
    confidence: "94%",
    origin: "native",
    waterBand: "high",
    lengthCm: 8,
    weightG: 45,
  },
  {
    id: "2",
    species: "Lionfish",
    time: "0:28",
    confidence: "89%",
    origin: "invasive",
    waterBand: "high",
    lengthCm: 28,
    weightG: 520,
  },
  {
    id: "3",
    species: "Blue tang",
    time: "0:45",
    confidence: "88%",
    origin: "native",
    waterBand: "moderate",
    lengthCm: 15,
    weightG: 180,
  },
  {
    id: "4",
    species: "Hawksbill turtle",
    time: "1:03",
    confidence: "91%",
    origin: "native",
    waterBand: "moderate",
    lengthCm: 62,
    weightG: 42000,
  },
  {
    id: "5",
    species: "Crown-of-thorns starfish",
    time: "1:14",
    confidence: "76%",
    origin: "native",
    waterBand: "low",
    lengthCm: 22,
    weightG: 1100,
  },
  {
    id: "6",
    species: "Unknown — reef fish",
    time: "1:22",
    confidence: "62%",
    origin: "unknown",
    waterBand: "low",
    lengthCm: 11,
    weightG: 95,
  },
];

/** Mock clip-level estimate (static mockup — not computed). */
const CLIP_WATER = {
  index: 72,
  label: "Moderate",
  summary:
    "Based on colour cast, turbidity cues, and light falloff in this clip (demo values only).",
} as const;

type OriginFilter = "all" | Origin;
type WaterFilter = "all" | WaterBand;
type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const SUGGESTION_PROMPTS = [
  "How many detections are there?",
  "How many invasive species?",
  "What is the confidence range?",
  "What is the top species?",
  "Water clarity breakdown?",
] as const;

function formatWeight(g: number): string {
  if (g >= 1000) {
    return `${(g / 1000).toFixed(1)} kg est.`;
  }
  return `${g} g est.`;
}

export function ResultsClient() {
  const [originFilter, setOriginFilter] = useState<OriginFilter>("all");
  const [waterFilter, setWaterFilter] = useState<WaterFilter>("all");
  const [chatOpen, setChatOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hello! I’m the dedicated FishAI chatbot! Ask me anything about the results you’ve just received, and I’ll give you my best answer!",
    },
  ]);

  const filtered = useMemo(() => {
    return MOCK_ROWS.filter((row) => {
      if (originFilter !== "all" && row.origin !== originFilter) {
        return false;
      }
      if (waterFilter !== "all" && row.waterBand !== waterFilter) {
        return false;
      }
      return true;
    });
  }, [originFilter, waterFilter]);

  const buildReply = (message: string): string => {
    const query = message.toLowerCase();
    const invasiveCount = filtered.filter((row) => row.origin === "invasive").length;
    const nativeCount = filtered.filter((row) => row.origin === "native").length;
    const unknownCount = filtered.filter((row) => row.origin === "unknown").length;
    const confidenceValues = filtered.map((row) =>
      Number.parseInt(row.confidence.replace("%", ""), 10),
    );
    const minConfidence =
      confidenceValues.length > 0 ? Math.min(...confidenceValues) : 0;
    const maxConfidence =
      confidenceValues.length > 0 ? Math.max(...confidenceValues) : 0;

    const speciesCounts = filtered.reduce<Record<string, number>>((acc, row) => {
      acc[row.species] = (acc[row.species] ?? 0) + 1;
      return acc;
    }, {});
    const topSpeciesEntry = Object.entries(speciesCounts).sort(
      (a, b) => b[1] - a[1],
    )[0];

    if ((query.includes("lifespan") && query.includes("22")) || query.includes("lethrinus")) {
      return "Lethrinus punctulatus has an average lifespan of up to approximately 16 years. They reach maturity at around 1.6 years of age, relatively early for this type of fish.";
    }
    if (
      query.includes("how many") ||
      query.includes("count") ||
      query.includes("total")
    ) {
      return `There are ${filtered.length} detections in the current view (${nativeCount} native, ${invasiveCount} invasive, ${unknownCount} unknown).`;
    }
    if (query.includes("invasive")) {
      return `There ${invasiveCount === 1 ? "is" : "are"} ${invasiveCount} invasive detection${invasiveCount === 1 ? "" : "s"} in the current filtered results.`;
    }
    if (query.includes("native")) {
      return `There ${nativeCount === 1 ? "is" : "are"} ${nativeCount} native detection${nativeCount === 1 ? "" : "s"} in the current filtered results.`;
    }
    if (query.includes("confidence")) {
      if (filtered.length === 0) {
        return "No confidence range is available because there are no rows in the current filtered view.";
      }
      return `The current confidence range is ${minConfidence}% to ${maxConfidence}% across the filtered detections.`;
    }
    if (query.includes("top species") || query.includes("most common")) {
      if (!topSpeciesEntry) {
        return "There is no top species right now because no rows match the current filters.";
      }
      return `The most common species in the current view is ${topSpeciesEntry[0]} (${topSpeciesEntry[1]} detection${topSpeciesEntry[1] === 1 ? "" : "s"}).`;
    }
    if (query.includes("water") || query.includes("clarity")) {
      const high = filtered.filter((row) => row.waterBand === "high").length;
      const moderate = filtered.filter((row) => row.waterBand === "moderate").length;
      const low = filtered.filter((row) => row.waterBand === "low").length;
      return `Current clarity split is ${high} high, ${moderate} moderate, and ${low} low detections.`;
    }
    return "Try asking: 'How many detections?', 'How many invasive?', 'Top species?', 'Confidence range?', or 'Water clarity breakdown?'.";
  };

  const onSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: buildReply(trimmed),
    };

    setChatMessages((prev) => [...prev, userMessage, assistantMessage]);
    setChatInput("");
    setShowSuggestions(false);
  };

  const sendPrompt = (prompt: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role: "user",
      text: prompt,
    };
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role: "assistant",
      text: buildReply(prompt),
    };
    setChatMessages((prev) => [...prev, userMessage, assistantMessage]);
    setShowSuggestions(false);
  };

  return (
    <MockPageShell
      wide
      title="Results"
      lead="Sample detections for demo purposes. Filters and measurements are illustrative only."
    >
      {/* ── Analysis status bar ── */}
      <div className={styles.analysisHeader}>
        <div className={styles.analysisLeft}>
          <p className={styles.analysisComplete}>Analysis complete.</p>
          <div className={styles.modelRow}>
            <span className={styles.modelLabel}>Model</span>
            <button type="button" className={styles.modelSelector} disabled>
              YOLOv26 <span aria-hidden>∨</span>
            </button>
          </div>
          <div className={styles.uploadRow}>
            <span>Upload &amp; analyse another file</span>
            <label className={styles.uploadBtn}>
              Upload
              <input type="file" hidden disabled />
            </label>
          </div>
          <p className={styles.uploadHint}>Supported file types: .mp4, .avi, etc.</p>
        </div>
      </div>

      {/* ── Video + stats ── */}
      <div className={styles.videoSection}>
        <div className={styles.videoStats}>
          {(
            [
              ["Water pH level", "7.42"],
              ["Water turbidity", "50 NTU"],
              ["Water temperature", "17°C"],
              ["Frames analysed", "4,362"],
              ["Video length", "9:22"],
              ["Species tagged", String(MOCK_ROWS.length)],
            ] as [string, string][]
          ).map(([label, value]) => (
            <div key={label} className={styles.videoStatRow}>
              <span className={styles.videoStatLabel}>{label}</span>
              <span className={styles.videoStatValue}>{value}</span>
            </div>
          ))}
        </div>

        <div className={styles.videoPlayerWrap}>
          <div className={styles.sensorBar}>
            <span>Sensor Reading: <strong>Clean</strong></span>
            <span>Water Clarity: <strong>Clear</strong></span>
          </div>
          <div className={styles.videoFrame}>
            <div className={`${styles.bbox} ${styles.bbox1}`}>
              <span className={styles.bboxLabel}>id:22 Lethrinus punctulatus 0.88</span>
            </div>
            <div className={`${styles.bbox} ${styles.bbox2}`}>
              <span className={styles.bboxLabel}>id:31 Lethrinus punctulatus 0.64</span>
            </div>
            <div className={`${styles.bbox} ${styles.bbox3}`}>
              <span className={styles.bboxLabel}>id:24 Lethrinus punctulatus</span>
            </div>
            <div className={`${styles.bbox} ${styles.bbox4}`}>
              <span className={styles.bboxLabel}>id:16 Lethrinus punc.</span>
            </div>
            <div className={styles.videoProgress}>
              <button type="button" className={styles.playBtn} disabled aria-label="Play">
                ▶
              </button>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>
              <span className={styles.videoTime}>00:00 / 9:22</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Frames reviewed</p>
          <p className={styles.statValue}>1,240</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Species tagged</p>
          <p className={styles.statValue}>{MOCK_ROWS.length}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Clip length</p>
          <p className={styles.statValue}>2:18</p>
        </div>
      </div>

      <div className={styles.waterCard}>
        <p className={styles.waterCardTitle}>Estimated water quality (clip)</p>
        <p className={styles.waterCardScore}>
          <span className={styles.waterIndex}>{CLIP_WATER.index}/100</span>
          <span className={styles.waterLabel}> — {CLIP_WATER.label}</span>
        </p>
        <p className={styles.waterCardNote}>{CLIP_WATER.summary}</p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="origin-filter">
            Species origin
          </label>
          <select
            id="origin-filter"
            className={styles.select}
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value as OriginFilter)}
          >
            <option value="all">All</option>
            <option value="native">Native</option>
            <option value="invasive">Invasive</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="water-filter">
            Clarity band (per detection)
          </label>
          <select
            id="water-filter"
            className={styles.select}
            value={waterFilter}
            onChange={(e) => setWaterFilter(e.target.value as WaterFilter)}
          >
            <option value="all">All</option>
            <option value="high">High clarity</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <p className={styles.filterHint}>
        Showing {filtered.length} of {MOCK_ROWS.length} rows
      </p>

      <h2 className={styles.listTitle}>Detections</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Species</th>
              <th scope="col">Origin</th>
              <th scope="col">Time</th>
              <th scope="col">Est. length</th>
              <th scope="col">Est. weight</th>
              <th scope="col">Clarity</th>
              <th scope="col">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td className={styles.cellSpecies}>{row.species}</td>
                <td>
                  <span
                    className={`${styles.badge} ${styles[`badge_${row.origin}`]}`}
                  >
                    {row.origin}
                  </span>
                </td>
                <td className={styles.cellMuted}>{row.time}</td>
                <td>{row.lengthCm} cm est.</td>
                <td>{formatWeight(row.weightG)}</td>
                <td className={styles.cellMuted}>{row.waterBand}</td>
                <td className={styles.cellConfidence}>{row.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No rows match these filters.</p>
      ) : null}

      {/* ── Charts ── */}
      <div className={styles.chartsSection}>
        <h2 className={styles.chartsSectionTitle}>Analysis charts (MOCK, MORE WILL BE ADDED)</h2>
        <div className={styles.chartsGrid}>

          {/* Donut — species origin */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Species origin</h3>
            <div className={styles.donutWrap}>
              <svg viewBox="0 0 100 100" className={styles.donutSvg} aria-hidden>
                {/* track */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" />
                {/* native 4/6 = 159.17 of 238.76 */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#4ade80" strokeWidth="18"
                  strokeDasharray="159.17 79.59" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                {/* invasive 1/6 = 39.79 */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#f87171" strokeWidth="18"
                  strokeDasharray="39.79 198.97" strokeDashoffset="159.17" transform="rotate(-90 50 50)" />
                {/* unknown 1/6 = 39.79 */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="18"
                  strokeDasharray="39.79 198.97" strokeDashoffset="198.96" transform="rotate(-90 50 50)" />
                <text x="50" y="47" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">6</text>
                <text x="50" y="59" textAnchor="middle" fill="#e8f2ff" fontSize="7">species</text>
              </svg>
              <ul className={styles.legend}>
                <li><span className={styles.legendDot} style={{ background: "#4ade80" }} />Native (4)</li>
                <li><span className={styles.legendDot} style={{ background: "#f87171" }} />Invasive (1)</li>
                <li><span className={styles.legendDot} style={{ background: "rgba(255,255,255,0.4)" }} />Unknown (1)</li>
              </ul>
            </div>
          </div>

          {/* Histogram — fish lengths */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Fish lengths (cm)</h3>
            <svg viewBox="0 0 160 110" className={styles.barSvg} aria-hidden>
              <line x1="18" y1="88" x2="155" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              {/* bins: 0-10→1, 10-20→2, 20-30→2, 30+→1  max=2 → height 60 */}
              <rect x="22" y="58" width="28" height="30" fill="#60a5fa" rx="2" />
              <rect x="58" y="28" width="28" height="60" fill="#60a5fa" rx="2" />
              <rect x="94" y="28" width="28" height="60" fill="#60a5fa" rx="2" />
              <rect x="130" y="58" width="28" height="30" fill="#60a5fa" rx="2" />
              <text x="8" y="91" fill="#e8f2ff" fontSize="6" textAnchor="middle">0</text>
              <text x="36" y="98" fill="#e8f2ff" fontSize="6" textAnchor="middle">0–10</text>
              <text x="72" y="98" fill="#e8f2ff" fontSize="6" textAnchor="middle">10–20</text>
              <text x="108" y="98" fill="#e8f2ff" fontSize="6" textAnchor="middle">20–30</text>
              <text x="144" y="98" fill="#e8f2ff" fontSize="6" textAnchor="middle">30+</text>
              <text x="36" y="54" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">1</text>
              <text x="72" y="24" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">2</text>
              <text x="108" y="24" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">2</text>
              <text x="144" y="54" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">1</text>
            </svg>
          </div>

          {/* Horizontal bars — confidence by species */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Confidence by species</h3>
            <svg viewBox="0 0 190 130" className={styles.barSvg} aria-hidden>
              {(
                [
                  ["Clownfish", 94, "#b8e986"],
                  ["Hawksbill", 91, "#b8e986"],
                  ["Lionfish", 89, "#f87171"],
                  ["Blue tang", 88, "#b8e986"],
                  ["C-o-t star.", 76, "#b8e986"],
                  ["Unknown", 62, "rgba(255,255,255,0.4)"],
                ] as [string, number, string][]
              ).map(([name, pct, colour], i) => (
                <g key={name} transform={`translate(0,${i * 20})`}>
                  <text x="0" y="12" fill="#e8f2ff" fontSize="7">{name}</text>
                  <rect x="62" y="2" width={pct * 1.1} height="10" fill={colour} rx="2" />
                  <text x={62 + pct * 1.1 + 3} y="11" fill="white" fontSize="7">{pct}%</text>
                </g>
              ))}
            </svg>
          </div>

        </div>
      </div>

      <p className={styles.footer}>
        <Link href="/analyze" className={styles.back}>
          ← Back to Analyse
        </Link>
      </p>

      <div className={styles.chatDock}>
        {chatOpen ? (
          <section className={styles.chatbotWrap} aria-label="Results chatbot">
            <div className={styles.chatHeader}>
              <p className={styles.chatTitle}>FishAI Chat</p>
              <button
                type="button"
                className={styles.chatClose}
                onClick={() => setChatOpen(false)}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
            <div className={styles.chatbotInner}>
              {showSuggestions ? (
                <div className={styles.suggestionList}>
                  {SUGGESTION_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className={styles.suggestionChip}
                      onClick={() => sendPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className={styles.messageList}>
                {chatMessages.map((message) => (
                  <p
                    key={message.id}
                    className={`${styles.messageBubble} ${message.role === "user"
                      ? styles.messageBubble_user
                      : styles.messageBubble_assistant
                      }`}
                  >
                    {message.text}
                  </p>
                ))}
              </div>

              <form className={styles.inputRow} onSubmit={onSendMessage}>
                <input
                  className={styles.chatInput}
                  type="text"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Type your message here..."
                  aria-label="Type your message"
                />
              </form>
            </div>
          </section>
        ) : (
          <>
            <button
              type="button"
              className={styles.chatPromptFab}
              onClick={() => setChatOpen(true)}
            >
              Ask our chatbot any queries about your results!
            </button>
            <button
              type="button"
              className={styles.chatFab}
              onClick={() => setChatOpen(true)}
              aria-label="Open chatbot"
            >
              AI
            </button>
          </>
        )}
      </div>
    </MockPageShell>
  );
}
