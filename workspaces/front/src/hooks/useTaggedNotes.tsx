import { create } from 'zustand'
import type { Tag } from '../interfaces/Tag';
import type { Note } from '../interfaces/Note';

export const useTaggedNotes = create<{
    notes: Note[],
    tags: Tag[],
    update: (notes: Note[], tags: Tag[]) => void,
    updateNotes: (notes: Note[]) => void,
    updateTags: (tags: Tag[]) => void,
}>((set) => ({
    notes: [],
    tags: [],
    update: ( notes: Note[], tags: Tag[]) => {
        set({ tags, notes })
    },
    updateNotes: ( notes: Note[]) => {
        set({  notes })
    },
    updateTags: (  tags: Tag[]) => {
        set({ tags })
    },
}))
