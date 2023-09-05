import 'react'
import { useContext } from 'react'
import { UserContext } from './SignUp'
import { Navbar } from './Navbar';

export function Home() {
    const user = useContext(UserContext)

    return (
       <Navbar />
    )
}