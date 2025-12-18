export default function DefaultErrorRenderer({ error }: { error: unknown }) {
    return (
        <div>
            <h1>Error</h1>
            <p>{error instanceof Error ? error?.message : String(error)}</p>
        </div>
    );
}
