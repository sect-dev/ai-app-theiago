// ModelBanner.tsx
import Image from "next/image";

interface Props {
	heading?: string;
	items?: {
		heading?: string;
		ctaText?: string;
		ctaLink?: string;
		image?: {
			asset?: { url: string };
			alt?: string | null;
		};
	}[];
}

export default function ModelBanner({ heading, items }: Props) {
	return (
		<section className="model-banner bg-yellow-500">
			{heading && <h2>{heading}</h2>}
			<div className="model-banner-items">
				{items?.map((item, idx) => (
					<div key={idx} className="model-card">
						{item.image?.asset?.url && (
							<Image
								src={item.image.asset.url}
								alt={item.image.alt || ""}
								width={300}
								height={200}
							/>
						)}
						{item.ctaText && item.ctaLink && (
							<a href={item.ctaLink} className="btn">
								{item.ctaText}
							</a>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
