import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Transaction pooler 모드에서는 prepare: false 필수
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
