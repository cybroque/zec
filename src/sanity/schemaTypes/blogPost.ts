import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog & Articles",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Short Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      initialValue: "BEGINNER'S GUIDE",
    }),
    defineField({
      name: "readTime",
      title: "Estimated Read Time",
      type: "string",
      initialValue: "5 min read",
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "date",
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      initialValue: "Zippy Equestrian Team",
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quoteOverlay",
      title: "Quote Overlay (Over Banner)",
      type: "string",
      description: "e.g. Nobody gets it right the first time",
    }),
    defineField({
      name: "contentSections",
      title: "Content Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Section Subheading (Optional)", type: "string" }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [defineArrayMember({ type: "text", rows: 3 })],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 2,
    }),
  ],
});
