import { defineField, defineType } from "sanity";

export const horseType = defineType({
  name: "horse",
  title: "The Herd (Horses)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Horse Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "breed",
      title: "Breed",
      type: "string",
    }),
    defineField({
      name: "discipline",
      title: "Discipline / Specialty",
      type: "string",
      description: "e.g. Showjumping, Dressage, Beginner Schoolmaster",
    }),
    defineField({
      name: "personality",
      title: "Personality & Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Horse Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
});
