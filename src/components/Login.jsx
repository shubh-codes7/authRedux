import {useDispatch} from 'react-redux'
import {setProfileDetails} from '../slices/profileSlice.js'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


export default function Login(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [status, setStatus] = useState('') //success || err
    const [message, setMessage] = useState('')

    const [profile, setProfile] = useState({
        fname: '',
        password: ''
    })

    function handleChange(e){
        const {name, value} = e.target
        setProfile(prevProfile => ({...prevProfile, [name] : value}))
    }

    function handleLogin(e){
        e.preventDefault()

        const {fname, password} = profile

        if(fname === '' || password === ''){
            setStatus("err")
            setMessage("All fields are required")

            return;
        }

        let signupUsers = JSON.parse(localStorage.getItem("users"))

        let user = signupUsers.filter(user => user.firstName === fname)
        
        if(user.length === 0){
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: fname,
                  password: password,
                })
              })
              .then(res => {
                  setStatus('success')
                  setMessage("Form submitted successfully!") 
                  return res.json()
            })
              .then(data => {
                if(data?.id){
                    dispatch(setProfileDetails(data));
                    localStorage.setItem("userId", data.id);
                    sessionStorage.setItem("accessToken", data.accessToken);
                    console.log(data)
                    navigate('/profile');
                }else {
                    setStatus('err')
                    setMessage("Invalid credentials")
                }
            })
            .catch(err => {
                console.error(err);
                setStatus('err')
                setMessage("Something went wrong")
            });
        }else{
            if(user[0].password === password){
                setStatus('success')
                setMessage("Form submitted successfully!")
            dispatch(setProfileDetails({
                firstName: fname,
                email: user[0].email,
                password: password
            }))
            navigate('/profile');
            return
            }else{
                setStatus('err')
                setMessage("Invalid credentials")
            }
        }       
    }

    return(
        <div className="signup">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Full Name" value={profile.fname} name="fname" onChange={handleChange} />
                <input type="password" placeholder="Password" value={profile.password}  name="password" onChange={handleChange} />
                <p className={status} >{message}</p>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}