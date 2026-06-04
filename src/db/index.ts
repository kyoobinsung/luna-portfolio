import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DbInstance = PostgresJsDatabase<typeof schema>;

// 모듈 로드 시점이 아닌 첫 사용 시점에 연결 (Vercel 빌드 안정성)
let _db: DbInstance | undefined;

function getDb(): DbInstance {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "[db] DATABASE_URL 환경변수가 설정되지 않았습니다.\n" +
        "Vercel Dashboard → Project Settings → Environment Variables 에서 추가하세요."
    );
  }

  // Transaction pooler 모드에서는 prepare: false 필수
  const client = postgres(connectionString, { prepare: false });
  _db = drizzle(client, { schema });
  return _db;
}

// Proxy를 사용해 db.select() 등 호출 시점에 연결 초기화
export const db = new Proxy({} as DbInstance, {
  get(_, prop: string | symbol) {
    return getDb()[prop as keyof DbInstance];
  },
});
