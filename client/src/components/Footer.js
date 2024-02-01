import React from 'react'

import instaIcon from '../resources/instaIcon.png'
import facebookIcon from '../resources/facebookIcon.png'
import twitterIcon from '../resources/twitterIcon.png'
import sendIcon from '../resources/send.png'

function Footer() {
  return (
    <div  className='bg-gray-950 text-white flex flex-col items-center gap-5 sm:flex-row sm:justify-evenly p-5'>
        <div className='flex flex-col gap-3'>
          <div>
            <p className='text-blue-600 font-semibold'>Contact:</p>
            <p>94 181 481</p>
          </div>
          <div>
            <p className='text-blue-600 font-semibold'>Helpline Number:</p>
            <p>54 181 481</p>
          </div>
          <div>
            <p className='text-blue-600 font-semibold'>Email:</p>
            <p>malek.magraoui3@gmail.com</p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex gap-5'>
            <div>
              <p className='text-blue-600 font-semibold underline'>GetIn</p>
              <p>Register</p>
              <p>Login</p>
            </div>
            <div>
              <p className='text-blue-600 font-semibold underline'>Know more</p>
              <p>Features</p>
              <p>About</p>
              <p>Steps</p>
            </div>
            <div>
              <p className='text-blue-600 font-semibold underline'>Follow Us</p>
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
            </div>
          </div>
          <div className='flex justify-center gap-3'>
            <a href='https://twitter.com/malek_maghraoui'><img src={twitterIcon} alt="social"/></a>
            <a href='https://www.facebook.com/profile.php?id=100010002663814'><img src={facebookIcon} alt="social"/></a>
            <a href='https://www.instagram.com/malek_maghraoui/'><img src={instaIcon} alt="social"/></a>
          </div>
        </div>


        <div>
          <form>
            <p className=' font-bold text-lg'>Quick Feedback:</p>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <input placeholder='username' className='text-gray-950 px-2 rounded-md' type='text' />
                <textarea placeholder='feedback' className='text-gray-950 px-2 rounded-md'/>
              </div>
              <div className='flex align-center items-center gap-1 text-xl bg-blue-600 px-2 rounded-lg justify-center py-1'>
                <img src={sendIcon} alt="" />
                <p>Send</p>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Footer