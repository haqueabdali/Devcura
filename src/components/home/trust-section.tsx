import { Counter } from "@/components/ui/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { clientLogos, companyStats, trustSignals } from "@/content/company";

export function TrustSection() {
  return (
    <section className="border-y border-ink-800 bg-ink-900" aria-labelledby="trust-heading">
      <div className="container-page py-14 md:py-16">
        <h2 id="trust-heading" className="sr-only">
          Company track record and clients
        </h2>

        <Reveal>
          <p className="text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ink-500">
            Trusted by engineering and operations leaders
          </p>
        </Reveal>

        {/* Client wordmark placeholders — replace with SVG marks in /public/images/clients */}
        <div
          className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          aria-hidden="true"
        >
          <div className="flex w-max motion-safe:animate-[marquee_38s_linear_infinite]">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <span
                key={`${logo}-${index}`}
                className="whitespace-nowrap px-8 text-[0.95rem] font-medium tracking-tight text-ink-500 transition-colors hover:text-ink-300"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Clients include {clientLogos.join(", ")}.
        </p>

        <Stagger className="mt-14 grid grid-cols-2 gap-px border border-ink-800 bg-ink-800 lg:grid-cols-4">
          {companyStats.map((stat) => (
            <StaggerItem key={stat.label} className="bg-ink-900 p-6 md:p-8">
              <p className="text-[2.1rem] font-semibold leading-none tracking-tight text-white md:text-[2.6rem]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-[0.9rem] font-medium text-ink-100">{stat.label}</p>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-500">
                {stat.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-px grid grid-cols-2 gap-px border-x border-b border-ink-800 bg-ink-800 lg:grid-cols-4">
          {trustSignals.map((signal) => (
            <StaggerItem key={signal.label} className="bg-ink-950/40 p-5 md:px-8">
              <p className="text-[1.05rem] font-semibold text-accent-300">{signal.value}</p>
              <p className="mt-1 text-[0.82rem] text-ink-300">{signal.label}</p>
              <p className="text-[0.72rem] text-ink-600">{signal.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
