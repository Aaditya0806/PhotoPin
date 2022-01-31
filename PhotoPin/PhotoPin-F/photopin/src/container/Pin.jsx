import React , { useState} from 'react';
import { Route , Routes } from 'react-router-dom';

import { Navbar, Feed, PinDetail, SearchPin , CreatePin } from '../components';

const Pin = ( {user}) => {
   
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className='px-2 md:px-5 '>
        
            <div className='bg-gray-50'>
               <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
             </div>
             <div className='h-full'>
                <Routes>
                    <Route path='/' element={ <Feed/> } />
                    <Route path='/category/:categoryId' element={ <Feed/> } />
                    <Route path='/Pin-detail/:pinId' element={ <PinDetail user={user} /> } />
                    <Route path='/create-pin' element={ <CreatePin user={user} /> } />
                    <Route path='/search-pin' element={ <SearchPin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                </Routes>
             </div> 
        </div>
    )
}

export default Pin
