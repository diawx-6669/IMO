/* Отдельный Worker — нужен, только если сайт лежит не на Cloudflare Pages
   (например, на GitHub Pages), и рейтингу требуется собственный адрес.
   Если сайт на Pages, этот файл не нужен: там работает functions/api/[[path]].js. */
import { handle } from "../../functions/_rating.js";

export default {
  fetch: (request, env) => handle(request, env)
};
