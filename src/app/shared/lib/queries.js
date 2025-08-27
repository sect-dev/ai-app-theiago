export const pageBySlugQuery = `
*[_type == "page" && slug.current == $slug][0]{
  title,
  metatitle,
  metadescription,
  content[]{
    _key,
    _type,

    // CTA Banner 1
    _type == "ctaBanner1" => {
      heading,
      seoText,
      ctaText,
      ctaLink,
      image{
        asset->{ _id, url },
        alt
      }
    },

    // CTA Banner Second
    _type == "ctaBannerSecond" => {
      heading,
      text,
      ctaText,
      ctaLink,
      image{
        asset->{ _id, url },
        alt
      }
    },

    // Model Banner
    _type == "modelBanner" => {
      heading,
      items[]{
        image{
          asset->{ _id, url },
          alt
        },
        name,
        age,
        description,
        ctaText,
        ctaLink
      }
    },

    // FAQ Block
    _type == "faqBlock" => {
      heading,
      items[]{
        question,
        answer
      }
    },

    // Internal Links
    _type == "internallink" => {
      heading,
      links[]{
        title,
        "slug": slug.current
      }
    },

    // Text Block 1
    _type == "textBlock1" => {
      heading,
      seoText,
      ctaText,
      ctaLink
    }
  }
}
`;
