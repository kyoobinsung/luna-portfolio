import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

type Channel = {
  icon: (props: { size?: number }) => React.ReactElement;
  label: string;
  value: string;
  href: string;
  bg: string;
};

export function Contact() {
  const channels: Channel[] = [
    {
      icon: ({ size }) => <Mail size={size} />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      bg: "bg-peach",
    },
    {
      icon: ({ size }) => <GithubIcon size={size} />,
      label: "GitHub",
      value: "@luna",
      href: profile.social.github,
      bg: "bg-mint",
    },
    {
      icon: ({ size }) => <LinkedinIcon size={size} />,
      label: "LinkedIn",
      value: "in/luna",
      href: profile.social.linkedin,
      bg: "bg-sky",
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <SectionHeader
        eyebrow="Contact"
        title="이야기 나눠요"
        description="협업 제안, 커피챗, 그냥 인사 모두 환영합니다 ☕"
        align="center"
      />
      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
        {channels.map(({ icon: Icon, label, value, href, bg }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex flex-col gap-3 rounded-3xl bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${bg}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                {value}
                <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
