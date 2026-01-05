export {}
declare global {
    interface Window {
        Livewire: {
            /**
             * Dispatches a custom event to the Livewire component.
             * @param message The name of the event to dispatch.
             * @param parameters Additional parameters to pass to the event.
             * @returns
             */
            dispatch: (message: string, ...parameters?: unknown[]) => void;
        }
    }
}
