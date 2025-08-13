// FaqBlock.tsx
interface Props {
  heading?: string;
  items?: {
    question?: string;
    answer?: string;
  }[];
}

export default function FaqBlock({ heading, items }: Props) {
  return (
    <section className="faq-block bg-cyan-500">
      {heading && <h2>{heading}</h2>}
      {items?.map((item, idx) => (
        <details key={idx}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
