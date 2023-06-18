import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {
    if (props.href) {
        return (
            <a
                className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${
                    props.danger && 'button--danger'
                }`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${
                    props.danger && 'button--danger'
                }`}
            >
                {props.children}
            </Link>
        );
    }
    return (
        <button
            className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${
                props.danger && 'button--danger'
            }`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;

// Neste componente, renderizamos coisas diferentes com base nos props que recebemos. Se tivermos um ref prop, renderizamos uma referência de âncora normal, um link normal. Se tivermos um prop, renderizamos um link. Se não tivermos nenhum desses props, renderizamos um botão normal.
