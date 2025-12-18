import type { Note, NoteDeletionDTO } from "../interfaces/Note";
import type { Tag } from "../interfaces/Tag";

export default function Notes({notes, tags, deleteNote}: {notes: Note[], tags: Tag[], deleteNote?: (subject: NoteDeletionDTO) => void, addNote?: (note: NoteCreationDTO) => void}) {
    const remove = (id: string) => {
        if (typeof deleteNote === 'function') {
            deleteNote({reference: id});
        } else {
            console.error('deleteNote function is not provided');
            console.error('Please provide a deleteNote function to handle note deletion.');
            console.error('Note ID:', id);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold">Your Notes</h2>
            {notes.map((note) => {
                // console.log({tags, note});
                return (
                    <div key={note.id} className="border p-3 flex justify-between items-start">
                        <div>
                            <p>{note.text}</p>
                            <small className="text-gray-500">Tag: {tags.find(tag => Number(tag.id) === Number(note.tag_id)).name}</small>
                        </div>
                        <button className="text-red-500 text-sm" onClick={() => remove(note.id)}>Delete</button>
                    </div>
                );
            })}
        </>
    );
}
