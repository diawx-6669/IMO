-- Таблица учеников для бэкенда рейтинга на Cloudflare D1.
-- nfull и nmod названы так, потому что FULL и MOD — зарезервированные слова SQL.
CREATE TABLE IF NOT EXISTS students (
  pid     TEXT PRIMARY KEY,          -- публичный id = хеш токена ученика
  nick    TEXT    NOT NULL,
  joined  TEXT    NOT NULL,          -- ISO-время регистрации
  seen    TEXT    NOT NULL,          -- ISO-время последней активности
  pts     INTEGER NOT NULL DEFAULT 0,
  rated   INTEGER NOT NULL DEFAULT 0,
  solved  INTEGER NOT NULL DEFAULT 0,
  nfull   INTEGER NOT NULL DEFAULT 0,
  streak  INTEGER NOT NULL DEFAULT 0,
  best    INTEGER NOT NULL DEFAULT 0,
  nmod    INTEGER NOT NULL DEFAULT 0,
  diag    INTEGER
);
CREATE INDEX IF NOT EXISTS students_pts ON students (pts DESC);
