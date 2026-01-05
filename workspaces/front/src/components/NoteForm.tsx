import {  useState } from "react";
import { submitEffect } from "../lib/form";
import type { Tag } from "../interfaces/Tag";
import type { NoteCreationDTO } from "../interfaces/Note";
export function NotesList () {

}

export default function NoteForm ({tags, addNote}: {
    tags: Tag[],
    addNote: (note: NoteCreationDTO) => Promise<void>
}) {
    const [uiState, setUiState] = useState<'pure'|'inTransit'|'transitSuccess'|'transitFailure'>('pure');
    const [session, setSession] = useState<{ message?: string; }>({});
    const [error, setError] = useState<{ message?: string; }>({});
    const submitNewTagName = submitEffect(
        setUiState,
        setError,
        setSession,
        ['text', "tag_id"],
        //@ts-expect-error submitEffect transit argument is polymorphic
        (values: NoteCreationDTO) => {
            return addNote(values);
        }
    );

    return <>
        {(typeof session?.message === "string") ?
            <div className="text-green-600 text-sm">{session.message}</div>
            : null
        }
        <h2 className="text-xl font-bold">Add a note</h2>

        <form onSubmit={submitNewTagName} className="space-y-2">
            <textarea
                readOnly={uiState === 'inTransit'}
                name="text"
                placeholder="Write your note ..."
                className="w-full border p-2"
            ></textarea>
            <select disabled={uiState === 'inTransit'} name="tag_id" className="w-full border p-2">
                {(tags.length === 0)
                    ? <option value="">-- No Tag available! --</option>
                    : <>
                        <option value="">-- Select Tag --</option>
                        {tags.map(
                            tag => <option key={tag.id} value={tag.id}>{tag.name}</option>
                        )}
                    </>
                }
            </select>
            <button disabled={uiState === 'inTransit'} type="submit" className="bg-blue-500 text-white px-4 py-2">
                {(uiState === 'inTransit')
                    ? "Adding a note ..."
                    : "Add Note"
                }
            </button>
        </form>
        {(typeof error?.message === "string")
            ? <div className="text-red-500 text-xs">{error.message}</div>
            : null
        }
    </>;
}
