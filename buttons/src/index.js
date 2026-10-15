import { renderButton, fromParams } from "./button-svg.js";

export default {
  fetch(req) {
    const u = new URL(req.url);
    if (u.pathname === "/btn.svg") {
      return new Response(renderButton(fromParams(u.searchParams)), {
        headers: {
          "content-type": "image/svg+xml; charset=utf-8",
          "cache-control": "public, max-age=86400",
          "access-control-allow-origin": "*",
          "x-content-type-options": "nosniff",
        },
      });
    }
    return new Response("Alive Readme buttons: /btn.svg?text=Docs&icon=book&bg=6c63ff&fill=gradient&anim=shine\n", {
      headers: { "content-type": "text/plain" },
    });
  },
};
