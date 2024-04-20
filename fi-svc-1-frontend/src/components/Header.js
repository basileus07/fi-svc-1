import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                        {/* Use Link to navigate to home route */}
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Transaction Input
                        </Link>
                    </Button>
                    {/* Use Link to navigate to insights route */}
                    <Button color="inherit">
                        <Link to="/insights" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Insights
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
