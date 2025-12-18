import { createContext, Suspense, useState, use } from "react"
import type { Note, NoteCreationDTO, NoteDeletionDTO } from "../interfaces/Note";
import type { Tag, TagCreationDTO } from "../interfaces/Tag";
import { getNotes, getTags, storeNote } from "../lib/request";
import useTaggedNotesRepository from "../hooks/useTaggedNotesRepository";
const TaggedNoteModel = createContext<{
    synchronized: boolean;
    tags: Tag[];
    notes: Note[];
    updater?:(tags: Tag[], notes: Note[]) => void,
    addNote?: (newNote: NoteCreationDTO) => void;
    deleteNote?: (deletedNote: NoteDeletionDTO) => void;
    addTag?: (newTag: TagCreationDTO) => void;
    loader?: () => void
}>({
    synchronized: true,
    tags: [
        { name: 'av', id: '40' },
        { name: 'b', id: '3' },
        { name: 'c', id: '2' },
        { name: 'a', id: '42' },
    ],
    notes: [],

});
const store: {
    notes?: 'fetching' | Note[];
    tags?: 'fetching' | Tag[];
    currentFetch?: Promise<{
        notes: Note[];
        tags: Tag[];
    }>
} = {};

function getNotesAndTags() {

    if(typeof store?.currentFetch === 'undefined') {
        store.notes = 'fetching';
        store.tags = 'fetching';
        store.currentFetch = Promise.all([
            // fetch('/notes.json').then(
            getNotes(),
            // fetch('/tags.json').then(
            getTags(),
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                },3000)
            })
        ]).then(([notes, tags, timeout]) => {
            store.tags = tags;
            store.notes = notes;
            console.log({
                notes, tags, timeout
            })
            return ({
                notes,
                tags,
                timeout
            });
        }).catch((globalError) => {
            console.error({ globalError });
            // throw globalError;
            return ({
                notes: [],
                tags: [],
                timeout: true
            });
        });
        return store.currentFetch;

    }else {
        return store.currentFetch;
    }
}
export const TaggedNoteConsumer = TaggedNoteModel.Consumer;

function Fetcher({ children }: { children: React.ReactNode }) {
    const {
        tags,
        notes
    } = use(getNotesAndTags());
    console.log({
        tags,
        notes
    })
    return <TaggedNoteConsumer>{({updater}) => {
        setTimeout(()=> {
            if (typeof updater === 'function') {
                updater(tags, notes);
            }
        }, 200)
        return children;
    }}</TaggedNoteConsumer>;
}
function StoreLoader({children}: {children:React.ReactNode}) {
    return <Suspense fallback={<p>loading</p>}>
        <Fetcher>{children}</Fetcher>
    </Suspense>
}

export function TaggedNoteProvider({children}: {children:React.ReactNode}){
    const [synchronized, setSynchronized] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const {
        localNotes,
        setLocalNotes,
        setAddNote,
        addLocalNote,
        importNotes
    } = useTaggedNotesRepository()
    console.log({
        localNotes,
        setLocalNotes,
        setAddNote,
        addLocalNote,
        importNotes
    });

    return <TaggedNoteModel.Provider value={{
        synchronized,
        tags,
        notes,
        updater: (tags: Tag[], notes: Note[]) => {
            setSynchronized(true);
            setTags(tags);
            setNotes(notes);
            setLocalNotes(notes);
            if(typeof importNotes === "function") {
                importNotes(notes);
            }
        },
        deleteNote:(subject: NoteDeletionDTO) => {
            console.log(subject);
        },
        addNote: async (note: NoteCreationDTO) => {
            const returnedNotes = await storeNote(note);
            console.log(returnedNotes)
            if(typeof addLocalNote === 'function') {
                addLocalNote(note);
            }
            setLocalNotes(returnedNotes);
            setNotes(returnedNotes);
            return returnedNotes;
        },
        // addTag:() => {},
    }}>
        <StoreLoader>
            {children}
        </StoreLoader>
    </TaggedNoteModel.Provider>;
}
