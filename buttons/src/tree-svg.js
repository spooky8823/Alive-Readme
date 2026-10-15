import { esc, hex } from "./button-svg.js";
const TH = { dark: { bg: "0d1117", fg: "e6edf3", muted: "8b949e", folder: "79c0ff", line: "30363d" }, light: { bg: "ffffff", fg: "1f2328", muted: "656d76", folder: "0969da", line: "d0d7de" } };
const FS = 14, RH = 26, PAD = 16, STEP = 22, IC = 14, GAP = 8, CW = FS * 0.6, NW = 12 * 0.6;
const FONT = "ui-monospace,Consolas,'DejaVu Sans Mono',monospace";

// data: one node per line, 2 spaces of indent per level, end folders with "/", add " # note" for a comment.
export function renderTree(o = {}) {
  const th = TH[o.theme] || TH.dark, c = k => hex(o[k], th[k]);
  const bg = c("bg"), fg = c("fg"), mu = c("muted"), folder = c("folder"), line = c("line");
  const nodes = []; let prev = -1;
  for (const raw of String(o.data || "").split("\n").slice(0, 60)) {
    if (!raw.trim()) continue;
    const depth = Math.min(Math.floor((raw.length - raw.trimStart().length) / 2), prev + 1, 8);
    const [name, ...rest] = raw.trim().split(/\s+#\s*/);
    nodes.push({ depth, name: name.slice(0, 50), note: rest.join(" # ").slice(0, 60) }); prev = depth;
  }
  if (!nodes.length) nodes.push({ depth: 0, name: "project/", note: "" });
  const stack = [];
  nodes.forEach((nd, i) => {
    nd.dir = nd.name.endsWith("/") || (nodes[i + 1] && nodes[i + 1].depth > nd.depth); nd.name = nd.name.replace(/\/$/, "");
    let j = i + 1; while (j < nodes.length && nodes[j].depth > nd.depth) j++;
    nd.last = !(j < nodes.length && nodes[j].depth === nd.depth);
    stack[nd.depth] = nd.last; nd.chain = stack.slice(0, nd.depth + 1);
  });
  const nameEnd = Math.max(...nodes.map(n => PAD + n.depth * STEP + IC + GAP + n.name.length * CW));
  const nx = nameEnd + 24, noteEnd = Math.max(0, ...nodes.filter(n => n.note).map(n => nx + n.note.length * NW));
  const W = Math.ceil(Math.max(nameEnd, noteEnd) + PAD), H = PAD * 2 + nodes.length * RH;
  let d = "", t = "";
  nodes.forEach((n, i) => {
    const top = PAD + i * RH, y = top + RH / 2, ix = PAD + n.depth * STEP;
    if (n.depth) {
      const e = PAD + (n.depth - 1) * STEP + IC / 2;
      d += `M${e} ${top}V${y}H${ix - 3}` + (n.last ? "" : `M${e} ${y}V${top + RH}`);
      for (let k = 0; k < n.depth - 1; k++) if (!n.chain[k + 1]) d += `M${PAD + k * STEP + IC / 2} ${top}V${top + RH}`;
    }
    t += n.dir
      ? `<path transform="translate(${ix} ${y - 7})" d="M1 3.5A1.5 1.5 0 0 1 2.5 2H5l1.5 1.5h5A1.5 1.5 0 0 1 13 5v5.5A1.5 1.5 0 0 1 11.5 12h-9A1.5 1.5 0 0 1 1 10.5z" fill="${folder}"/>`
      : `<path transform="translate(${ix} ${y - 7})" d="M3 1h5l3 3v9H3z" fill="none" stroke="${mu}" stroke-width="1.2" stroke-linejoin="round"/>`;
    t += `<text x="${ix + IC + GAP}" y="${y}" dy=".35em" fill="${n.dir ? folder : fg}" font-family="${FONT}" font-size="${FS}">${esc(n.name)}</text>`;
    if (n.note) t += `<text x="${nx}" y="${y}" dy=".35em" fill="${mu}" font-family="${FONT}" font-size="12">${esc(n.note)}</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="File tree"><rect width="${W}" height="${H}" rx="10" fill="${bg}"/><rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="10" fill="none" stroke="${line}"/><path d="${d}" fill="none" stroke="${line}" stroke-width="1.5"/>${t}</svg>`;
}
