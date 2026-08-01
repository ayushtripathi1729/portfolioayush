interface SectionTitleProps {
  title: string;
  description?: string;
}


export function SectionTitle({
  title,
  description,
}: SectionTitleProps) {

  return (
    <div
      className="
      mb-16
      space-y-5
      "
    >

      <div
        className="
        flex
        items-center
        gap-4
        "
      >

        <div
          className="
          h-px
          w-12
          bg-foreground
          "
        />

        <span
          className="
          text-xs
          uppercase
          tracking-[0.4em]
          text-muted-foreground
          "
        >
          Portfolio
        </span>

      </div>





      <h2
        className="
        text-4xl
        font-semibold
        tracking-tight
        md:text-5xl
        "
      >
        {title}
      </h2>





      {description && (

        <p
          className="
          max-w-2xl
          text-lg
          leading-8
          text-muted-foreground
          "
        >
          {description}
        </p>

      )}

    </div>
  );
}