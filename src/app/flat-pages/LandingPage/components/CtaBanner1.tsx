import Image from "next/image";

interface Props {
	heading?: string;
	ctaText?: string;
	ctaLink?: string;
	seoText?: string;
	image?: {
		asset?: { url: string };
		alt?: string | null;
	};
}

export default function CtaBanner1({
	heading,
	ctaText,
	ctaLink,
	seoText,
	image
}: Props) {
	console.log(seoText);
	return (
		<section className="cta-banner bg-red-500">
			{heading && <h1>{heading}</h1>}
			{seoText && <p>{seoText}</p>}
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
