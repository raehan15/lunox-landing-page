import { clamp } from "@/lib/motion";

const f = (v: number) => v.toFixed(4);

function noise(i: number, t: number, seed: number) {
  return (
    Math.sin(t * 0.9 + i * 1.7 + seed) * 0.5 +
    Math.sin(t * 0.53 + i * 2.9 + seed * 1.3) * 0.35 +
    Math.sin(t * 1.31 + i * 0.7 + seed * 2.1) * 0.15
  );
}

type Point = [number, number];

function closedCurve(pts: Point[]) {
  const n = pts.length;
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
  }
  return `${d}Z`;
}

function openCurve(pts: Point[]) {
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, n - 1)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

/** Organic closed shape in a 0..1 unit box (for objectBoundingBox clip paths). */
export function blobPath(
  t: number,
  { points = 7, amp = 0.08, seed = 0, r = 0.44 } = {}
) {
  const pts: Point[] = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (1 + amp * noise(i, t, seed));
    pts.push([0.5 + Math.cos(a) * rr, 0.5 + Math.sin(a) * rr]);
  }
  return closedCurve(pts);
}

export const EDGE_W = 1440;
export const EDGE_H = 200;

/**
 * Top boundary of an incoming surface. `bulge` 0..1 lifts a soft meniscus,
 * `phase` slides the lobes horizontally so the boundary never reads as a line.
 */
export function edgePath(bulge: number, phase: number, samples = 14) {
  const pts: Point[] = [];
  const center = 0.5 + 0.22 * Math.sin(phase);
  for (let i = 0; i <= samples; i++) {
    const x = i / samples;
    const lobe = Math.exp(-Math.pow((x - center) / 0.34, 2));
    const ripple = 0.28 * Math.sin(x * Math.PI * 2 + phase * 1.6) * Math.sin(x * Math.PI);
    const s = clamp(lobe + ripple, -0.2, 1.2);
    const y = clamp(EDGE_H - bulge * EDGE_H * 0.82 * s, 1, EDGE_H);
    pts.push([x * EDGE_W, y]);
  }
  return `M0,${EDGE_H} L${f(pts[0][0])},${f(pts[0][1])}${openCurve(pts)} L${EDGE_W},${EDGE_H} Z`;
}
