import React,{ useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Routes, Route} from 'react-router-dom';
import Pin from './Pin';
import { userQuery } from '../utils/data'
import { Sidebar, UserProfile } from '../components';
import { client } from '../client';
import Logo from '../assets/photo1.png'
import { fetchUser } from '../utils/fetchUser';

const Home = () => {

    const userInfo = fetchUser();
    const [user, setUser] = useState(null); 
    const scrollRef = useRef(null);
    const [toggleSidebar, setToggleSidebar] = useState(false);

    useEffect(() => {
       const query = userQuery(userInfo?.googleId);

       client.fetch(query)
        .then((data) =>{
            setUser(data[0]);
        } )
    }, []);

    useEffect(() => {
       scrollRef.current.scrollTo(0, 0)
    }, [])

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
           <div className='hidden md:flex h-screen flex-initial'>
              <Sidebar user={user && user } />
           </div>
           <div className='flex md:hidden flex-row'>
               <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>

               <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
               <Link to="/">
                   <img src={Logo} alt="" className='w-28' />
                   <h1 className='mt-1 font-bold' style={{marginLeft: '17px'}}    >PhotoPin</h1>
               </Link>
               <Link to={`user-profile/${user?._id}`}>
                   <img src={user?.image} alt="Logo" className='w-20 rounded-full' />
               </Link> 
               </div>
                    {toggleSidebar && (
                        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                            <div className='absolute w-full flex justify-end items-center p-2'>
                                <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false) } />
                            </div>
                            < Sidebar user={user && user } closeToggle={setToggleSidebar} />
                        </div>
                    )}
           </div> 
           <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
               <Routes>
                   <Route path="/user-profile/:userId" element={<UserProfile/>} />
                   <Route path="/*" element={<Pin user={user && user} />} />
               </Routes>

            </div>
        </div>
    )
}

export default Home
