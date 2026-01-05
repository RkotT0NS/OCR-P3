import type { Note, NoteDeletionDTO } from "../interfaces/Note";
import type { Tag } from "../interfaces/Tag";

export default function Notes({notes, tags, deleteNote}: {notes: Note[], tags: Tag[], deleteNote: (subject: NoteDeletionDTO) => Promise<void>}) {
    return (
        <>
            <h2 className="text-xl font-bold">Your Notes</h2>
            {notes.map((note) =>  (
                <div key={note.id} className="border p-3 flex justify-between items-start">
                    <div>
                        <p>{note.text}</p>
                        <small className="text-gray-500">Tag: {
                            // @ts-expect-error tags is always an array
                            tags.find(tag => Number(tag.id) === Number(note.tag_id)).name
                        }</small>
                    </div>
                    <button className="text-red-500 text-sm" onClick={() => deleteNote({ reference: note.id })}>Delete</button>
                </div>
            ))}
        </>
    );
}
