import { type SchemaTypeDefinition } from "sanity";
import { siteSettingsType } from "./siteSettings";
import { programType } from "./program";
import { beyondServiceType } from "./beyondService";
import { blogPostType } from "./blogPost";
import { riderStoryType } from "./riderStory";
import { instructorType } from "./instructor";
import { horseType } from "./horse";
import { teamMemberType } from "./teamMember";
import { chatFaqType } from "./chatFaq";
import { faqType } from "./faq";
import { galleryItemType } from "./galleryItem";
import { statType } from "./stat";
import { activityType } from "./activity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    programType,
    beyondServiceType,
    blogPostType,
    riderStoryType,
    instructorType,
    horseType,
    teamMemberType,
    chatFaqType,
    faqType,
    galleryItemType,
    statType,
    activityType,
  ],
};
