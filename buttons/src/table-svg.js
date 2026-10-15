import { esc, hex, textWidth } from "./button-svg.js";
const TH = { dark: { bg: "0d1117", fg: "e6edf3", stripe: "161b22", line: "30363d" }, light: { bg: "ffffff", fg: "1f2328", stripe: "f6f8fa", line: "d0d7de" } };
const FS = 14, PX = 14, HH = 38, RH = 34, FONT = "Verdana,'DejaVu Sans',Arial,sans-serif";

// data: one row per line, cells split by |, first row is the header.
export function renderTable(o = {}) {
  const th = TH[o.theme] || TH.dark, c = k => hex(o[k], th[k]);
  const head = hex(o.head, "6c63ff"), hfg = hex(o.hfg, "ffffff"), bg = c("bg"), fg = c("fg"), stripe = c("stripe"), line = c("line");
  let rows = String(o.data || "").split("\n").slice(0, 30).map(r => r.split("|").slice(0, 8).map(s => s.trim().slice(0, 60))).filter(r => r.some(Boolean));
  if (!rows.length) rows = [["Name", "Role"], ["Ada", "Engineer"]];
  const n = Math.max(...rows.map(r => r.length));
  const w = Array.from({ length: n }, (_, i) => Math.max(...rows.map((r, j) => textWidth(r[i] || "", FS) * (j ? 1 : 1.1))) + PX * 2);
  const x = [0]; w.forEach((v, i) => x.push(x[i] + v));
  const W = x[n], H = HH + (rows.length - 1) * RH;
  let g = `<rect width="${W}" height="${H}" fill="${bg}"/><rect width="${W}" height="${HH}" fill="${head}"/>`, t = "";
  rows.forEach((r, j) => {
    const y = j ? HH + (j - 1) * RH : 0, h = j ? RH : HH;
    if (j && o.zebra !== "off" && j % 2 === 0) g += `<rect y="${y}" width="${W}" height="${h}" fill="${stripe}"/>`;
    if (j > 1) g += `<path d="M0 ${y}H${W}" stroke="${line}"/>`;
    r.forEach((s, i) => { if (s) t += `<text x="${x[i] + PX}" y="${y + h / 2}" dy=".35em" fill="${j ? fg : hfg}" font-family="${FONT}" font-size="${FS}" font-weight="${j ? 400 : 700}" textLength="${Math.ceil(textWidth(s, FS) * (j ? 1 : 1.1))}" lengthAdjust="spacingAndGlyphs">${esc(s)}</text>`; });
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Table"><defs><clipPath id="c"><rect width="${W}" height="${H}" rx="10"/></clipPath></defs><g clip-path="url(#c)">${g}</g><rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="10" fill="none" stroke="${line}"/>${t}</svg>`;
}
