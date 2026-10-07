import { defineArrayMember, defineField, defineType } from "sanity";

export const programType = defineType({
  name: "program",
  title: "Riding Programs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Program Title",
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
      name: "category",
      title: "Category / Level",
      type: "string",
      description: "e.g. TRIAL EXPERIENCE, BEGINNER LEVEL, INTERMEDIATE, SPECIALIZATION",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (Card Overview)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "paragraphs",
      title: "Detailed Narrative Paragraphs (Detail Page)",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "bannerImage",
      title: "Banner / Header Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "curriculumList",
      title: "Curriculum / Feature Checklist",
      description: "Bulleted feature lines with dividers on detail page",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "experiences",
      title: "What You'll Experience Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "description", title: "Card Description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "duration",
      title: "Session Duration",
      type: "string",
      initialValue: "1 session - 45 minutes",
    }),
    defineField({
      name: "sessions",
      title: "Total Program Sessions",
      type: "string",
      description: "e.g. 50 or 12 sessions a month",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "Enroll now",
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
