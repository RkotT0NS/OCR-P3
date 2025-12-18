export type UiState = "pure" | "inTransit" | "transitSuccess" | "transitFailure";

export function submitEffect(
    setUiState:React.Dispatch<React.SetStateAction<UiState>>,
    setError: React.Dispatch<React.SetStateAction<{
        message?: string;
    }>>,
    setSession: React.Dispatch<React.SetStateAction<{
        message?: string;
    }>>,
    watchedName: string[],
    transit?: (values: Record<string, string | string[]>) => Promise<void>,
) : React.FormEventHandler<HTMLFormElement> {
    return function handleFormEvent(event) {
        event.preventDefault();
        setUiState('inTransit');
        setError({});
        setSession({});

        try {
            const formElement = (event.target) as HTMLFormElement;
            const formValue = new FormData(formElement)
            const watchedValues = watchedName.reduce((values, valueName )=> {
                const currentValue = formValue.getAll(valueName);
                if(currentValue.length>0) {
                    if (currentValue.length === 1){
                        values[valueName] = currentValue[0];
                    } else {
                        values[valueName] = currentValue;
                    }
                }
                return values;
            }, Object.create(null));
            if (typeof transit === 'function') {
                transit(watchedValues).then(() => {
                    setUiState('transitSuccess');
                    setSession({ message: 'done !' });
                    formElement.reset();
                });
            } else {
                // await at least 3 rendering cycles
                setTimeout(() => {
                    setUiState('transitSuccess');
                    setSession({ message: 'done !' });
                    formElement.reset();
                }, 3 * 20);
            }

        } catch (transitError) {
            setUiState('transitFailure');
            setError({message: transitError?.toString()})
        }
    }
}
