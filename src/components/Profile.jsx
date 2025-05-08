import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setProfileDetails} from '../slices/profileSlice.js'

export default function Profile(){

    const token = sessionStorage.getItem('accessToken')

    

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signupProfile = useSelector(state => state.profile)

    const [profile, setProfile] = useState({})
    const [userId, setUserId] = useState(localStorage.getItem("userId"))


    function handleLogout(){
        localStorage.removeItem("userId")
        sessionStorage.removeItem("accessToken")
        setUserId(null)
        setProfile({})
        dispatch(setProfileDetails({
            firstName: '',
            email: '',
            password: '',
            confirmPwd: ''
        }))
        navigate('/')
    }

    useEffect(()=>{
        if(token && userId){
            fetch(`https://dummyjson.com/users/${userId}`)
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.log(err))
        }
        
    }, [userId])


    if (!token) {
        return <h2 style={{ textAlign: 'center', color: 'red', margin:"200px" }}>You are not logged in</h2>
    }   //condtional rendering, If token is not there, user won't see page
    

    return(
        <div className="profile">
            <h2>Profile</h2>
            <div>
                <h3>Full Name : {profile.firstName || signupProfile.firstName}</h3>
                <h3>Email : {profile.email || signupProfile.email} </h3>
                <h3>Password : {profile.password} {signupProfile.password} </h3>
            </div>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
