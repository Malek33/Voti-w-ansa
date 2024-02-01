import React, {useState} from 'react'
import axios from 'axios'

import doll from '../resources/registerImg.png'
import { Link, useNavigate } from 'react-router-dom'

import { useSnapshot } from "valtio";
import state from "../store";


function Signup() {

  const [user, setUser] = useState({
    username: "",
    birthdate: "",
    email: "",
    phoneNumb: "",
    password: "",
    rePassword: "",
    cin: "",
  })

  const [submissionError, setSubmissionError] = useState("")

  const handlePaste = (event) => {
    event.preventDefault();
  };

  const handleCopy = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate()

  const [activeInput, setActiveInput] = useState({
    username: false,
    birthdate: false,
    email: false,
    phoneNumb: false,
    password: false,
    rePassword: false,
    cin: false,
  })

  let formValidators = {
    username: true,
    birthdate: true,
    email: false,
    phoneNumb: false,
    password: false,
    rePassword: false,
    cin: false,
  };

  const phoneVerifier = () => {
    for (let i = 0; i < user.phoneNumb.length; i++) {
      if (!(user.phoneNumb[i] in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])) {
        return false
      }
    }
    return true
  }

  const cinVerifier = () => {
    for (let i = 0; i < user.cin.length; i++) {
      if (!(user.cin[i] in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])) {
        return false
      }
    }
    return true
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

  if (user.rePassword === "" || user.rePassword !== user.password) formValidators.rePassword = false;
  else formValidators.rePassword = true;

  if (user.phoneNumb === "" || (user.phoneNumb.length !== 8 && !phoneVerifier())) formValidators.phoneNumb = false;
  else formValidators.phoneNumb = true;

  if (user.cin === "" || (user.cin.length !== 8 && !phoneVerifier())) formValidators.cin = false;
  else formValidators.cin = true;

  if (user.email === "" || !emailVerifier()) formValidators.email = false;
  else formValidators.email = true;


  const signupHandler = async () => {
    if((formValidators.username) && (formValidators.birthdate) && (formValidators.cin) && (formValidators.email) && (formValidators.password) && (formValidators.rePassword) && (formValidators.phoneNumb)){
      try {
        const response = await axios.post('http://localhost:5000/api/user', user, {
          headers: {
              'Content-Type': 'application/json'
          }});
          console.log(response.data); // Handle success
          localStorage.setItem('electionUserToken', response.data.user.token);
          // state.user = response.data.user
          navigate('/profile')
          setSubmissionError("")
      } catch (error) {
        setSubmissionError(error.response.data.error)
        console.error(error); // Handle error
      }
    }else{
      console.log(formValidators);
      setSubmissionError('Please complete the full registration form')
    }
    // console.log(formValidators);
  }

  return (
    <div className='bg-gray-950 h-screen flex justify-evenly md:p-10 items-center'>
      <div className='hidden md:block'>
        <img src={doll} alt='img' />
      </div>
      <div className='w-screen px-8 flex flex-col gap-5 max-w-md lg:max-w-xl xl:max-w-2xl'>
        <p style={{textShadow: 'rgb(59 130 246) 1px 1px 2px'}} className='text-blue-700 text-3xl md:text-4xl lg:text-5xl xl:text-7xl xl:mb-3 font-bold'>Registration form</p>
        <p className='text-white flex gap-2 mt-[-15px] ml-2'>already a member? <Link to={'/login'} className='text-blue-500 underline font-semibold'>Login Here</Link></p>

        <form className='flex flex-col gap-3' onSubmit={signupHandler}>

          <div className='relative' id='username'>

            <label htmlFor="usernameInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            ${activeInput.username ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 translate-y-1 text-lg"} `} >username</label>
            <input
              id="usernameInput" name='username'
              className='outline-none pt-[5px] w-full h-11 px-3 rounded-lg z-0'
              type='text' onChange={(e) => setUser({...user, username: e.target.value})}
              onFocus={() => setActiveInput({ ...user, username: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, username: false }) : ''}/>
          </div>

          <div className='relative' id='birth'>
            <label htmlFor="birthInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2
            ${activeInput.birthdate ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 -translate-y-[1px] text-sm"} `} >birth date</label>
            <input
              id="birthInput" name='birthDate'
              className='outline-none pt-[5px] w-full h-11 px-3 rounded-lg z-0'
              type='date' onChange={(e) => {setUser({...user, birthdate: e.target.value})
            console.log(e.target.value);}}
              onFocus={() => setActiveInput({ ...user, birthdate: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, birthdate: false }) : ''}
              />
          </div>

          <div className='relative' id='email'>
            {user.email === "" || emailVerifier() ?
            <label htmlFor="emailInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            ${activeInput.email ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 translate-y-1 text-lg"} `} >email</label> :
            <label htmlFor="emailInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            text-red-500 -translate-y-[3px] font-semibold text-sm`} >email</label>}
            <input
              id="emailInput" name='email'
              className='outline-none pt-[2px] w-full h-11 px-3 rounded-lg z-0 text-lg'
              type='text' onChange={(e) => setUser({...user, email: e.target.value})}
              onFocus={() => setActiveInput({ ...user, email: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, email: false }) : ''}/>
          </div>

          <div className='relative' id='phone'>
            {
              user.phoneNumb === "" || (user.phoneNumb.length === 8 && phoneVerifier()) ?
              <label htmlFor="phoneInput"
              className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
              ${activeInput.phoneNumb ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 translate-y-1 text-lg"} `} >phone</label> :
              <label htmlFor="phoneInput"
              className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
              text-red-500 -translate-y-[3px] font-semibold text-sm `} >phone</label>
            }
            <input
              id="phoneInput" name='phone'
              className='outline-none pt-[5px] w-full h-11 px-3 rounded-lg z-0'
              type='text' onChange={(e) => setUser({...user, phoneNumb: e.target.value})}
              onFocus={() => setActiveInput({ ...user, phoneNumb: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, phoneNumb: false }) : ''}/>
          </div>

          <div className='relative' id='password'>
            {user.password === "" || user.password.length > 7 ?
            <label htmlFor="passwordInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            ${activeInput.password ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 translate-y-1 text-lg"} `} >password</label> :
            <label htmlFor="passwordInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            text-red-500 -translate-y-[3px] font-semibold text-sm`} >password</label>
          }
            <input
              id="passwordInput" name='password' onPaste={handlePaste} onCopy={handleCopy}
              className='outline-none pt-[5px] w-full h-11 px-3 rounded-lg z-0'
              type='password' onChange={(e) => setUser({...user, password: e.target.value})}
              onFocus={() => setActiveInput({ ...user, password: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, password: false }) : ''}/>
          </div>
          <div className='relative' id='rePassword'>
            {user.password === user.rePassword ?
            <label htmlFor="rePasswordInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            ${activeInput.rePassword ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 translate-y-1 text-lg"} `} >re-enter password</label>
            :
            <label htmlFor="rePasswordInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            ${activeInput.rePassword ? "text-red-500 -translate-y-[3px] font-semibold text-sm" : "text-red-500 translate-y-1 text-lg"} `} >passwords does not match</label>
          }
            <input
              id="rePasswordInput" name='rePassword' onPaste={handlePaste} onCopy={handleCopy}
              className='outline-none pt-[5px] w-full h-11 px-3 rounded-lg z-0'
              type='password' onChange={(e) => setUser({...user, rePassword: e.target.value})}
              onFocus={() => setActiveInput({ ...user, rePassword: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, rePassword: false }) : ''}/>
          </div>

          <div className='relative' id='cin'>
            <label htmlFor="cinInput"
            className={`absolute left-0 transform transition-transform ease-in-out duration-150 translate-x-2 cursor-text
            ${activeInput.cin ? "text-blue-500 -translate-y-[3px] font-semibold text-sm" : "text-gray-400 translate-y-1 text-lg"} `} >cin</label>
            <input
              id="cinInput" name='cin'
              className='outline-none pt-[5px] w-full h-11 px-3 rounded-lg z-0'
              type='text' onChange={(e) => setUser({...user, cin: e.target.value})}
              onFocus={() => setActiveInput({ ...user, cin: true })}
              onBlur={(e) => e.target.value === '' ? setActiveInput({ ...activeInput, cin: false }) : ''}/>
          </div>

          <div className='max-h-24 overflow-x-scroll no-scrollbar'>
            <p className={`text-red-500 ${user.email === "" || emailVerifier() ? 'hidden' : 'block'}`}>Email is not valid</p>

            <p className={`text-red-500 ${user.phoneNumb === "" || user.phoneNumb.length === 8 ? 'hidden' :  'block'}`}>Phone number must be 8 digits</p>
            <p className={`text-red-500 ${user.phoneNumb === "" || phoneVerifier() ? 'hidden' : 'block'}`}>Phone Number Error: Numbers only accepted</p>

            <p className={`text-red-500 ${user.password === "" || user.password.length > 7 ? 'hidden' : 'block'}`}>Password must be at least 8 characters</p>
            <p className={`text-red-500 ${user.password === "" || user.rePassword === user.password ? 'hidden' : 'block'}`}>Passwords does not match</p>

            <p className={`text-red-500 ${user.cin === "" || user.cin.length === 8 ? 'hidden' :  'block'}`}>CIN number must be 8 digits</p>
            <p className={`text-red-500 ${user.cin === "" || cinVerifier() ? 'hidden' : 'block'}`}>CIN Error: Numbers only accepted</p>

            <p className={`text-red-500 ${submissionError === "" ? 'hidden' : 'block'}`}>{submissionError}</p>
          </div>

          <div className='flex gap-5'>
            <p onClick={signupHandler} className='bg-blue-500 rounded-xl px-5 py-3 w-full transition-all ease-in-out duration-150 border-blue-500 border-4
            text-xl font-semibold text-white hover:border-blue-500 hover:bg-white hover:text-blue-500 text-center cursor-pointer'
             >Submit</p>
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

export default Signup