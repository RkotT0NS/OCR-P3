import { create } from 'zustand'
import type { Tag } from '../interfaces/Tag';
import type { Note } from '../interfaces/Note';

export default function makeRepository(
    getRemote: () => Promise<{ tags: Tag[], notes: Note[] }>,
    getLocal: () => Promise<{ tags: Tag[], notes: Note[] }>
) {
    return create<{ tags: Tag[], notes: Note[] }>((set) => ({
        tags: [],
        notes: [],
        fetchLocal: async () => {
            try {
                const result = await getLocal();
                set(result)
            } catch (error) {
                console.error(error);
            }
        },
        fetchRemote: async () => {
            try {
                const result = await getRemote();
                set(result)
            } catch (error) {
                console.error(error);
            }
        },
        resetRepository: () => set({
            tags: [],
            notes: [],
        }),
    }));
}
