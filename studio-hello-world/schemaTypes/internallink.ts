import {defineType, defineField} from 'sanity'

export const internallink = defineType({
  name: 'internallink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Internal Links',
      type: 'array',
      of: [
        defineField({
          name: 'linkItem',
          title: 'Link Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Link Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Internal Link Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(4).min(4),
    }),
  ],
})
