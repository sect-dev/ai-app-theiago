import { defineType, defineField } from 'sanity'

export const ctaBanner1 = defineType({
  name: 'ctaBanner1',
  title: 'CTA Banner 1',
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
      type: 'text',
      description: 'Дополнительный текст под заголовком',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
})