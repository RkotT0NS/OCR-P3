

import { useEffect } from 'react';
import useSWR from 'swr';
import { getTags, getNotes } from '../lib/request';
import type { Note } from '../interfaces/Note';
import type { Tag } from '../interfaces/Tag';
import { useTaggedNotes } from '../hooks/useTaggedNotes';
export default function StoreLoader ({children}: {children: React.ReactNode}) {
    const { update} = useTaggedNotes();

    const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useSWR<Tag[]>('tags', getTags);
    const { data: notesData, error: notesError, isLoading: notesLoading } = useSWR<Note[]>('notes', getNotes);

    useEffect(() => {
        if(notesData && tagsData) {
            update(
                notesData,
                tagsData,
            );
        }
    }, [tagsData, notesData, update]);

    if (tagsError || notesError) {
      return <div>Error loading data</div>;
    }

    if (tagsLoading || notesLoading) {
      return <div>Loading...</div>;
    }
    try {
        // update(
        //     notesData??[],
        //     tagsData??[],
        // );

    } catch (error) {
        console.log(error)
    }

    return children;
}
