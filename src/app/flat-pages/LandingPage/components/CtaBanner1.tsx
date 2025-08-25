import Image from "next/image";

interface Props {
	heading?: string;
	ctaText?: string;
	ctaLink?: string;
	image?: {
		asset?: { url: string };
		alt?: string | null;
	};
}

export default function CtaBanner1({
	heading,
	ctaText,
	ctaLink,
	image
}: Props) {
	console.log(ctaText);
	return (
		<section className="cta-banner bg-red-500">
			{heading && <h2>{heading}</h2>}
			{image?.asset?.url && (
				<Image
					src={image.asset.url}
					alt={image.alt || ""}
					width={600}
					height={400}
				/>
			)}
			{ctaText && ctaLink && (
				<a href={ctaLink} className="btn">
					{ctaText}
				</a>
			)}
		</section>
	);
}
