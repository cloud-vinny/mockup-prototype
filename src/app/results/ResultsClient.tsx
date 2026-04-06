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

function formatWeight(g: number): string {
  if (g >= 1000) {
    return `${(g / 1000).toFixed(1)} kg est.`;
  }
  return `${g} g est.`;
}

export function ResultsClient() {
  const [originFilter, setOriginFilter] = useState<OriginFilter>("all");
  const [waterFilter, setWaterFilter] = useState<WaterFilter>("all");

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

  return (
    <MockPageShell
      title="Results"
      lead="Sample detections for demo purposes. Filters and measurements are illustrative only."
    >
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

      <p className={styles.footer}>
        <Link href="/analyze" className={styles.back}>
          ← Back to Analyze
        </Link>
      </p>
    </MockPageShell>
  );
}
