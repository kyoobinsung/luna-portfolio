import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-muted">
      {/* 어드민 상단 바 */}
      <header className="sticky top-0 z-40 border-b border-border-soft bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              ← 포트폴리오로
            </Link>
            <span className="text-border-soft">|</span>
            <span className="text-sm font-semibold text-foreground">
              관리자 페이지
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/admin/experiences"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-peach hover:text-foreground"
            >
              경력/학력
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
    </div>
  );
}
