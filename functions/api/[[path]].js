/* Вход для Cloudflare Pages: все запросы к /api/* обрабатывает общий модуль.
   Привязка к базе (D1) называется DB и настраивается в панели Cloudflare. */
import { handle } from "../_rating.js";

export const onRequest = (context) => handle(context.request, context.env);
