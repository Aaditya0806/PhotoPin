import React , { useState, useEffect} from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
// import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner'



 const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;
      
  
    const searchQuery = (searchTerm) => {
        const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
              image{
                asset->{
                  url
                }
              },
                  _id,
                  destination,
                  postedBy->{
                    _id,
                    userName,
                    image
                  },
                  save[]{
                    _key,
                    postedBy->{
                      _id,
                      userName,
                      image
                    },
                  },
                }`;
        return query;
      };      

const SearchPin = ({searchTerm}) => {
    const [pins, setPins] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
     if(searchTerm !== ''){
         setLoading(true);
         const query = searchQuery(searchTerm.toLowerCase());

         client.fetch(query)
         .then((data) => {
             setPins(data);
             setLoading(false);
         });
     } else{
         client.fetch(feedQuery)
          .then((data) => {
              setPins(data);
              setLoading(false);
          });
     }
    
    }, [searchTerm]);
    

    return (
        <div>
          {/* <h1>hadfdfd</h1> */}
            {loading && <Spinner message="Searching for pins..."/>}
            {pins?.length !== 0 && <MasonryLayout pins={pins}/>}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className='mt-10 text-center text-xl'>
                  No Pins Found 
                </div>
            )}
        </div>
    )
}

export default SearchPin