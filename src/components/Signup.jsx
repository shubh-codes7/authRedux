import {useDispatch} from 'react-redux'
import {setProfileDetails} from '../slices/profileSlice.js'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


export default function Signup(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [status, setStatus] = useState('') //success || err
    const [message, setMessage] = useState('')

    const [profile, setProfile] = useState({
        firstName: '',
        email: '',
        password: '',
        confirmPwd: ''
    })

    function handleChange(e){
        const {name, value} = e.target
        setProfile(prevProfile => ({...prevProfile, [name] : value}))
    }

    function handleSubmit(e){
        e.preventDefault()

        const {firstName, email, password, confirmPwd} = profile

        if(firstName === '' || email === '' || password === '' || confirmPwd === ''){
            setStatus('err')
            setMessage("All fields are required")
            return;
        }

        if(password.length < 8){
            setStatus('err')
            setMessage("Password should be more 8 characters")
            return;
        }
        
        if(password !== confirmPwd){
            setStatus('err')
            setMessage("Passwords do not match")
            return;
        }

        dispatch(setProfileDetails(profile))

        setStatus('success')
        setMessage("Form submitted successfully!")

        const existingUsers = JSON.parse(localStorage.getItem("users")) || []
        const updatedUsers = JSON.stringify([...existingUsers, profile])
        localStorage.setItem('users', updatedUsers)
        sessionStorage.setItem('accessToken', "alskdfj;alsyu")

        setProfile({
            firstName: '',
            email: '',
            password: '',
            confirmPwd: ''
        })

        navigate('/profile')

    }



    return(
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name" value={profile.fname} name="firstName" onChange={handleChange} />
                <input type="email" placeholder="Email" value={profile.email}   name="email" onChange={handleChange} />
                <input type="password" placeholder="Password" value={profile.password}  name="password" onChange={handleChange} />
                <input type="password" placeholder="Confirm Password" value={profile.confirmPwd}  name="confirmPwd" onChange={handleChange} />
                <p className={status}>{message}</p>
                <button type="submit">Signup</button>
                <button type="button" onClick={()=>navigate('/')}>Go to Login↗️</button>
            </form>
        </div>
    )
}