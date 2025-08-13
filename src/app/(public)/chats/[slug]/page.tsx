// @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */

import {client} from "@/app/shared/lib/client"
import {pageBySlugQuery} from "@/app/shared/lib/queries"
import CtaBanner1 from "@/app/flat-pages/LandingPage/components/CtaBanner1"
import ModelBanner from "@/app/flat-pages/LandingPage/components/ModelBanner"
import TextBlock1 from "@/app/flat-pages/LandingPage/components/TextBlock1"
import TextBlock2 from "@/app/flat-pages/LandingPage/components/TextBlock2"
import TextBlock3 from "@/app/flat-pages/LandingPage/components/TextBlock3"
import FaqBlock from "@/app/flat-pages/LandingPage/components/FaqBlock"
import InternalLinkBlock from "@/app/flat-pages/LandingPage/components/InternalLinkBlock"
import Head from "next/head"

type SanityBlock = {
  _type: string
  _key: string
  [key: string]: any
}

const componentsMap: Record<string, React.ComponentType<any>> = {
  ctaBanner1: CtaBanner1,
  modelBanner: ModelBanner,
  textBlock1: TextBlock1,
  textBlock2: TextBlock2,
  textBlock3: TextBlock3,
  faqBlock: FaqBlock,
  internallink: InternalLinkBlock,
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }):Promise<JSX.Element> {
  const { slug } = await params
  const pages = await client.fetch(pageBySlugQuery, { slug })
  console.log(pages)

  if (!pages) {
    return <div>Not found</div>
  }

  return (
    <>
          <Head>
        <title>{pages.metatitle || pages.title}</title>
        {pages.metadescription && (
          <meta name="description" content={pages.metadescription} />
        )}
      </Head>
    <main>


      {pages.content?.map((block: SanityBlock) => {
        const BlockComponent = componentsMap[block._type];
        if (!BlockComponent) return null;
        return <BlockComponent key={block._key} {...block} />;
      })}
    </main>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`
    *[_type == "page" && defined(slug.current)]{
      "slug": slug.current
    }
  `)
  
  return slugs.map((page: { slug: string }) => ({
    slug: page.slug
  }))
}