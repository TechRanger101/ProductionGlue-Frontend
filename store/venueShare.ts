"use client";

import { create } from "zustand";

type VenueShareStore = {
    venuesShared: any[];
    setVenuesShared: (venuesShared:any) => void;
    addVenueShared: (venueShared:any) => void;
    removeVenueShared: (venueShared:any) => void;
    reset: () => void;
};

export const useVenueShareStore = create<VenueShareStore>((set) => ({
   venuesShared: [],
    setVenuesShared: (venuesShared:any) => set({ venuesShared }),
    addVenueShared: (venueShared:any) => set((state:any) => ({ venuesShared: [...state.venuesShared, venueShared] })),
    removeVenueShared: (venueShared:any) => set((state:any) => ({ venuesShared: state.venuesShared.filter((v:any) => v.id !== venueShared.id) })),
    reset: () => set({ venuesShared: [] }),
}));

