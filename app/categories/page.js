// 'use client';

// import { useState } from 'react';

// export default function Home() {
//   const [data, setData] = useState([]);
//   const [type, setType] = useState('');
//   const [loading, setLoading] = useState(false);

//   const fetchData = async (endpoint) => {
//     setLoading(true);
//     setType(endpoint);
//     const response = await fetch(`https://api.fake-rest.refine.dev/${endpoint}`);
//     const result = await response.json();
//     setData(result);
//     setLoading(false);
    
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
//       <h1 className="text-3xl font-bold mb-6 text-center">Simple API Data Viewer</h1>

//       {/* Buttons */}
//       <div className="flex justify-center gap-4 mb-6">
//         <button
//           onClick={() => fetchData('blog_posts')}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
//         >
//           Show Blog Posts
//         </button>
//         <button
//           onClick={() => fetchData('categories')}
//           className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
//         >
//           Show Categories
//         </button>
//       </div>

//       {/* Show loading */}
//       {loading && <p className="text-center">Loading...</p>}

//       {/* Show table if data is loaded */}
//       {!loading && data.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border border-gray-700">
//             <thead className="bg-gray-800">
//               <tr>
//                 <th className="px-4 py-2 border border-gray-700">ID</th>
//                 <th className="px-4 py-2 border border-gray-700">Title</th>
//                 {type === 'blog_posts' && (
//                   <th className="px-4 py-2 border border-gray-700">Content</th>
//                 )}
//                 <th className="px-4 py-2 border border-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-800">
//                   <td className="px-4 py-2 border border-gray-700">{item.id}</td>
//                   <td className="px-4 py-2 border border-gray-700">{item.title}</td>
//                   {type === 'blog_posts' && (
//                     <td className="px-4 py-2 border border-gray-700">
//                       {item.content.slice(0, 50)}...
//                     </td>
//                   )}
//                   <td className="px-4 py-2 border border-gray-700 space-x-2">
//                     <button className="text-blue-400 hover:text-blue-300">👁️</button>
//                     <button className="text-yellow-400 hover:text-yellow-300">✏️</button>
//                     <button className="text-red-400 hover:text-red-300">🗑️</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Show message if no data */}
//       {!loading && type && data.length === 0 && (
//         <p className="text-center text-gray-400">No data found.</p>
//       )}
//     </div>
//   );
// }




'use client'

import React, { useState } from 'react';
import { GrView } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const Page = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchData = async (endpoint) => {
        setLoading(true);
        setType(endpoint);
        setCurrentPage(1); // reset page when new type is loaded
        const response = await fetch(`https://api.fake-rest.refine.dev/${endpoint}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
    };

    const del = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    const views = (content) => {
        alert(content);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className='bg-[#1D202A] min-h-screen'>
            <div className='text-white max-w-6xl mx-auto p-6 flex'>

                {/* Left Fixed Sidebar */}
                <div className='bg-gray-700 w-1/4 rounded-sm p-4 h-[30rem] sticky top-10'>
                    <h1 className='text-2xl font-bold mb-6 text-center'>API Handling</h1>
                    <div className='flex flex-col gap-2 items-center'>
                        <button onClick={() => fetchData('blog_posts')} className='bg-white text-black font-semibold p-2 px-3 rounded-md mb-2 hover:scale-110 transition-all ease-in-out duration-100'>Blog Post</button>
                        <button onClick={() => fetchData('categories')} className='bg-white text-black font-semibold p-2 rounded-md hover:scale-110 transition-all ease-in-out duration-100'>Categories</button>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className='text-white w-full p-2 ml-5'>

                    {data.length === 0 && !loading &&
                        <p className='text-2xl font-bold text-white text-center'>Press the button to view data</p>
                    }

                    {loading &&
                        <p className='text-2xl font-bold text-white text-center'>Loading...</p>
                    }

                    {!loading && data.length > 0 &&
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
                                    {currentItems.map((item, i) => (
                                        <tr key={i}>
                                            <td className='px-4 py-2 border-2 border-gray-700'>{item.id}</td>
                                            <td className='px-4 py-2 border-2 border-gray-700'>{item.title}</td>
                                            {type === 'blog_posts' && <td className='px-4 py-2 border-2 border-gray-700'>{item.content}</td>}
                                            {type === 'blog_posts' && <td className='px-4 py-2 border-2 border-gray-700'>{item.status}</td>}
                                            <td className='px-4 py-2 border-2 border-gray-700 flex gap-2 justify-center'>
                                                <button onClick={() => views(type === 'blog_posts' ? item.content : item.title)}><GrView /></button>
                                                <button><FaRegEdit /></button>
                                                <button onClick={() => del(item.id)}><MdOutlineDelete /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className="flex justify-center mt-6 gap-4">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="text-white font-medium">Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Page;
