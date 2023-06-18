import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = props => {
    // Using drawerIsOpen to just render the <SideDrawer> component when the drawer (menu lateral) is open. Conditional rendering.
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">yuPlaces App</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;

// Link is a React component that allows you to create links in your app. It allows you to create links that are handled by the router and which don't reload the page but instead update the URL and render the component(s) you configured for that route.

// No componente MainNavigation, o componente MainHeader é renderizado como um elemento filho. A propriedade passada para MainHeader é um conjunto de elementos JSX button, h1 e nav. Esses elementos são passados para MainHeader como uma propriedade especial chamada children.
