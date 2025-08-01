'use client';

import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint) => {
    setLoading(true);
    setType(endpoint);
    const response = await fetch(`https://api.fake-rest.refine.dev/${endpoint}`);
    const result = await response.json();
    setData(result);
    setLoading(false);
    
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Simple API Data Viewer</h1>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => fetchData('blog_posts')}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Show Blog Posts
        </button>
        <button
          onClick={() => fetchData('categories')}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Show Categories
        </button>
      </div>

      {/* Show loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Show table if data is loaded */}
      {!loading && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 border border-gray-700">ID</th>
                <th className="px-4 py-2 border border-gray-700">Title</th>
                {type === 'blog_posts' && (
                  <th className="px-4 py-2 border border-gray-700">Content</th>
                )}
                <th className="px-4 py-2 border border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800">
                  <td className="px-4 py-2 border border-gray-700">{item.id}</td>
                  <td className="px-4 py-2 border border-gray-700">{item.title}</td>
                  {type === 'blog_posts' && (
                    <td className="px-4 py-2 border border-gray-700">
                      {item.content.slice(0, 50)}...
                    </td>
                  )}
                  <td className="px-4 py-2 border border-gray-700 space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">👁️</button>
                    <button className="text-yellow-400 hover:text-yellow-300">✏️</button>
                    <button className="text-red-400 hover:text-red-300">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show message if no data */}
      {!loading && type && data.length === 0 && (
        <p className="text-center text-gray-400">No data found.</p>
      )}
    </div>
  );
}
