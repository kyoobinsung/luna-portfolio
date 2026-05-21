import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-surface-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold">🌙 {profile.name}의 포트폴리오</p>
          <p className="text-xs text-muted">© {new Date().getFullYear()} {profile.englishName}. Made with ☕ and ♥</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground shadow-sm transition hover:bg-peach"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground shadow-sm transition hover:bg-sky"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground shadow-sm transition hover:bg-mint"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
