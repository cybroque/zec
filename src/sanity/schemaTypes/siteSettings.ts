import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings & Contact",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Zippy Equestrian Center",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Real Riding. Real Feeling.",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      initialValue: "+91 98453 64281",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      initialValue: "ride@zippyec.com",
    }),
    defineField({
      name: "address",
      title: "Physical Address",
      type: "text",
      rows: 3,
      initialValue:
        "Survey No. 46/1 & 46/2, Chikkanayakanahalli, Off Sarjapur Road, Near Carmelaram Railway Station, Bengaluru, Karnataka 560035",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps Embed / Link URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://www.instagram.com/zippyequestrian",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "footerHeading",
      title: "Footer Headline",
      type: "string",
      initialValue: "The rider in you is just a ride away.",
    }),
    defineField({
      name: "footerSubheading",
      title: "Footer Subheading",
      type: "string",
      initialValue: "Your first ride is 30 minutes away. Call us and let's get you started.",
    }),
    defineField({
      name: "footerCtaText",
      title: "Footer Button Text",
      type: "string",
      initialValue: "Book your trial ride",
    }),
  ],
});
