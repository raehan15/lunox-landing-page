import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  projects,
} from "@/data/projects";
import { ProductVisual } from "@/components/work/ProductVisual";
import { PillButton } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Work — Lunox" };
  return {
    title: `${project.title} — Lunox`,
    description: project.tagline,
  };
}

export default function WorkDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <main className="min-h-screen bg-paper text-ink">
        <article className="container-site pb-24 pt-28 md:pb-32 md:pt-32">
          <Link
            href="/#work"
            className="group mb-10 inline-flex items-center gap-2 text-[14px] text-ink-muted hover:text-ink"
          >
            <svg className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
            All work
          </Link>

          <p className="label-mono mb-4 text-accent">{project.category}</p>
          <h1 className="heading mb-3 max-w-4xl text-[40px] leading-[1.05] text-ink sm:text-[52px] md:text-[60px]">
            {project.title}
          </h1>
          <p className="mb-10 max-w-2xl text-[18px] text-ink-muted md:text-[20px]">
            {project.tagline}
          </p>

          <div className="mb-16 aspect-[4/3] max-w-5xl overflow-hidden rounded-[22px] border border-ink/10 shadow-[0_40px_90px_-40px_rgba(17,19,24,0.5)] sm:aspect-[16/10] md:rounded-[28px]">
            <ProductVisual project={project} variant="detail" />
          </div>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-8">
              <section>
                <h2 className="heading mb-4 text-[24px] md:text-[28px]">Overview</h2>
                <p className="text-[16px] text-ink-muted md:text-[17px]">
                  {project.overview || project.description}
                </p>
              </section>

              <section>
                <h2 className="heading mb-4 text-[24px] md:text-[28px]">What we built</h2>
                <p className="text-[16px] text-ink-muted md:text-[17px]">
                  {project.description}
                </p>
              </section>

              <section>
                <h2 className="heading mb-4 text-[24px] md:text-[28px]">Key features</h2>
                <ul className="space-y-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[16px] text-ink">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              {project.architecture && (
                <section>
                  <h2 className="heading mb-4 text-[24px] md:text-[28px]">
                    Architecture
                  </h2>
                  <p className="text-[16px] text-ink-muted md:text-[17px]">
                    {project.architecture}
                  </p>
                </section>
              )}

              {project.results.length > 0 && (
                <section>
                  <h2 className="heading mb-4 text-[24px] md:text-[28px]">Results</h2>
                  <ul className="space-y-3">
                    {project.results.map((r) => (
                      <li key={r} className="text-[16px] text-ink">
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8 rounded-card border border-light-border bg-white p-6">
                <div>
                  <p className="label-mono mb-3 text-ink-muted">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-[10px] border border-light-border bg-paper px-3 py-1.5 text-[13px] text-ink"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="label-mono mb-2 text-ink-muted">Status</p>
                  <p className="text-[15px] capitalize text-ink">{project.status}</p>
                </div>

                {project.link ? (
                  <PillButton href={project.link} label="Visit product" tone="solid" size="md" external />
                
                ) : (
                  <p className="rounded-btn border border-light-border px-4 py-3 text-center text-[13px] text-ink-muted">
                    {project.status === "proprietary"
                      ? "Proprietary — no public link"
                      : "Internal — no public link"}
                  </p>
                )}
              </div>
            </aside>
          </div>

          <section className="mt-20 rounded-card border border-light-border bg-dark px-8 py-12 text-dark-text md:px-12">
            <h2 className="heading mb-3 text-[28px] md:text-[36px]">
              Need something like this?
            </h2>
            <p className="mb-6 max-w-lg text-[16px] text-dark-muted">
              Tell us about the product or system you want to build.
            </p>
            <PillButton href="mailto:the.lunox.co@gmail.com?subject=Talk%20to%20Lunox" label="Talk to us" tone="glass" size="md" />
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
