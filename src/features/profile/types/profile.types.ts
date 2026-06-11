import { User } from "../../auth/types";
import { SelectCommunity } from "../../communities/types/communityTypes";
import { SelectMeeti } from "../../meetis/types/meeti.types";

export type FullProfile = User & {
    communities: SelectCommunity[]
    meeties: SelectMeeti[]
}