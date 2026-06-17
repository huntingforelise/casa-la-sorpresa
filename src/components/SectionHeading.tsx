type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

export const SectionHeading = ({ eyebrow, title, text }: SectionHeadingProps) => {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-citrus">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-black leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-lg leading-8 text-muted">{text}</p> : null}
    </div>
  );
};
