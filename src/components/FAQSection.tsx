import { SectionHeading } from "@/components/SectionHeading";
import type { PageCopy } from "@/data/site";

type FAQSectionProps = {
  faq: PageCopy["faq"];
};

export const FAQSection = ({ faq }: FAQSectionProps) => {
  return (
    <section className="section-band bg-cream px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} text={faq.intro} />
        <div className="grid gap-3">
          {faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[1.4rem] border border-border bg-background p-5"
            >
              <summary className="cursor-pointer list-none text-lg font-black marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sun text-base leading-none transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
