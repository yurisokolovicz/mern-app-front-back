import React from 'react';

import './Avatar.css';

const Avatar = UIprops => {
    return (
        <div className={`avatar ${UIprops.className}`} style={UIprops.style}>
            <img src={UIprops.image} alt={UIprops.alt} style={{ width: UIprops.width, height: UIprops.width }} />
        </div>
    );
};

export default Avatar;

// UIprops = UsersIntem styling props
