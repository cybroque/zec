import { type SchemaTypeDefinition } from "sanity";
import { siteSettingsType } from "./siteSettings";
import { programType } from "./program";
import { beyondServiceType } from "./beyondService";
import { blogPostType } from "./blogPost";
import { riderStoryType } from "./riderStory";
import { instructorType } from "./instructor";
import { horseType } from "./horse";
import { teamMemberType } from "./teamMember";

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
  ],
};
