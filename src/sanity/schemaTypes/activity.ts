import { defineField, defineType } from "sanity";

export const activityType = defineType({
  name: "activity",
  title: "Activity & Amenity",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Activity Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Activity Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "Button Text",
      type: "string",
      initialValue: "Know more",
    }),
    defineField({
      name: "ctaHref",
      title: "Link URL",
      type: "string",
      description: "e.g. /beyond/summer-camps or /contact",
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
      title: "title",
      subtitle: "description",
      media: "image",
    },
  },
});
