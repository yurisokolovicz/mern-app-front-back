import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook'; // Reducer custom hook
import './PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://www.esbnyc.com/sites/default/files/styles/small_feature/public/2022-06/iStock-937427130%20%281%29.jpg?itok=osCyvhw5.jpg',
        address: '20 W 34th St., New York, NY 10001',
        location: { lat: 40.7484405, lng: -73.9878531 },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://www.esbnyc.com/sites/default/files/styles/small_feature/public/2022-06/iStock-937427130%20%281%29.jpg?itok=osCyvhw5.jpg',
        address: '20 W 34th St., New York, NY 10001',
        creator: 'u2'
    }
];

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);

    const placeId = useParams().placeId;
    // sefFormData is used to set the initial values of the form (we just use it in UpdatePlace.js, not in NewPlace.js)
    const [formState, inputHandler, setFormData] = useForm(
        // getting back the formState and inputHandler from useForm() hook
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    // Here we must use useEffect to avoid infitit loop at setFormData function.
    // Now the identifiedPlace will not change with every re-render cycle, because we are using useEffect. With this logic, we are telling React to only run this code when the identifiedPlace changes.
    useEffect(() => {
        if (identifiedPlace) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace.title,
                        isValid: true
                    },
                    description: {
                        value: identifiedPlace.description,
                        isValid: true
                    }
                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>;
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>;
            </div>
        );
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
};
export default UpdatePlace;
