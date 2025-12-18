import useSWR from 'swr';
import { getTags, getNotes } from './lib/request';
import type { Note } from './interfaces/Note';
import type { Tag } from './interfaces/Tag';

export default function LoadingSample() {
  const { data: tags, error: tagsError, isLoading: tagsLoading } = useSWR<Tag[]>('tags', getTags);
  const { data: notes, error: notesError, isLoading: notesLoading } = useSWR<Note[]>('notes', getNotes);

  if (tagsError || notesError) {
    return <div>Error loading data</div>;
  }

  if (tagsLoading || notesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {tags?.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <h1>Notes</h1>
      <ul>
        {notes?.map((note) => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}
