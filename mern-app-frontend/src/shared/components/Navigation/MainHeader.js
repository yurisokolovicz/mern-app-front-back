import React from 'react';

import './MainHeader.css';

const MainHeader = mainNavigation => {
    return <header className="main-header">{mainNavigation.children}</header>;
};

export default MainHeader;

// No componente MainHeader, o children é renderizado dentro de um elemento header. Portanto, a prop chain ocorre quando MainNavigation passa seus elementos filhos JSX para MainHeader como a propriedade children, que é então renderizada em MainHeader como o conteúdo do elemento header.
