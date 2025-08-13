import { defineType, defineField } from 'sanity'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        defineField({
          name: 'faqItem',
          title: 'FAQ Item',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
