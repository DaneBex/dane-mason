import 'react'
import { useContext } from 'react'
import { UserContext } from './SignUp'
import Box from '@mui/material/Box';

export function Home() {
    const user = useContext(UserContext)

    return (
        <Box>
            {user?.username}
        </Box>
    )
}