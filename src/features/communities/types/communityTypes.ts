import { community, communityMembers } from "@/src/db/schema";
import { User } from "better-auth";

//import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type InsertCommunity = typeof community.$inferInsert;
export type SelectCommunity = typeof community.$inferSelect;
/* export type InsertCommunity = InferInsertModel<typeof community>;
export type SelectCommunity = InferSelectModel<typeof community>; */

export type SelectCommunityMembers = typeof communityMembers.$inferSelect;

export type JoinedCommunity = SelectCommunityMembers & {
  community: SelectCommunity,
  user: User
}

export type CommunityPermissions = {
  canEdit: boolean;
  canDelete: boolean;
  canJoin: boolean;
  canLeave: boolean;
  canViewMembers: boolean;
};

export type CommunityContext = {
  isAdmin: boolean;
  isMember: boolean;
};

export type CommunityWithPermissions = {
  data: SelectCommunity;
  memberCount: number; 
  context: CommunityContext;
  permissions: CommunityPermissions;
};
