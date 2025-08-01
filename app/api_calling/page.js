'use client'
import React from 'react'
import { useState } from 'react'
import { GrView } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";


const Page = () => {

    const [data, setdata]=useState([]);
    const [type, settype]=useState('');
    const [loading, setloading]=useState(false);

    // eigula dekte hobe 
    //Typescript
    //This should be implemented using axios
    //Tanstack query 

    const fetchdata=async (endpoint)=>{
        setloading(true);
        settype(endpoint);
        const response =await fetch(`https://api.fake-rest.refine.dev/${endpoint}`);
        const result =await response.json();
        setdata(result);
        setloading(false);
    };


    //Data delete korar jonno

    const del=(id)=>{
        const newdata= data.filter((item)=>item.id!==id);
        setdata(newdata);
    }

    // data show koranor jonno 
    const views=(content)=>{
        alert(content);
    }


  return (
    <div className='bg-[#1D202A]' >
        <div className='text-white max-w-6xl mx-auto p-6 flex'>
        
        <div className='bg-gray-700 w-1/4 rounded-sm p-4 h-[30rem] sticky top-10'>
        <h1 className='text-2xl font-bold mb-6 text-center'>API Handling</h1>
        <div className='flex flex-col gap-2 items-center'>
            <div ><button onClick={()=>{fetchdata('blog_posts')}} className='bg-white text-black font-semibold p-2 px-3 rounded-md mb-2 hover:transform hover:scale-[1.2] transition-all ease-in-out duration-100'>Blog Post</button></div>
            <div><button onClick={()=>{fetchdata('categories')}} className='bg-white text-black font-semibold p-2 rounded-md hover:transform hover:scale-[1.2] transition-all ease-in-out duration-100'>Categories</button></div>
        </div>
        </div>
        <div className='text-white w-full p-2 ml-5'> 
            
            {data.length === 0 && !loading &&
            <p className='text-2xl font-bold text-white text-center'>Press the button to view data</p>
            }
            
            {loading && <p className='text-2xl font-bold text-white text-center'>loading</p>}
            {!loading && data.length >0 &&
            
            <div>
                <table className='w-full table-auto border-2 border-gray-700'>
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-2 border-gray-700">Id</th>
                            <th className="px-4 py-2 border-2 border-gray-700">Title</th>
                            {type === 'blog_posts' && <th className='px-4 py-2 border-2 border-gray-700'>Content</th>}
                            {type === 'blog_posts' && <th className='px-4 py-2 border-2 border-gray-700'>Status</th>}
                            <th className='px-4 py-2 border-2 border-gray-700'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item,i)=>(

                            <tr key={i}>
                                <td  className='px-4 py-2 border-2 border-gray-700'>{item.id}</td>
                                <td className='px-4 py-2 border-2 border-gray-700'>{item.title}</td>
                                {type === 'blog_posts' && <td className='px-4 py-2 border-2 border-gray-700'>{item.content}</td>}
                                {type === 'blog_posts' && <td className='px-4 py-2 border-2 border-gray-700'>{item.status}</td>}
                                <td className='px-4 py-2 border-2 border-gray-700 flex gap-2 justify-center'>
                                    <button onClick={()=>{views(type==='blog_posts'?item.content:item.title)}} ><GrView / ></button>
                                    <button ><FaRegEdit /></button>
                                    <button onClick={()=>{del(item.id)}} ><MdOutlineDelete  /></button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            
            
            
            }

        </div>


        </div>
        

    </div>
  )
}

export default Page