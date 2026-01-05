
import TagForm from './components/TagForm'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import { TaggedNoteConsumer, TaggedNoteProvider } from './contexts/TaggedNote'
import { ErrorBoundary } from './contexts/ErrorBoundary'

export default function App(): React.JSX.Element {
    return (
        <ErrorBoundary>
            <TaggedNoteProvider>
                <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                    <div className="space-y-4">
                        <TaggedNoteConsumer>
                            {/*@ts-expect-error types should be explicit*/}
                            {({ tags, addNote }) => <NoteForm {...{ tags, addNote }} />}
                        </TaggedNoteConsumer>

                        <hr />
                        <TaggedNoteConsumer>
                            {/*@ts-expect-error types should be explicit*/}
                            {({ tags, notes, deleteNote }) => <Notes {...{ tags, notes, deleteNote }} />}
                        </TaggedNoteConsumer>
                    </div>
                </div>

                <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                    <div className="space-y-4">

                        <TaggedNoteConsumer>
                            {/*@ts-expect-error types should be explicit*/}
                            {({ addTag }) => <TagForm {...{ addTag }} />}
                        </TaggedNoteConsumer>
                    </div>
                </div>
            </TaggedNoteProvider>
        </ErrorBoundary>
    );
}
