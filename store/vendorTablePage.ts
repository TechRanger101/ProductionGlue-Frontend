"use client";

import { create } from "zustand";

type VendorTablePageState = {
    vendorTablePage: number;
    setVendorTablePage: (page: number) => void;
    };

export const useVendorTablePageStore = create<VendorTablePageState>((set) => ({
    vendorTablePage: 0,
    setVendorTablePage: (page) => set(() => ({ vendorTablePage: page })),
}));
