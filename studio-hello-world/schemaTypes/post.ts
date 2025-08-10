import { defineType, defineField } from 'sanity'

export const chatBlock = defineType({
  name: 'chatBlock',
  title: 'Chat Block',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Block Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      of: [
        defineField({
          name: 'card',
          title: 'Card',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Model Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
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
              validation: (Rule) => Rule.uri({
                allowRelative: true,
                scheme: ['http', 'https']
              }),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
