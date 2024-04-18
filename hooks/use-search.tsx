import { create } from 'zustand'

type searchStore = {
    isOpen : boolean;
    onOpen: () => void;
    onClose: () => void;
    toggleSearch: () => void;
}

export const useSearch = create<searchStore>((set,get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toggleSearch: () => set({ isOpen:!get().isOpen })
}))