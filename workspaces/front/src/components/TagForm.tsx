import {  useState } from "react";
import { submitEffect } from "../lib/form";
export function TagsList () {

}

export default function TagForm () {
    const [uiState, setUiState] = useState<'pure'|'inTransit'|'transitSuccess'|'transitFailure'>('pure');
    const [session, setSession] = useState<{ message?: string; }>({});
    const [error, setError] = useState<{ message?: string; }>({});
    const submitNewTagName = submitEffect(
        setUiState,
        setError,
        setSession,
        ['name']
    );

    return <>
        {(typeof session?.message === "string") ?
            <div className="text-green-600 text-sm">{session.message}</div>
            : null
        }
        <h2 className="text-xl font-bold">Add a tag</h2>

        <form onSubmit={submitNewTagName} className="space-y-2">
            <input type="text" readOnly={uiState === 'inTransit'} name="name" placeholder="New tag name"
                className="border rounded px-3 py-1 text-sm w-full" />
            <button disabled={uiState === 'inTransit'} type="submit" className="bg-blue-500 text-white px-4 py-2">
                {(uiState === 'inTransit')
                    ? "Adding a tag ..."
                    : "Add Tag"
                }
            </button>
        </form>
        {(typeof error?.message === "string")
            ? <div className="text-red-500 text-xs">{error.message}</div>
            : null
        }
    </>;
}
