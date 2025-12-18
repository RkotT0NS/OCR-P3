export {}
declare global {
    interface Window {
        Livewire: {
            dispatch: (message: string, ...parameters?: unknown[]) => void
        }
    }
}
