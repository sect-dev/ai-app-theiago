import { defineType, defineField } from 'sanity'

export const textBlock1 = defineType({
  name: 'textBlock1',
  title: 'Text Block 1',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoText',
      title: 'SEO Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
  ],
})
