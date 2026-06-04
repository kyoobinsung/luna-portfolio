import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// drizzle-kit은 .env.local을 자동으로 읽지 않으므로 직접 로드
config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
