import { config } from "dotenv";
import postgres from "postgres";

config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

async function main() {
  console.log("Creating experiences table...");

  await sql`
    CREATE TABLE IF NOT EXISTS "experiences" (
      "id"          serial PRIMARY KEY,
      "type"        text    NOT NULL,
      "title"       text    NOT NULL,
      "org"         text    NOT NULL,
      "description" text,
      "started_at"  date    NOT NULL,
      "ended_at"    date,
      "sort_order"  integer NOT NULL DEFAULT 0,
      "created_at"  timestamptz NOT NULL DEFAULT now(),
      "updated_at"  timestamptz NOT NULL DEFAULT now()
    )
  `;

  console.log("✅ experiences table created (or already exists)");
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
