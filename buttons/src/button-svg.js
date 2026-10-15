// Single source of truth: used by the Worker (server) AND the generator page (preview).
export const ICONS = {
  download: ["0 0 24 24", "M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.4l3.3 3.3V4a1 1 0 0 1 1-1ZM4 18a1 1 0 0 1 1 1v1h14v-1a1 1 0 1 1 2 0v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a1 1 0 0 1 1-1Z"],
  windows: ["0 0 24 24", "M3 3h8.5v8.5H3V3Zm9.5 0H21v8.5h-8.5V3ZM3 12.5h8.5V21H3v-8.5Zm9.5 0H21V21h-8.5v-8.5Z"],
  terminal: ["0 0 24 24", "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2.7 4.3a1 1 0 0 0 0 1.4L9 12l-2.3 2.3a1 1 0 1 0 1.4 1.4l3-3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0ZM13 15a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"],
  github: ["0 0 16 16", "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"],
  external: ["0 0 24 24", "M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"],
  star: ["0 0 24 24", "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"],
};
const DEFAULTS = { text: "Button", bg: "6c63ff", fg: "ffffff", icon: "", style: "flat", size: "md", border: "" };
const HEIGHT = { sm: 24, md: 32, lg: 40 };
const hex = (v, d) => { v = String(v || "").replace(/^#/, ""); return /^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v) ? "#" + v.toLowerCase() : d ? "#" + d : ""; };
const esc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const textWidth = (s, fs) => { let w = 0; for (const ch of s) w += /[il.,:;'|!]/.test(ch) ? .28 : ch === " " ? .35 : /[mwMW@]/.test(ch) ? .9 : /[A-Z]/.test(ch) ? .68 : /[0-9]/.test(ch) ? .64 : .58; return Math.ceil(w * fs * 1.12); };

export function renderButton(o = {}) {
  const t = { ...DEFAULTS, ...o };
  const text = String(t.text || DEFAULTS.text).slice(0, 40);
  const h = HEIGHT[t.size] || HEIGHT.md;
  const bg = hex(t.bg, "6c63ff"), fg = hex(t.fg, "ffffff"), border = hex(t.border, "");
  const r = t.style === "pill" ? h / 2 : t.style === "rounded" ? 8 : 4;
  const fs = Math.round(h * .42), px = Math.round(h * .5), is = Math.round(h * .5), gap = Math.round(h * .3);
  const ic = ICONS[t.icon], tw = textWidth(text, fs);
  const w = px * 2 + (ic ? is + gap : 0) + tw;
  let x = px, body = "";
  if (ic) { body += `<svg x="${x}" y="${(h - is) / 2}" width="${is}" height="${is}" viewBox="${ic[0]}"><path fill="${fg}" fill-rule="evenodd" d="${ic[1]}"/></svg>`; x += is + gap; }
  body += `<text x="${x}" y="${h / 2}" dy=".35em" fill="${fg}" font-family="Verdana,'DejaVu Sans',Arial,sans-serif" font-size="${fs}" font-weight="700" textLength="${tw}" lengthAdjust="spacingAndGlyphs">${esc(text)}</text>`;
  const stroke = border ? `<rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="${Math.max(r - .75, 0)}" fill="none" stroke="${border}" stroke-width="1.5"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(text)}"><title>${esc(text)}</title><rect width="${w}" height="${h}" rx="${r}" fill="${bg}"/>${stroke}${body}</svg>`;
}
export function toQuery(o) {
  const p = new URLSearchParams();
  for (const k of Object.keys(DEFAULTS)) { const v = String(o[k] || "").replace(/^#/, ""); if (v && v !== DEFAULTS[k]) p.set(k, v); }
  return p.toString();
}
export function fromParams(sp) {
  const o = {}; for (const k of Object.keys(DEFAULTS)) if (sp.get(k)) o[k] = sp.get(k); return o;
}
