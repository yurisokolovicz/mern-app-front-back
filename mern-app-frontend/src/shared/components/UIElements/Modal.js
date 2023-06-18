import React from 'react';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

// Second component just for internal use, the Modal component will use it.
const ModalOverlay = placeItem => {
    const content = (
        <div className={`modal ${placeItem.className}`} style={placeItem.style}>
            <header className={`modal__header ${placeItem.headerClass}`}>
                <h2>{placeItem.header}</h2>
            </header>
            <form onSubmit={placeItem.onSubmit ? placeItem.onSubmit : event => event.preventDefault()}>
                <div className={`modal__content ${placeItem.contentClass}`}>{placeItem.children}</div>
                <footer className={`modal__footer ${placeItem.footerClass}`}>{placeItem.footer}</footer>
            </form>
        </div>
    );
    return ReactDom.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = placeItem => {
    return (
        <React.Fragment>
            {placeItem.show && <Backdrop onClick={placeItem.onCancel} />}
            <CSSTransition in={placeItem.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
                <ModalOverlay {...placeItem} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;

// event.preventDefault() prevents the default behavior of the form, which is to send a request and reload the page. We don't want this if we accidentally hit the enter key while filling out the form.

// <ModalOverlay {...placeItem} /> ...pros is the spread operator. It Takes the placeItem from Modal component (external component that we export) and forward all the placeItem to ModalOverlay (internal component which we do not export)

// Modal is basically like a pop-up but built into the page, not in a new browser window. It has a background where we can use this backdrop component which we already created. It has a header, content and footer. We can use this Modal component in any place of our application.
