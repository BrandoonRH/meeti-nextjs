import { create } from "zustand";
import { SelectCommunity } from "../types/communityTypes";

interface Store {
  open: boolean;
  setOpen: (open: boolean) => void;
  community: SelectCommunity | null;
  setCommunity: (community: SelectCommunity | null) => void;
}

export const useCommunityStore = create<Store>((set, get) => ({
  open: false,
  community: null,
  setOpen: (open) => set({ open }),
  setCommunity: (community) => {
    set({
      community,
    });
  },
}));
