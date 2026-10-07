import { defineArrayMember, defineField, defineType } from "sanity";

export const beyondServiceType = defineType({
  name: "beyondService",
  title: "Beyond the Ride Services",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
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
      name: "heroDescription",
      title: "Hero Description (Card / Split Hero)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "contentParagraphs",
      title: "Content Paragraphs (Detail Page)",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "highlightText",
      title: "Highlight Banner Statement",
      type: "string",
      description: "e.g. Includes Medals, Certificates & a Special Zippy Souvenir!",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Book your slot",
    }),
    defineField({
      name: "contactInterest",
      title: "Contact Form Preselected Interest",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
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
