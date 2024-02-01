import './App.css';
import NavBar from './components/NavBar';
// import Test from './components/Test';
import { Link, useNavigate } from 'react-router-dom';
// import LockIcon from '@mui/icons-material/Lock';

import HomeImgLetsVote from './resources//unsplash_LA1VawaCjjI.svg'



import data from './resources/data'
import Footer from './components/Footer';
import { useEffect } from 'react';
import axios from 'axios';

const features = data.features
const steps = data.steps

function App() {
  const navigate = useNavigate()


  useEffect(() => {
    const token = {token: window.localStorage.getItem("electionUserToken")}
    if (token.token !== null) {
      const homeSelector = async () => {
        console.log(window.localStorage.getItem("electionUserToken"));
      const res = await axios.post('http://localhost:5000/api/validateToken', {token: await window.localStorage.getItem("electionUserToken")})
      console.log(res.data.message);
      if (res.data.message === "Authorized") {
        navigate('/home')
      }
    }
    homeSelector()
  }
  }, []);

  return (
    <div className=' max-w-[1900px] m-auto'>
      <div className="bg-gray-950 flex text-stone-200 h-screen">
        <div className='h-screen hidden w-1/3 md:block' style={{backgroundImage: `url(${HomeImgLetsVote})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
        <div className='lg:w-4/6 mr-5'>
          <NavBar/>
          <br/>
          <br/>
          <div className=' sm:w-screen sm:flex sm:justify-center lg:w-auto lg:items-center lg:h-2/3'>
            <div className='m-5'>
              <p className='text-white text-4xl xl:text-5xl font-medium'>Be a part of decision..</p>
              <p className=' text-blue-600 text-8xl xl:text-9xl font-semibold'>Vote Today!</p>
              <br/>
              <div className=' text-center flex flex-col gap-4 m-5 lg:flex-row'>
                <Link to={'/signup'} className='bg-blue-700 px-10 py-3 rounded-xl cursor-pointer select-none transition-all hover:bg-blue-500 font-semibold'>REGISTER</Link>
                <a href='#readMore' className='bg-blue-700 px-10 py-3 rounded-xl cursor-pointer select-none transition-all hover:bg-blue-500 font-semibold'>READ MORE</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='readMore' className='relative h-screen bg-white p-4 flex flex-col justify-center lg:flex-row'>
        <h1 className=' text-4xl lg:text-8xl lg:w-0 lg:rotate-[270deg] lg:absolute lg:left-1/4 lg:top-2/3'>Features</h1>
        <hr className='GlitchedBorder border-blue-700 border-2 w-36 lg:rotate-90 lg:w-2/4 lg:absolute lg:left-16 lg:top-2/4'/>
        <div className='flex flex-col gap-5 justify-center '>
          {features.map( (item) =>
            <div className='flex mt-5 justify-start gap-3 items-center'>
              <div className=' w-10 h-10' style={{ backgroundImage: `url(${item.img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></div>
              <p className=' text-xl font-semibold'>{item.desc}</p>
            </div>
          )}
        </div>
      </div>

      <div id='about' className='relative h-screen bg-blue-900 text-white p-4 flex flex-col justify-center lg:flex-row'>
        <h1 className=' text-4xl lg:text-8xl lg:w-0 lg:rotate-90 lg:absolute lg:left-1/4 lg:top-1/4'>About</h1>
        <hr className='border-white border-2 w-32 lg:rotate-90 lg:w-2/5 lg:absolute lg:left-0 lg:top-2/4'/>
        <div className='flex flex-col text-2xl lg:ml-10 gap-5 justify-center lg:w-2/5'>
          An online voting system that will replace the
          old ballot system or paper system. Over the time
          we have utilized the required technology in every
          sector to improve efficiency and save the extra
          resources. But the voting system is still very
          expensive and requires a bigger workforce.
          The system is slower and still not completely
          tamper proof. We bring the system that is safe,
          reliable and solve the modern issues like higher
          reachability of the booth, crowd free voting,
          inexpensive, faster results and others.
        </div>
      </div>

      <div id='footer' className='h-screen bg-white flex flex-col justify-center items-center p-5'>
        <div>
          <p className='text-3xl md:text-6xl lg:text-8xl font-semibold'>Follow these easy steps</p>
          <hr className='border-blue-700 border-2 w-2/3'/>
        </div>
        <div className='w-80 md:w-auto mt-20'>
            {steps.map(item => <div className='flex mt-5 justify-start items-center gap-3'>
              <div className=' w-10 h-10' style={{ backgroundImage: `url(${item.img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></div>
              <p className=' text-xl font-semibold'>{item.desc}</p>
            </div>)}
        </div>
      </div>

      <Footer/>


    </div>
  );
}

export default App;
