"use client";

import { create } from "zustand";

type VendorShareStore = {
    vendorShared: any[];
    setVendorsShared: (vendorShared:any) => void;
    addVendorShared: (vendorShared:any) => void;
    removeVendorShared: (vendorShared:any) => void;
    reset: () => void;
};

export const useVendorShareStore = create<VendorShareStore>((set) => ({
    vendorShared: [],
    setVendorsShared: (vendorShared:any) => set({ vendorShared }),
    addVendorShared: (venueShared:any) => set((state:any) => ({ vendorShared: [...state.vendorShared, venueShared] })),
    removeVendorShared: (venueShared:any) => set((state:any) => ({ vendorShared: state.vendorShared.filter((v:any) => v.id !== venueShared.id) })),
    reset: () => set({ vendorShared: [] }),
}));

