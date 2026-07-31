interface SectionTitleProps {
  title: string;
  description?: string;
}


export function SectionTitle({
  title,
  description,
}: SectionTitleProps) {

  return (
    <div className="mb-8 space-y-3">

      <h2 className="text-3xl font-bold tracking-tight">
        {title}
      </h2>


      {description && (
        <p className="max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}

    </div>
  );
}