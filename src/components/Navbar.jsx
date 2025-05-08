import {NavLink} from 'react-router-dom'
import '../index.css'

export default function Navbar(){
    return(
        <nav>
            <p>Header</p>
            <div className="menu">
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </div>
        </nav>
    )
}