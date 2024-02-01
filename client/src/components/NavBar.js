import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userPic from '../resources/userPic.png'
import '../resources/styles/userSecTransitions.css'

import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import Logo from '../resources/logo3.png'
import axios from 'axios';

function NavBar(props) {

  const navigate = useNavigate()
  const [userSecClicked, setUserSecClicked] = useState(false)

  const logoutHandler = () => {
    window.localStorage.removeItem("electionUserToken")
    navigate('/login')
  }

  const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
        const token = window.localStorage.getItem("electionUserToken")
        if(token){
        // console.log(token);
        try {
            const response = await axios.get('http://localhost:5000/api/user', {
              headers: {
                  'token': `${token}`
              }});
              setUser(response.data.userClaims)
              console.log(response.data.userClaims); // Handle success
          } catch (error) {
            console.error(error); // Handle error
          }
        }
      }
        fetchUserData()
    }, []);


  if (user) {
    return (
      <div className='fixed w-full top-0 pt-2 bg-black'>
        <div className='flex justify-around gap-3 my-3 lg:justify-even flex-col sm:hidden'>
          <div className='flex items-center justify-around'>
            <Link to={'/home'}><img className='w-10 h-10' src={Logo} alt=''/></Link>
            <div className='flex gap-3'>
              <div className='select-none'>Organizations</div>
              {/* <div className='select-none'>About</div> */}
            </div>
            <div>
              { userSecClicked ? <HighlightOffIcon onClick={() => setUserSecClicked(!userSecClicked)} style={{fontSize: '36px'}} className='rounded-full h-9 w-9 hover:border-2 border-blue-500 cursor-pointer'/> :
              <img onClick={() => setUserSecClicked(!userSecClicked)} src={userPic} alt='userPic' className='rounded-full w-9 h-9 hover:border-2 border-blue-500 cursor-pointer'/>}
              <div className={`userSecContainer ${userSecClicked ? ' w-screen opacity-100' : 'w-0 opacity-0'}`}>
                <div className='flex flex-col gap-5'>
                  <div className='flex justify-center flex-col items-center text-2xl'>
                    <img onClick={() => setUserSecClicked(!userSecClicked)} src={userPic} alt='userPic' className='rounded-full w-20 h-20 hover:border-2 border-blue-500 cursor-pointer'/>
                    <p>{user.username}</p>
                  </div>
                  <div className='mx-5 flex justify-center flex-col text-center items-center gap-2 text-xl'>
                    <p className='cursor-pointer bg-slate-900 w-[100%] flex gap-2 items-center justify-center text-white py-2'><DarkModeIcon/><p>darkmode</p></p>
                    <p className='cursor-pointer bg-slate-900 w-[100%] flex gap-2 items-center justify-center text-white py-2'><SettingsIcon/><p>settings</p></p>
                    <p className='cursor-pointer bg-slate-900 hover:bg-blue-600 transition ease-in-out delay-100 w-[100%] flex gap-2 items-center justify-center text-blue-500 hover:text-white py-2' onClick={() => navigate('/addOrg')}><p>YOUR ORGANIZATIONS</p></p>
                    <p className='cursor-pointer bg-slate-900 w-[100%] flex gap-2 items-center justify-center text-white py-2' onClick={logoutHandler}><LogoutIcon/><p>Log Out</p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <input className='border-none w-[calc(100%-50px)] h-10 bg-slate-700 text-white font-semibold px-2 focus:outline-none rounded-l-xl' placeholder='what are you looking for ?'/>
            <p className='bg-blue-500 h-10 w-10 flex justify-center items-center rounded-r-xl cursor-pointer'><SearchIcon/></p>
          </div>
        </div>

      <div className='justify-around items-center gap-3 my-3 lg:justify-even hidden sm:flex'>
        <Link to={'/home'}><img className='w-10 h-10' src={Logo} alt="logo"/></Link>
        <div className='flex items-center w-[50%] justify-center'>
          <input className='border-none w-[100%] h-10 bg-slate-700 text-white font-semibold px-2 focus:outline-none rounded-l-xl' placeholder='what are you looking for ?'/>
          <p className='bg-blue-500 h-10 w-10 flex justify-center items-center rounded-r-xl cursor-pointer'><SearchIcon/></p>
        </div>
        <div className='flex'>
          <Link to="/"><p className='py-1 px-5 cursor-pointer rounded-md select-none transition-all hover:bg-slate-900'>Home</p></Link>
          {/* <a href="#about" className='py-1 px-5 cursor-pointer rounded-md select-none transition-all hover:bg-slate-900'>About</a> */}
          {/* <div className='py-1 px-5 cursor-pointer rounded-md select-none transition-all hover:bg-slate-900'>Contact</div> */}
        </div>
        <div>
        { userSecClicked ? <HighlightOffIcon onClick={() => setUserSecClicked(!userSecClicked)} style={{fontSize: '36px'}} className='rounded-full h-9 w-9 hover:border-2 border-blue-500 cursor-pointer'/> :
          <img onClick={() => setUserSecClicked(!userSecClicked)} src={userPic} alt='userPic' className='rounded-full w-9 h-9 hover:border-2 border-blue-500 cursor-pointer'/>}
          <div className={`userSecContainer ${userSecClicked ? ' w-[300px] opacity-100' : 'w-0 opacity-0'}`}>
            <div className={`flex flex-col gap-5`}>
              <div className='flex justify-center flex-col items-center text-2xl'>
                <img onClick={() => setUserSecClicked(!userSecClicked)} src={userPic} alt='userPic' className='rounded-full w-20 h-20 hover:border-2 border-blue-500 cursor-pointer'/>
                <p>{user.username}</p>
              </div>
              <div className='mx-5 flex justify-center flex-col text-center items-center gap-2 text-xl'>
                <Link className='cursor-pointer bg-slate-900 hover:bg-slate-800 transition ease-in-out delay-100 w-[100%]' to={'/profile'}><p className='flex gap-2 items-center justify-center text-white py-2'><AccountCircleIcon/><p>visit profile</p></p></Link>
                <p className='cursor-pointer bg-slate-900 hover:bg-slate-800 transition ease-in-out delay-100 w-[100%] flex gap-2 items-center justify-center text-white py-2'><DarkModeIcon/><p>darkmode</p></p>
                <p className='cursor-pointer bg-slate-900 hover:bg-slate-800 transition ease-in-out delay-100 w-[100%] flex gap-2 items-center justify-center text-white py-2'><SettingsIcon/><p>settings</p></p>
                <p className='cursor-pointer bg-slate-900 hover:bg-blue-600 transition ease-in-out delay-100 w-[100%] flex gap-2 items-center justify-center text-blue-500 hover:text-white py-2' onClick={() => navigate('/addOrg')}><p>YOUR ORGANIZATIONS</p></p>
                <p className='cursor-pointer  bg-slate-900 hover:bg-slate-800 transition ease-in-out delay-100 w-[100%] flex gap-2 items-center justify-center text-red-600 py-2' onClick={logoutHandler}><LogoutIcon/><p>Log Out</p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
  else{
    return (
      <div className='flex justify-around gap-3 my-3 lg:justify-end'>
          <a href="#about" className='py-1 px-5 cursor-pointer rounded-md select-none transition-all hover:bg-slate-900'>About</a>
          <div className='py-1 px-5 cursor-pointer rounded-md select-none transition-all hover:bg-slate-900'>Contact</div>
          <Link to={'/login'} className=' bg-blue-700 py-1 px-5 rounded-md cursor-pointer select-none transition-all hover:bg-blue-500'>Login</Link>
      </div>
    )
  }
}

export default NavBar