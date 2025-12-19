import { createContext } from "react"
import type { Note, NoteCreationDTO, NoteDeletionDTO } from "../interfaces/Note";
import type { Tag, TagCreationDTO } from "../interfaces/Tag";
import {  storeNote, storeTag, deleteNote } from "../lib/request";
import StoreLoader from "./StoreLoader";
import { useTaggedNotes } from "../hooks/useTaggedNotes";

const TaggedNoteModel = createContext<{
    tags: Tag[];
    notes: Note[];
    updater?:(tags: Tag[], notes: Note[]) => void,
    addNote?: (newNote: NoteCreationDTO) => void;
    deleteNote?: (deletedNote: NoteDeletionDTO) => void;
    addTag?: (newTag: TagCreationDTO) => void;
}>({
    tags: [],
    notes: [],
});
export const TaggedNoteConsumer = TaggedNoteModel.Consumer;


export function TaggedNoteProvider({children}: {children:React.ReactNode}){
    const {tags, notes, updateNotes, updateTags}=useTaggedNotes()


    return <TaggedNoteModel.Provider value={{
        tags,
        notes,
        // updater: (tags: Tag[], notes: Note[]) => {
        // },
        deleteNote:(subject: NoteDeletionDTO) => {
            console.log(deleteNote.toString())
            console.log(subject);
        },
        addNote: async (note: NoteCreationDTO) => {
            const returnedNotes = await storeNote(note);
            console.log(returnedNotes);
            updateNotes(returnedNotes);
            // return returnedNotes;
        },
        addTag:async (tag: TagCreationDTO) => {
            const returnedTags = await storeTag(tag);
            console.log(returnedTags);
            updateTags(returnedTags);
            // return returnedTags;
        },
    }}>
        <StoreLoader>
            {children}
        </StoreLoader>
    </TaggedNoteModel.Provider>;
}
