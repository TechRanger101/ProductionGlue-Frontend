"use client";

import { create } from "zustand";

type VenueTablePageState = {
    venueTablePage: number;
    setVenueTablePage: (page: number) => void;
    };

export const useVenueTablePageStore = create<VenueTablePageState>((set) => ({
    venueTablePage: 0,
    setVenueTablePage: (page) => set(() => ({ venueTablePage: page })),
}));
