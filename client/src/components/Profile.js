import React, { useEffect, useState } from 'react'

import userPic from '../resources/userPic.png'
import Footer from './Footer'

import NavBar from './NavBar'

// import { useSnapshot } from "valtio";
// import state from "../store";
import axios from 'axios';

function Profile() {
    // const snap = useSnapshot(state)
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUserData = async () => {
        const token = window.localStorage.getItem("electionUserToken")
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
        fetchUserData()
    }, []);

  return (
    <div>
        <div className='text-white'>
            <NavBar/>
        </div>
        <br/>
        <br/>
      <div>
        <div className='w-screen pt-20 flex justify-center flex-col items-center text-white bg-gray-950 gap-10 md:flex-row'>

        <div className='flex flex-col justify-center items-center gap-3'>
            <div>
                <img src={userPic} alt=''/>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <label htmlFor='getFile' className='bg-blue-600 w-full text-center px-4 py-2 rounded-md cursor-pointer hover:bg-blue-400 transition-all delay-100 ease-in-out'>Change profile picture</label>
                <input id='getFile' type='file' className='hidden' />
                <div className='bg-blue-600 w-full text-center px-4 py-2 rounded-md cursor-pointer hover:bg-blue-400 transition-all delay-100 ease-in-out'>Edit Profile</div>
            </div>
        </div>

        <div className='flex flex-col items-center gap-2 md:gap-7 md:text-3xl md:items-start'>
            <div className='flex gap-2 md:flex-col md:gap-0'>
                <p className='text-blue-600 font-bold'>username:</p>
                <p>{user.username}</p>
            </div>
            <div className='flex flex-col gap-2 md:flex-row md:gap-10'>
                <div className='flex gap-2 md:flex-col md:gap-0'>
                    <p className='text-blue-600 font-bold'>birth date:</p>
                    <p>{ user.birthdate ? user.birthdate.substr(0, 10) : null}</p>
                </div>
                <div className='flex gap-2 md:flex-col md:gap-0'>
                    <p className='text-blue-600 font-bold'>Mobile Number:</p>
                    <p>{user.phoneNumb}</p>
                </div>
            </div>
            <div className='flex gap-2 md:flex-col md:gap-0'>
                <p className='text-blue-600 font-bold'>email:</p>
                <p>{user.email}</p>
            </div>
            <div className='flex gap-2 md:flex-col md:gap-0'>
                <p className='text-blue-600 font-bold'>cin:</p>
                <p>{!user.cin ? "not valid" : user.cin}</p>
            </div>
            <div className='flex gap-2 md:flex-col md:gap-0'>
                <p className='text-blue-600 font-bold'>Adress:</p>
                <p>{!user.adress ? "not valid" : user.adress}</p>
            </div>
            <div className='flex gap-4 md:gap-10'>
                <div className='flex gap-2'>
                    <p className='text-blue-600 font-bold'>Eligible:</p>
                    <p>True</p>
                </div>
                <div className='flex gap-2'>
                    {/* <p className='text-blue-600 font-bold'>{snap.user.isVerified}</p> */}
                    <p>True</p>
                </div>
            </div>
        </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* <Footer/> */}
    </div>
    </div>
  )
}

export default Profile