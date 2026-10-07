import { defineField, defineType } from "sanity";

export const instructorType = defineType({
  name: "instructor",
  title: "Instructors & Coaches",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Instructor Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Specialization",
      type: "string",
      initialValue: "Senior Riding Instructor",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Photo",
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
