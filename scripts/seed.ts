/**
 * 기존 정적 데이터를 experiences 테이블에 시드
 * 실행: npx tsx scripts/seed.ts
 */
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { experiences } from "../src/db/schema";

config({ path: ".env.local" });

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client);

async function main() {
  console.log("🌱 Seeding experiences...");

  await db.insert(experiences).values([
    {
      type: "work",
      title: "프론트엔드 개발자",
      org: "Cozy Studio",
      description: "디자인 시스템 구축과 사용자 대시보드 리뉴얼을 주도했습니다.",
      startedAt: "2024-01-01",
      endedAt: null,
      sortOrder: 10,
    },
    {
      type: "work",
      title: "주니어 프론트엔드 개발자",
      org: "Moonlight Lab",
      description: "React 기반 웹앱을 설계/개발하고, 접근성 개선 작업에 참여했습니다.",
      startedAt: "2022-01-01",
      endedAt: "2024-12-31",
      sortOrder: 20,
    },
    {
      type: "education",
      title: "프론트엔드 부트캠프 수료",
      org: "Pastel Academy",
      description: "6개월간 모던 웹 프론트엔드 풀스택 과정을 수료했습니다.",
      startedAt: "2021-01-01",
      endedAt: "2022-12-31",
      sortOrder: 30,
    },
    {
      type: "education",
      title: "컴퓨터공학 학사",
      org: "Sunshine University",
      description: "컴퓨터공학 전공, HCI 동아리 활동.",
      startedAt: "2017-01-01",
      endedAt: "2021-12-31",
      sortOrder: 40,
    },
  ]);

  console.log("✅ Seeding complete!");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
