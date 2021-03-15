import MenuIcon from '@material-ui/icons/Menu';
import { Box, IconButton } from '@material-ui/core';

function NavbarToggle() {
    return (
        <div style={{paddingTop: "5%", zIndex: 1}}>
            <Box boxShadow={3} width={50} style={{ borderBottomRightRadius: "50%", borderTopRightRadius: "50%", position: 'fixed', backgroundColor: "white"}}>
                <IconButton>
                    <MenuIcon />
                </IconButton>
            </Box>
        </div>
    );
}

export default NavbarToggle;