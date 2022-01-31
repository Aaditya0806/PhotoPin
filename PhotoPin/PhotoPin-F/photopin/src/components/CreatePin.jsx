import React , { useState} from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import { Spinner } from './Spinner'
// import { categories } from '../utils/data'

const CreatePins = ({ user }) => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);
    const [fields , setFields] = useState();
    const [category, setCategory] = useState();
    const [imageAsset, setImageAsset] = useState();
    const [wrongImageType, setWrongImageType] = useState(false);

   const navigate = useNavigate();

   const uploadImage = (e) => {
       const { type, name } = e.target.files[0];

       if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type ==='image/gif' || type ==='image/tiff'){
          setWrongImageType(false);
          setLoading(true);

          client.assets
           .upload('image', e.target.files[0], { contentType: type , filename: name})
           .then((document) => {
               setImageAsset(document);
               setLoading(false);
           })
           .catch((error) => {
               console.log('image upload error', error);
           })
       } else {
           setLoading(false);
           setWrongImageType(true);
       }
   }

   const savePin = () => {
       if(title && about && destination && imageAsset?._id && category) {
           const doc ={
               _type: 'pin',
               title,
               about,
               destination,
               image:{
                   _type:'image',
                   asset: {
                       _type: 'reference',
                       _ref: imageAsset?._id
                   }
               },
               userId: user._id,
               postedBy: {
                   _type: 'postedBy',
                   _ref: user._id ,
               },
               category,
           }

           client.create(doc)
             .then(() => {
                 navigate('/')
             })
       } else {
           setFields(true);

           setTimeout(() => setFields(false),2000 )
       }
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
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            {fields && (
                <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill in all the fields. </p>
            )}
            <div className='flex flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
                 <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
                    <div className='flex justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-420'>
                         {loading && <spinner/>}
                         {wrongImageType && <p>Wrong image type </p>}
                         {!imageAsset ? (
                             <label>
                                 <div className='flex flex-col items-center justify-center h-full'>
                                     <div className='flex flex-col justify-center items-center'>
                                        <p className='font-bold text-2xl'>
                                            <AiOutlineCloudUpload/>
                                        </p>
                                        <p className='text-lg'>
                                            Click to upload
                                        </p>
                                     </div>
                                     <p className='mt-32 text-gray-400'>
                                        Use high-quality JPG, SVG, PNG, GIF or TIFF less than 20MB
                                     </p>
                                 </div>
                                 <input
                                     type="file"
                                     name='upload-image'
                                     onChange={uploadImage}
                                     className='w-0 h-0'
                                  />
                             </label>
                         ) : (
                            <div className='relative h-full'>
                                 <img src={imageAsset?.url} alt="uploaded-pic" className='h-full w-full ' />
                                 <button
                                     type='button'
                                     className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                     onChange={() => setImageAsset(null)}
                                 >
                                      <MdDelete/>
                                 </button>
                            </div>
                         )}
                    </div>
                 </div>
                   
                <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
                    <input
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder='Add your title here'
                      className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 '
                    />
                    {user && (
                        <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
                           <img src={user.image} alt="user-profile" className='w-10 h-10 rounded-full'/>
                           <p className='font-bold'>{user.userName}</p>
                        </div>
                    )}
                    <input
                      type="text" 
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder='What is your pin about'
                      className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 '
                    />
                    <input
                      type="text" 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder='Add a destination link'
                      className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 '
                    />
                    <div className='flex flex-col'>
                        <div>
                            <p className='mb-2 font-semibold text-lgsm:text-xl'>Choose pin category</p>
                            <select
                               onChange={(e) => setCategory(e.target.value)}
                               className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
                            >
                             <option value="other" className='bg-white' >Select Category</option>

                             {categories.map((category) => (
                                 <option className='text-base border-0 outline-none capitalize bg-white text-black' value={category.name}>
                                     {category.name}
                                 </option>
                             ))}
                            </select>
                        </div> 
                        <div className='flex justify-end items-end mt-5'>
                            <button
                               type='button'
                               onClick={savePin}
                               className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'
                            >
                               Save Pin
                            </button>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default CreatePins