import { community } from "@/src/db/schema";
//import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type InsertCommunity = typeof community.$inferInsert;
export type SelectCommunity = typeof community.$inferSelect;
/* export type InsertCommunity = InferInsertModel<typeof community>;
export type SelectCommunity = InferSelectModel<typeof community>; */
