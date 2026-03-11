CREATE TABLE IF NOT EXISTS projects (
  id          TEXT PRIMARY KEY,
  source      TEXT NOT NULL,
  layer_id    INTEGER,
  raw_id      TEXT,
  data        JSONB NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_source     ON projects(source);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at);
CREATE INDEX IF NOT EXISTS idx_projects_layer      ON projects(layer_id);

CREATE TABLE IF NOT EXISTS crawl_log (
  id          SERIAL PRIMARY KEY,
  started_at  TIMESTAMPTZ DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  total       INTEGER,
  added       INTEGER,
  updated     INTEGER,
  errors      INTEGER,
  sources     JSONB
);
