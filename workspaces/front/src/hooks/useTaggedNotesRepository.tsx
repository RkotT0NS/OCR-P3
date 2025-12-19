import { useState, useEffect } from "react";
import type { Note, NoteCreationDTO, NoteDeletionDTO } from "../interfaces/Note";
import type { Tag, TagCreationDTO } from "../interfaces/Tag";
import makeRepository from "../hooks/useTaggedNotes";

const request = window.indexedDB.open("taggedNotes", 1);
// let db: IDBDatabase | null = null;
request.onerror = (event) => {
    console.log({ indexedDBOpenError: event });
};

request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = event.target?.result;

    // Create another object store called "names" with the autoIncrement flag set as true.
    // const objStore = db.createObjectStore("items", { autoIncrement: true });
    db.createObjectStore("notes", { autoIncrement: true });
    db.createObjectStore("tags", { autoIncrement: true });
    console.log({ indexedDBupgradeneeded: event });
};

let db: IDBDatabase = null;
request.onsuccess = (event: { target: { result: IDBDatabase } }) => {
    console.log({ indexedDBOpenSuccess: event });
    db = event.target.result;
    db.onerror = (dbErrorEvent) => {
        console.log({ dbErrorEvent });
    };

    const objectStore = db.transaction("notes").objectStore("notes");
    const storedActivitities = [] as Note[];
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
            storedActivitities.push(cursor.value);
            cursor.continue();
        } else {
            console.log(storedActivitities);
            console.log("No more entries!");
        }
    };
};
export const useTaggedNotes = makeRepository(() => Promise.resolve({ tags: [], notes: [] }), () => Promise.resolve({ tags: [], notes: [] }));

export default function useTaggedNotesRepository() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const [
        addNote,
        setAddNote
    ] = useState<
        ((newNote: NoteCreationDTO) => Promise<Note[]>)
        | null
    >(null);
    const [
        importNotes,
        setImportNotes
    ] = useState<
        ((notes: Note[]) => Promise<boolean>)
        | null
    >(null)
    const [addTag, setAddTag] = useState<
        ((newTag: TagCreationDTO) => Promise<Note[]>)
        | null
    >(null);
    const [deleteNote, setDeleteNote] = useState<
        ((noteReference: NoteDeletionDTO) => Promise<Note[]>)
        | null
    >(null);

    useEffect(() => {
        if (
            addNote === null
            && addTag === null
            && importNotes === null
            && deleteNote === null
        ) {
            setImportNotes(() => {
                return (notes: Note[]) => new Promise((resolve, reject) => {
                    const transaction = db?.transaction(["notes"], "readwrite");
                    // Do something when all the data is added to the database.
                    transaction.oncomplete = (transactionEvent) => {
                        console.log({ transactionSuccess: transactionEvent });
                    };

                    transaction.onerror = (transactionEvent) => {
                        reject({ transactionError: transactionEvent });
                    };

                    const objectStore = transaction.objectStore("notes");

                    objectStore.openCursor().onsuccess = (event) => {
                        const cursor = event.target.result;
                        notes.findIndex((note) => note.id === cursor.value.id);
                        if (cursor && notes.findIndex((note) => note.id === cursor.value.id) === -1) {
                            cursor.continue();
                        }
                    };
                    Promise.all(notes.map((note) => {
                        return new Promise((innerResolve) => {
                            const request = objectStore.get(note.id);
                            request.onsuccess = () => {
                                if(request.result) {
                                    return innerResolve(true);;
                                }
                                const addRequest = objectStore.add(note);
                                addRequest.onsuccess = (transactionRequestEvent) => {
                                    innerResolve(true);
                                    console.log({
                                        transactionRequestSuccess: transactionRequestEvent,
                                    });
                                };
                            };
                        });
                    })).then(() => resolve(true) )
                });
            });
            setAddNote(() => {
                return (newNote: NoteCreationDTO) => new Promise((resolve, reject) => {
                    const transaction = db?.transaction(["notes"], "readwrite");
                    // Do something when all the data is added to the database.
                    transaction.oncomplete = (transactionEvent) => {
                        console.log({ transactionSuccess: transactionEvent });
                    };

                    transaction.onerror = (transactionEvent) => {
                        reject({ transactionError: transactionEvent });
                    };

                    const objectStore = transaction.objectStore("notes");
                    const request = objectStore.add(newNote);
                    request.onsuccess = (transactionRequestEvent) => {
                        const somethingComputed = 42;
                        setNotes((prev: Note[]) => [...prev, { id: somethingComputed, ...newNote }]);
                        console.log({
                            transactionRequestSuccess: transactionRequestEvent,
                        });
                        resolve(notes);
                    };
                });
            });
        }
    }, [
        addNote,
        addTag,
        deleteNote,
        notes
    ]);

    return {
        localNotes: notes,
        setLocalNotes: setNotes,
        addLocalNote: addNote,
        setAddNote,
        tags,
        addNote,
        importNotes,
        deleteNote,
        addTag
    };
};
