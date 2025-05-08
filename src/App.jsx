import Navbar from './components/Navbar.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'

import {Routes, Route} from 'react-router-dom'


function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/profile" element={ <Profile /> } />
      </Routes>
    </div>
  )
}

export default App
