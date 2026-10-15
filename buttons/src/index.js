import { renderButton, fromParams } from "./button-svg.js";
export default {
  fetch(req) {
    const u = new URL(req.url);
    if (u.pathname === "/btn.svg") {
      return new Response(renderButton(fromParams(u.searchParams)), {
        headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "public, max-age=86400", "access-control-allow-origin": "*" },
      });
    }
    return new Response("Vibifiy buttons: /btn.svg?text=Download&icon=download&bg=6c63ff\n", { headers: { "content-type": "text/plain" } });
  },
};
