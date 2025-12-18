import type { Note, NoteDeletionDTO , NoteCreationDTO } from "../interfaces/Note";
import type { Tag, TagCreationDTO } from "../interfaces/Tag"

function getIdentificationHeader() {
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const metaContent = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (typeof metaContent === 'string') {
        headers.set('X-CSRF-TOKEN', metaContent);
    }
    return headers;
}

export async function getTags(): Promise<Tag[]> {
    return fetch('/api/tags', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => {
            console.log("Status:", res.status);
            return res.json();
        })
        .catch(error => {
            return Promise.reject(new Error('Failed to get tags', { cause: error }));
        });
}

export async function storeTag(newTag: TagCreationDTO): Promise<Tag[]> {
    return fetch('/api/tags', {
        method: 'POST',
        body: JSON.stringify(newTag),
        headers: getIdentificationHeader()
    })
        .then(res => {
            console.log("Status:", res.status); // Should now be 200 or 401
            // https://livewire.laravel.com/docs/3.x/javascript#interacting-with-events
            window.Livewire?.dispatch('tagCreated');
            return res.json();
        })
        .catch(error => {
            return Promise.reject(new Error('Failed to store tag', { cause: {error, newTag} }));
        });
}

export async function getNotes(): Promise<Note[]> {
    return fetch('/api/notes', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => {
            console.log("Status:", res.status);
            return res.json();
        })
        .catch(error => {
            return Promise.reject(new Error('Failed to get notes', { cause: {error} }));
        });
}

export async function storeNote(newNote: NoteCreationDTO): Promise<Note[]> {
    return fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: getIdentificationHeader()
    })
        .then(res => {
            console.log("Status:", res.status); // Should now be 200 or 401
            // https://livewire.laravel.com/docs/3.x/javascript#interacting-with-events
            if (res.ok) {
                window?.Livewire?.dispatch('noteCreated');
                return res.json();
            }
                return Promise.reject(new Error('Failed to store notes', { cause: {newNote} }));
        })
        .catch(error => {
            return Promise.reject(new Error('Failed to store notes', { cause: {error} }));
        });
}


export async function deleteNote(noteReference: NoteDeletionDTO): Promise<boolean> {
    return fetch('/api/note/' + noteReference.reference, {
        method: 'DELETE',
        headers: getIdentificationHeader()
    })
        .then(res => {
            console.log("Status:", res.status); // Should now be 200 or 401
            // https://livewire.laravel.com/docs/3.x/javascript#interacting-with-events
            if (!res.ok) {
                return false;
            }
            window.Livewire?.dispatch('noteDeleted', [noteReference.reference]);
            return true;
        })
        .catch(error => {
            return Promise.reject(new Error('Failed to delete notes', { cause: {error, note: noteReference} }));
        });
}
