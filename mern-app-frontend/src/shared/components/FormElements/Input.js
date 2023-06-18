import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': // Wait for change action
            return {
                ...state, //copy the old state
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true // set isTouched to true when its is blurred (desfocado).
            };
        }
        default:
            return state;
    }
};

// The props are the props that we pass to the Input component in NewPlace.js and UpdatePlace.js, so this is the reason we use props and not newPlace or UpdatePlace.
const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '', // initialValue is passed to Input component in NewPlace.js and UpdatePlace.js
        isTouched: false,
        isValid: props.initialValid || false // initialValid is passed to Input component in NewPlace.js and UpdatePlace.js
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const element =
        props.element === 'input' ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea id={props.id} rows={props.rows || 3} onChange={changeHandler} value={inputState.value} onBlur={touchHandler} /> // 3 is the default value if rows is not passed.
        );

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};
export default Input;

// useReducer() is a hook that is similar to useState() but is used for more complex state management. For example, if you have a state that is an object or an array, then you should use useReducer() instead of useState(). useReducer is a function that takes two arguments: a reducer function and an initial state. It returns an array with exactly two elements: the current state and a dispatch function. The dispatch function is used to dispatch actions to the reducer function.
