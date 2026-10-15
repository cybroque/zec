import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "Website FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Lessons & Training", value: "lessons" },
          { title: "Safety & Welfare", value: "safety" },
          { title: "Competitions", value: "competitions" },
          { title: "Facilities & Stables", value: "facilities" },
        ],
      },
      initialValue: "general",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "answer",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Question",
        subtitle: subtitle ? `${subtitle.slice(0, 80)}…` : "No answer yet",
      };
    },
  },
});
