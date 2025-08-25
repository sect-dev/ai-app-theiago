// TextBlock1.tsx
interface Props {
	heading?: string;
	ctaText?: string;
	ctaLink?: string;
	seoText?: string | null;
}

export default function TextBlock1({
	heading,
	ctaText,
	ctaLink,
	seoText
}: Props) {
	return (
		<section className="text-block-1 bg-green-500">
			{heading && <h2>{heading}</h2>}
			{seoText && <p>{seoText}</p>}
			{ctaText && ctaLink && (
				<a href={ctaLink} className="btn">
					{ctaText}
				</a>
			)}
		</section>
	);
}
