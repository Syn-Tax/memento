import React from 'react';
import { useTransition, animated } from 'react-spring';
import MenuIcon from '@material-ui/icons/Menu';
import NavMenu from './NavMenu';
import { Box, IconButton } from '@material-ui/core';
import '../Css/tailwind.css';

function NavbarToggle(props) {
    const [showMenu, setShowMenu] = React.useState(false)


    const menuTransitions = useTransition(showMenu, {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })

    return (
        <nav>
            <div style={{paddingTop: "5%", zIndex: 1}}>
                <Box boxShadow={3} width={50} style={{ borderBottomRightRadius: "50%", borderTopRightRadius: "50%", position: 'fixed', backgroundColor: "white" }}>
                    <IconButton>
                        <MenuIcon onClick={() => {setShowMenu(!showMenu)}} />
                    </IconButton>
                </Box>
            </div>

            { showMenu && <div className="fixed bg-opacity-0 top-0 right-0 w-3/4 h-full z-50 p-3" onClick={() => setShowMenu(false)}></div> }

            { menuTransitions((prop, item, key) =>
                item &&
                <animated.div
                    key={key}
                    style={prop}
                    className="fixed bg-opacity-0 top-0 left-0 w-1/4 h-full z-50 p-3"
                >
                    <NavMenu closeMenu={() => setShowMenu(false)} lists={props.lists} />
                </animated.div>
            )}
        </nav>
    );
}

export default NavbarToggle;