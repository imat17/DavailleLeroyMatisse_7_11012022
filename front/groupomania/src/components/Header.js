import React from 'react';
import Logo from '../media/icons/icon-left-font-min-nobg.png';

const Header = () => {
    return (
        <header>
            <div className='container__img'>
					<img src={Logo} alt='logo groupomania' />
			</div>
        </header>
    );
};

export default Header;