import { defineField, defineType } from "sanity";

export const riderStoryType = defineType({
  name: "riderStory",
  title: "Rider Stories & Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Rider Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "age",
      title: "Age / Group",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Bangalore",
    }),
    defineField({
      name: "joinedDate",
      title: "Joined Date",
      type: "string",
    }),
    defineField({
      name: "startingLevel",
      title: "Starting Level",
      type: "string",
      initialValue: "Started as a complete beginner",
    }),
    defineField({
      name: "role",
      title: "Role / Discipline",
      type: "string",
      initialValue: "Rider",
    }),
    defineField({
      name: "quote",
      title: "Story / Testimonial Quote",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Rider Photo",
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
