// InternalLinkBlock.tsx
interface Props {
	heading?: string;
	links?: {
		title?: string;
		slug?: { current: string };
	}[];
}

export default function InternalLinkBlock({ heading, links }: Props) {
	return (
		<section className="internal-links bg-sky-500">
			{heading && <h2>{heading}</h2>}
			<ul>
				{links?.map((link, idx) => (
					<li key={idx}>
						<a href={`/${link.slug?.current}`}>{link.title}</a>
					</li>
				))}
			</ul>
		</section>
	);
}
