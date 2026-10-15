import { renderButton, fromParams } from "./button-svg.js";
import { renderTable } from "./table-svg.js";
import { renderTree } from "./tree-svg.js";

const ROUTES = { "/btn.svg": renderButton, "/table.svg": renderTable, "/tree.svg": renderTree };

export default {
  fetch(req) {
    const u = new URL(req.url), render = ROUTES[u.pathname];
    if (render) {
      if (u.search.length > 8000) return new Response("URL too long", { status: 414 });
      const params = render === renderButton ? fromParams(u.searchParams) : Object.fromEntries(u.searchParams);
      return new Response(render(params), {
        headers: {
          "content-type": "image/svg+xml; charset=utf-8",
          "cache-control": "public, max-age=86400",
          "access-control-allow-origin": "*",
          "x-content-type-options": "nosniff",
        },
      });
    }
    return new Response("Alive Readme: /btn.svg  /table.svg  /tree.svg\n", { headers: { "content-type": "text/plain" } });
  },
};
