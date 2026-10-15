import { defineArrayMember, defineField, defineType } from "sanity";

export const chatFaqType = defineType({
  name: "chatFaq",
  title: "Chatbot Q&A",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description:
        "Shown as a tap-to-ask quick reply chip, and used to match what visitors type.",
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 5,
      description: "The bot's reply. Keep it short — 2 to 3 sentences reads best.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "keywords",
      title: "Match Keywords",
      type: "array",
      description:
        "Extra words that should also route to this answer, e.g. price, fees, cost, charges.",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "linkLabel",
      title: "Link Button Label",
      type: "string",
      description: "Optional. e.g. See all programs",
    }),
    defineField({
      name: "linkUrl",
      title: "Link Button URL",
      type: "url",
      description: "Optional. Paired with the label above.",
      hidden: ({ parent }) => !parent?.linkLabel,
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
    select: { title: "question", subtitle: "answer" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled question",
        subtitle: subtitle ? `${subtitle.slice(0, 70)}…` : "No answer yet",
      };
    },
  },
});
