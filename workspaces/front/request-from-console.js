
async function getTags() {
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
        .then(data => console.log(data));
}

/**
 *
 * @param {{name:string}} newTag
 * @returns
 */
async function storeTag(newTag) {
    return fetch('/api/tags', {
        method: 'POST',
        body: JSON.stringify(newTag),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
        .then(res => {
            console.log("Status:", res.status); // Should now be 200 or 401
            // https://livewire.laravel.com/docs/3.x/javascript#interacting-with-events
            Livewire.dispatch('tagCreated');
            return res.json();
        })
        .then(data => console.log(data));
}

async function getNotes() {
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
        .then(data => console.log(data));
}

/**
 *
 * @param {{content:string, tag_id: number}} newNote
 * @returns
 */
async function storeNote(newNote) {
    return fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
        .then(res => {
            console.log("Status:", res.status); // Should now be 200 or 401
            // https://livewire.laravel.com/docs/3.x/javascript#interacting-with-events
            Livewire.dispatch('noteCreated');
            return res.json();
        })
        .then(data => console.log(data));
}


/**
 *
 * @param {{reference: number}} newNote
 * @returns
 */
async function deleteNote(noteReference) {
    return fetch('/api/notes', {
        method: 'DELETE',
        body: JSON.stringify(newNote),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
        .then(res => {
            console.log("Status:", res.status); // Should now be 200 or 401
            // https://livewire.laravel.com/docs/3.x/javascript#interacting-with-events
            Livewire.dispatch('noteDeleted');
            return res.json();
        })
        .then(data => console.log(data));
}
export default {
    getTags,
    storeTag,
    getNotes,
    storeNote,
    deleteNote,
}
