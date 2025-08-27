import React from "react";
import Image from "next/image";

interface Props {
  heading?: string;
  text?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: {
    asset?: { url: string };
    alt?: string | null;
  };
}

export default function CtaBannerSecond({
  heading,
  text,
  ctaText,
  ctaLink,
  image,
}: Props) {
  return (
    <section>
      {heading && <h2>{heading}</h2>}
      {text && <p>{text}</p>}
      {image?.asset?.url && (
        <div>
          <Image
            src={image.asset.url}
            alt={image.alt || heading || ""}
            width={600}
            height={400}
          />
        </div>
      )}
      {ctaText && ctaLink && (
        <a href={ctaLink}>
          {ctaText}
        </a>
      )}
    </section>
  );
}
