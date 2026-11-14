import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { SocialLinks } from "@/components/SocialIcons";
import type { Settings } from "@/lib/types";

export function TopBar({ settings: s }: { settings: Settings }) {
  return (
    <div className="relative hidden bg-ink text-[13px] text-white/75 md:block">
      <div className="container-x flex h-10 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-white">
            <MapPin className="h-3.5 w-3.5 text-pink" /> {s.address}, {s.city}
          </a>
          <a href={`mailto:${s.email}`} className="hidden items-center gap-2 transition hover:text-white lg:flex">
            <Mail className="h-3.5 w-3.5 text-pink" /> {s.email}
          </a>
          <a href={`tel:${s.phone}`} className="flex items-center gap-2 transition hover:text-white">
            <Phone className="h-3.5 w-3.5 text-pink" /> {s.phoneDisplay}
          </a>
        </div>
        <div className="flex items-center gap-5">
          {s.internshipOpen && s.announcement ? (
            <Link href="/internship" className="group hidden items-center gap-2 font-medium text-white xl:flex">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-dot absolute inline-flex h-full w-full rounded-full bg-success" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <GraduationCap className="h-4 w-4 text-pink" />
              <span className="group-hover:underline">{s.announcement}</span>
            </Link>
          ) : null}
          <SocialLinks
            links={{ linkedin: s.linkedin, instagram: s.instagram, youtube: s.youtube, facebook: s.facebook, twitter: s.twitter }}
            className="flex items-center gap-1"
            itemClassName="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/10 hover:text-white [&_svg]:h-3.5 [&_svg]:w-3.5"
          />
        </div>
      </div>
    </div>
  );
}
