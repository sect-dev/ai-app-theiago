// TextBlock3.tsx
interface Props {
  heading?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export default function TextBlock3({ heading, ctaText, ctaUrl }: Props) {
  return (
    <section className="text-block-3 bg-lime-500">
      {heading && <h2>{heading}</h2>}
      {ctaText && ctaUrl && (
        <a href={ctaUrl} className="btn">
          {ctaText}
        </a>
      )}
    </section>
  );
}
