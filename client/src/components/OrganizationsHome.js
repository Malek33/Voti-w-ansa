import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const orgData = [
  {
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },{
    name: "ISIMS",
    logo: "https://isimsf.rnu.tn/useruploads/files/logo_face_book.jpg",
    desc: "isims is a high school that educate computer science"
  },
]


const OrganizationCard = (props) => {
  return <div className='w-80 flex items-center justify-center flex-col h-52 rounded-2xl bg-gray-800 border-gray-800 transition delay-75 ease-out hover:border-blue-500 border-2'>
    <img src={require(`../uploads/org/${props.logo}`)} className='w-16 rounded-xl' alt="logo" />
    <div className='text-center select-none'>
      <h3 className='text-2xl cursor-pointer'>{props.orgName}</h3>
      <p className='text-sm'>{props.orgDesc}</p>
    </div>
      {/* <i class="fa-solid fa-magnifying-glass"></i> */}
    <p className='bg-blue-500 px-4 py-1 rounded-2xl mt-3 cursor-pointer hover:bg-blue-600 transition delay-75 ease-in-out'>Apply</p>
  </div>
}

function OrganizationsHome() {
  const navigate = useNavigate()

  const [data, setData] = useState([])

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

  useEffect(() => {
      const func = async () => {
        const res = await axios.get('http://localhost:5000/api/organizations')
        setData(res.data)
        console.log(res.data);
      }
      func()
  }, []);

  return (
    <div className='text-white mt-36 sm:mt-20'>
      <NavBar navType={"logged"}/>
      <div className='mt-10 mx-5 flex gap-3 flex-wrap justify-center'>
        {data.map( item  => <OrganizationCard key={item._id} logo={item.img} orgName={item.name} orgDesc={item.desc} />)}
      </div>
    </div>
  )
}

export default OrganizationsHome