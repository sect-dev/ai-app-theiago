// TextBlock2.tsx
interface Props {
	heading?: string;
	ctaText?: string;
	ctaUrl?: string;
}

export default function TextBlock2({ heading, ctaText, ctaUrl }: Props) {
	return (
		<section className="text-block-2 bg-purple-500">
			{heading && <h2>{heading}</h2>}
			{ctaText && ctaUrl && (
				<a href={ctaUrl} className="btn">
					{ctaText}
				</a>
			)}
		</section>
	);
}
