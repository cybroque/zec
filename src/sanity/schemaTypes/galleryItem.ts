import { defineField, defineType } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title / Caption",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Important for accessibility and SEO.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Stables", value: "stables" },
          { title: "Riders & Lessons", value: "riders" },
          { title: "Horses", value: "horses" },
          { title: "Competitions", value: "competitions" },
          { title: "Events", value: "events" },
        ],
      },
      initialValue: "stables",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram / Link URL",
      type: "url",
      description: "Optional link when clicking the photo (defaults to ZEC Instagram).",
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
      subtitle: "category",
      media: "image",
    },
  },
});
