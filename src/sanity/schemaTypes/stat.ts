import { defineField, defineType } from "sanity";

export const statType = defineType({
  name: "stat",
  title: "Milestone Stat",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Statistic Number / Value",
      type: "string",
      description: "e.g. 10+, 1000+, 45, 6",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label / Description",
      type: "text",
      rows: 2,
      description: "e.g. Years of riding in Bangalore",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "number",
      subtitle: "label",
    },
  },
});
