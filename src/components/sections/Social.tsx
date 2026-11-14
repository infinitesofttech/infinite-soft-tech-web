import { Quote, Star } from "lucide-react";
import { LinkedinIcon } from "@/components/SocialIcons";
import { Reveal, SectionHeading } from "@/components/ui";
import type { Client, TeamMember, Testimonial } from "@/lib/types";
import { cn, initials } from "@/lib/utils";

function Avatar({ name, src, className }: { name: string; src?: string; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} loading="lazy" className={cn("rounded-full object-cover", className)} />;
  }
  return (
    <span className={cn("bg-brand-gradient flex items-center justify-center rounded-full font-display font-bold text-white", className)} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card flex h-full w-[340px] shrink-0 flex-col p-7 sm:w-[380px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-[#f5a524]" aria-label={`${t.rating || 5} out of 5 stars`}>
          {Array.from({ length: Math.max(1, Math.min(5, t.rating || 5)) }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <Quote className="h-8 w-8 text-brand-100" />
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-body">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <Avatar name={t.name} src={t.avatar} className="h-11 w-11 text-sm" />
        <span>
          <span className="block font-semibold text-ink">{t.name}</span>
          <span className="text-sm text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;
  const scrolling = testimonials.length >= 3;
  return (
    <section className="section-y overflow-hidden bg-soft" id="testimonials">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client Reviews"
          title={
            <>
              What Our <span className="text-gradient">Clients Say</span>
            </>
          }
        />
      </div>
      {scrolling ? (
        <div className="marquee-pause mask-fade-x mt-14 overflow-hidden">
          <div className="animate-marquee flex w-max gap-6 px-3" style={{ "--marquee-duration": `${testimonials.length * 9}s` } as React.CSSProperties}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={`${t.id}-${i}`} aria-hidden={i >= testimonials.length}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container-x mt-14 flex flex-wrap justify-center gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

export function ClientsStrip({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;
  const list = clients.length < 6 ? [...clients, ...clients, ...clients] : clients;
  return (
    <section className="py-12" aria-label="Our clients">
      <p className="container-x text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted">Trusted by growing businesses</p>
      <div className="marquee-pause mask-fade-x mt-8 overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-14 px-7">
          {[...list, ...list].map((c, i) => (
            <span key={`${c.id}-${i}`} className="flex h-14 items-center grayscale transition hover:grayscale-0" aria-hidden={i >= list.length}>
              {c.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.logo} alt={c.name} loading="lazy" className="max-h-12 w-auto max-w-[150px] object-contain opacity-70 transition hover:opacity-100" />
              ) : (
                <span className="font-display text-xl font-bold text-ink/50">{c.name}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamGrid({ team }: { team: TeamMember[] }) {
  if (!team.length) return null;
  return (
    <section className="section-y" id="team">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Team"
          title={
            <>
              The People Behind <span className="text-gradient">Infinite Soft Tech</span>
            </>
          }
          text="A passionate team of engineers, designers and problem-solvers."
        />
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.id} delay={(i % 4) * 90} className="h-full">
              <div className="card card-hover group h-full overflow-hidden p-6 text-center">
                <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
                  <span className="bg-brand-gradient absolute -inset-1.5 rounded-full opacity-0 transition duration-500 group-hover:opacity-100 group-hover:[animation:spin-slow_6s_linear_infinite]" />
                  <span className="absolute -inset-0.5 rounded-full bg-white" />
                  <Avatar name={m.name} src={m.photo} className="relative h-full w-full text-3xl" />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm text-muted">{m.role}</p>
                {m.group === "Management" ? (
                  <span className="mt-3 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand">
                    Leadership
                  </span>
                ) : null}
                {m.linkedin ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                    className="mx-auto mt-4 flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-transparent hover:bg-[#0a66c2] hover:text-white"
                  >
                    <LinkedinIcon width={15} height={15} />
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
