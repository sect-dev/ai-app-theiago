import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
        defineField({
      name: 'metatitle',
      title: 'Meta title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
            defineField({
      name: 'metadescription',
      title: 'Meta description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'ctaBanner1' },
        { type: 'modelBanner' },
        { type: 'textBlock1' },
        { type: 'textBlock2' },
        { type: 'textBlock3' },
        { type: 'faqBlock' },
        { type: 'internallink' },
      ],
    }),
  ],
})