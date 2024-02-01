import React, {useEffect, useState} from 'react'
import axios from "axios"

import doll from '../resources/login.png'
import { Link, useNavigate } from 'react-router-dom'


import eyeIcon from '../resources/eyeIcon.png'
import ClosedEyeIcon from '../resources/closedEyeIcon.png'



function Login() {

  const navigate = useNavigate()

  const [passwordType, setPasswordType] = useState(true)
  const [token, setToken] = useState("")
  const [submissionError, setSubmissionError] = useState("")

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [activeInput, setActiveInput] = useState({
    email: false,
    password: false,
  })

  let formValidators = {
    email: false,
    password: false
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  const handleCopy = (event) => {
    event.preventDefault();
  };

  const loginHandler = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/userin', user);
        console.log(response); // Handle success
        localStorage.setItem('electionUserToken', response.data.user.token);
        console.log(response.data.user.token);
        navigate('/home')
        setSubmissionError("")
    } catch (error) {
      setSubmissionError(error.response.data.error)
      console.error(error); // Handle error
    }
  }

  const emailVerifier = () => {
    let testMail = false
    for (let i = 0; i < user.email.length; i++) {
      if (user.email[i] === "@") {
        testMail = true
      }
    }
    return testMail
  }

  if (user.password === "" || user.password.length < 8) formValidators.password = false;
  else formValidators.password = true;

  if (user.email === "" || !emailVerifier()) formValidators.email = false;
  else formValidators.email = true;

  return (
    <div className='bg-gray-950 h-screen flex justify-evenly md:p-10 items-center'>
      <div className='hidden md:block'>
        <img src={doll} alt='img' />
      </div>
      <div className='w-screen px-8 flex flex-col gap-5 max-w-md lg:max-w-xl xl:max-w-2xl'>
        <p style={{textShadow: 'rgb(59 130 246) 1px 1px 2px'}} className='text-blue-700 text-3xl md:text-4xl lg:text-5xl xl:text-7xl xl:mb-3 font-bold'>Login.</p>
        <p className='text-white flex gap-2 mt-[-15px] ml-2'>not a member yet? <Link to={'/signup'} className='text-blue-500 underline font-semibold'>Register Here</Link></p>

        <form className='flex flex-col gap-3' >


          <div className='relative' id='email'>
          {user.email === "" || emailVerifier() ?
            <label htmlFor="emailInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            ${activeInput.email ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 translate-y-1 text-lg"} `} >email</label> :
            <label htmlFor="emailInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2
            text-red-500 -translate-y-[3px] font-semibold text-sm`} >email</label>
          }
            <input
              id="emailInput" name='email' onPaste={handlePaste} onCopy={handleCopy}
              className='outline-none pt-[2px] w-full h-11 px-3 rounded-lg z-0 text-lg'
              type='text' onChange={(e) => setUser({...user, email: e.target.value})}
              onFocus={() => setActiveInput({ ...user, email: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, email: false }) : ''}/>
          </div>

          <div className='relative' id='password'>
          {user.password === "" || user.password.length > 7 ?
            <label htmlFor="passwordInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            ${activeInput.password ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 translate-y-1 text-lg"} `} >password</label> :
            <label htmlFor="passwordInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            text-red-500 -translate-y-[3px] font-semibold text-sm`} >password</label>}
            <input
              id="passwordInput" name='password' onPaste={handlePaste} onCopy={handleCopy}
              className='outline-none pt-[5px] w-full h-11 px-3 rounded-lg z-0'
              type={passwordType ? 'password' : 'text'} onChange={(e) => setUser({...user, password: e.target.value})}
              onFocus={() => setActiveInput({ ...user, password: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, password: false }) : ''}/>
              <div style={{ backgroundImage: `url(${ passwordType ? eyeIcon : ClosedEyeIcon})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain'}}
                className='w-7 h-7 absolute top-2 right-2 cursor-pointer rounded-full opacity-50 hover:opacity-100 transition-all ease-in-out delay-100'
                onClick={() => setPasswordType(!passwordType)}></div>
          </div>

          <div className='max-h-24 overflow-x-scroll no-scrollbar'>
            <p className={`text-red-500 ${user.email === "" || emailVerifier() ? 'hidden' : 'block'}`}>Email is not valid</p>
            <p className={`text-red-500 ${user.password === "" || user.password.length > 7 ? 'hidden' : 'block'}`}>Password must be at least 8 characters</p>
            <p className={`text-red-500 ${submissionError === "" ? 'hidden' : 'block'}`}>{submissionError}</p>
          </div>

          <div className='text-center cursor-pointer flex gap-5'>
            <p onClick={loginHandler} className='bg-blue-500 rounded-xl px-5 py-3 w-full transition-all ease-in-out duration-150 border-blue-500 border-4
              text-xl font-semibold text-white hover:border-blue-500 hover:bg-white hover:text-blue-500 '>Submit
            </p>
            <Link className='w-full text-center' to={'/'}>
              <p className='bg-white rounded-xl px-5 py-3 w-full transition-all ease-in-out duration-150 border-blue-500 border-4
                text-xl font-semibold text-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white'>Go Back
              </p>
            </Link>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Login