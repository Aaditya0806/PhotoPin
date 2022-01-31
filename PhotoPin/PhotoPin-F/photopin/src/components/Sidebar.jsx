import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
// import { IoIosArrowForward } from 'react-icons/io'

import logo from '../assets/photo1.png'
// import { categories } from '../utils/data';

const isNotActiveStyle= 'flex item-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ';
const isActiveStyle= 'flex item-center px-5 gap-3 font-extrabold border hover:text-black transition-all duration-200 ease-in-out capitalize ';


const Sidebar = ( {user, closeToggle} ) => { 

    const handleCloseSidebar = () =>{
        if(closeToggle) closeToggle(false);
    }


    const categories = [
        {
          name: 'cars',
          image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          // image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
        },
        {
          name: 'fitness',
          image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
        },
        {
          name: 'wallpaper',
          image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
        },
        {
          name: 'websites',
          image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
        },
        
        {
          name: 'food',
          image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
        },
        {
          name: 'nature',
          image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
        },
        {
          name: 'art',
          image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
        }, {
          name: 'travel',
          image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
        },
        {
          name: 'anime',
          image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
        }, {
          name: 'animals',
          image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
        }, 
        {
          name: 'others',
          image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
        },
      ];



    return (
        <div className=' flex flex-col justify-between bg-gray-65 h-full overflow-y-scrikk min-w-210 hide-scrollbar'
             style={{backgroundColor: 'lightgray'}}  
        >
            <div className='flex flex-col'>
                <Link
                   to="/"
                   className=' w-190 items-center'
                   onClick={handleCloseSidebar }
                >
                     <img src={logo} alt="Logo" className='w-150' />
                     <h3 className='font-bold ' style={{fontSize: '25px', marginLeft: '37px', marginTop: '-37px', marginBottom: '15px'}}  >PhotoPin</h3>
                </Link>
                <div className='flex flex-col gap-5'>
                    <NavLink
                       to="/"
                       className = {({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
                       onClick={handleCloseSidebar}
                      
                    >
                        <RiHomeFill/>
                        Home
                                 
                    </NavLink>
                    <h3 className='mt-2 px-5 text-base 2xl:text-xl'> Discovery categories</h3>
                    {categories.splice(0, categories.length - 1).map((category) => ( 
                        <NavLink 
                          to={`/category/${category.name}`}
                          className = {({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
                          onClick={handleCloseSidebar}
                          key={category.name}
                        >
                        <img src={category.image} alt="category-pics" className='w-8 h-8 rounded-full shadow-sm' />
                        {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link
                 to={`user-profile/${user._id}`}
                 className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
                 onClick={handleCloseSidebar}
                >
                    <img src={user.image} alt="" className='w-100 h-10 rounded-full' />
                    <p>{user.userName}</p>
                </Link>
            )}
        </div>
    )
}

export default Sidebar
