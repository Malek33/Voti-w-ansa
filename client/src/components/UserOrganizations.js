import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OrgIcon from '../resources/organizationPic.png'
import Popup from 'reactjs-popup'
import NavBar from './NavBar';


const AddUser = (props) => {

  const [submissionError, setSubmissionError] = useState("")

  useEffect(() => {
    console.log('slm');
    const orgsFetch = async () => {
    const token = window.localStorage.getItem("electionUserToken")
    try {
      const response = await axios.get('http://localhost:5000/api/organization', {
        headers: {
          'token': `${token}`
        }
      });
        console.log("org:", response); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  }
  orgsFetch()
  }, [])

  const [orgData, setOrgData] = useState({
    name: "",
    email: "",
    desc: "",
    phone: "",
    adress: "",
    img: "",
  })

  const [img, setImg] = useState(OrgIcon)

  let formValidators = {
    name: true,
    email: true,
    desc: true,
    phone: true,
    adress: true,
    img: true
  };

  const addOrganizationHandler = async (e) => {
    e.preventDefault()
    if((formValidators.name) && (formValidators.email) && (formValidators.desc) && (formValidators.phone) && (formValidators.adress) && (formValidators.img)){

      const formData = new FormData()
      formData.append('name', orgData.name)
      formData.append('email', orgData.email)
      formData.append('desc', orgData.desc)
      formData.append('phone', orgData.phone)
      formData.append('adress', orgData.adress)
      formData.append('orgImg', orgData.img)

      try {
        const response = await axios.post('http://localhost:5000/api/organization', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }});
          console.log(response); // Handle success
          // state.user = response.data.user
          setSubmissionError("")
          props.close()
      } catch (error) {
        setSubmissionError(error.response.data.error)
        console.error(error); // Handle error
      }
    }else{
      console.log(formValidators);
      setSubmissionError('Please complete the fulfill data')
    }
    // console.log(formValidators);
  }

  


  return(
        <div className='flex relative justify-center gap-3 w-[1200px] bg-slate-900 py-32 rounded-xl'>
          <p className='absolute top-[-10px] right-[-10px] text-white cursor-pointer hover:bg-blue-500 bg-blue-600 w-7 h-7 text-center rounded-lg' onClick={() => props.close()}>x</p>
            <div className='cursor-pointer hover:bg-slate-800 rounded-xl flex items-center justify-center w-1/6'>
                <label htmlFor='fileSelector' className='cursor-pointer'><img src={img} className='w-52 h-52  ' alt='logo' /></label>
                <input id='fileSelector' accept=".png, .jpg, .jpeg" name='orgImg' onChange={(e) => {
                  setOrgData({...orgData, img: e.target.files[0]})
                  setImg(URL.createObjectURL(e.target.files[0]))
                  }} className='hidden' type='file' />
                {/* accept="image/*" */}
            </div>
            <div className='w-1/2'>
                <form onSubmit={addOrganizationHandler} className='flex flex-col gap-2'>
                    <input id="orgNameInput" placeholder="Organization's name" name='name' onChange={(e) => setOrgData({...orgData, name: e.target.value})} className='pt-[2px] w-full h-11 px-3 rounded-lg z-0 text-lg border-blue-600 text-black focus:border-4 outline-none' type='text'/>
                    <input id="orgEmailInput" placeholder="Email" name='email' onChange={(e) => setOrgData({...orgData, email: e.target.value})} className='pt-[2px] w-full h-11 px-3 rounded-lg z-0 text-lg border-blue-600 text-black focus:border-4 outline-none' type='text'/>
                    <input id="orgDescriptionInput" placeholder="Description" name='description' onChange={(e) => setOrgData({...orgData, desc: e.target.value})} className='pt-[2px] w-full h-11 px-3 rounded-lg z-0 text-lg border-blue-600 text-black focus:border-4 outline-none' type='text'/>
                    <input id="orgPhoneInput" placeholder="Phone number" name='phone' onChange={(e) => setOrgData({...orgData, phone: e.target.value})} className='pt-[2px] w-full h-11 px-3 rounded-lg z-0 text-lg border-blue-600 text-black focus:border-4 outline-none' type='text'/>
                    <input id="orgAdressInput" placeholder="Physical adress" name='adress' onChange={(e) => setOrgData({...orgData, adress: e.target.value})} className='pt-[2px] w-full h-11 px-3 rounded-lg z-0 text-lg border-blue-600 text-black focus:border-4 outline-none' type='text'/>
                    <div className='flex justify-evenly gap-2 h-10'>
                      <input type='submit' value={'Submit'} className='bg-blue-600 w-full rounded-md cursor-pointer hover:bg-blue-500 text-white' />
                      <input type='reset' value={"Clear form"} className='bg-slate-500 w-full rounded-md cursor-pointer hover:bg-slate-400 text-white' />
                    </div>
                </form>
            </div>
        </div>
    )
}

function UserOrganizations() {

    const navigate = useNavigate()

    useEffect(() => {
        const token = {token: window.localStorage.getItem("electionUserToken")}
        console.log(token);
        if ((token.token !== null) && (token.token !== undefined)) {
          const homeSelector = async () => {
          const res = await axios.post('http://localhost:5000/api/validateToken', {token: await window.localStorage.getItem("electionUserToken")})
          console.log(res.data.message);
          if (res.data.message !== "Authorized") {
            navigate('/')
          }
        }
        homeSelector()
      }else{
        navigate('/')
      }
      }, []);

  return (
    <div className='text-white'>
      <NavBar navType={"logged"}/>
      <div className='flex justify-center items-center h-screen'>
      <Popup trigger={<button className='bg-blue-600 w-60 h-10 rounded-lg'>Add Organization</button>} modal>
        {close => <AddUser close={close}/>}
      </Popup>
      </div>
    </div>
  )
}


export default UserOrganizations