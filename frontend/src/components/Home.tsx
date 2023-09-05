import 'react';
import { Navbar } from './Navbar';
import Box from "@mui/material/Box";
import { ThemeProvider, useTheme } from '@mui/material/styles';

export function Home() {
    const defaultTheme = useTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box 
                sx={{ 
                    width: '100vw', 
                    height: '100vh', 
                    backgroundColor: (theme) => theme.palette.background.default
                }}
            >
                <Navbar />
            </Box>
        </ThemeProvider>
    )
}
