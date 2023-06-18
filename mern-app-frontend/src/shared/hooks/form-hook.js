import { useCallback, useReducer } from 'react';

// The reducer logic
const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    // if it is undefined
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            };
        default:
            return state;
    }
};

export const useForm = (initialInputs, initialFormValidity) => {
    // Initial state
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    // When we call dispatch we re-render the component, so we need to use useCallback to avoid infinite loop.
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id });
    }, []);
    // setFormData will also not change because we are using useCallback.
    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    }, []);

    return [formState, inputHandler, setFormData];
};
