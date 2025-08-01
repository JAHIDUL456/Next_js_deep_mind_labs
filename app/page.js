'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchData = async (endpoint) => {
    setLoading(true);
    setType(endpoint);
    try {
      const res = await fetch(`https://api.fake-rest.refine.dev/${endpoint}`);
      const json = await res.json();
      setData(json);
    } catch {
      setData([]);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setEditValue(type === 'blog_posts' ? item.content : item.title);
  };

  const saveEdit = () => {
    const updated = data.map((d) =>
      d.id === editing.id ? { ...d, [type === 'blog_posts' ? 'content' : 'title']: editValue } : d
    );
    setData(updated);
    setEditing(null);
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Simple API Viewer</h1>

      <div className="mb-4 space-x-4">
        <button onClick={() => fetchData('blog_posts')} className="btn">Blog Posts</button>
        <button onClick={() => fetchData('categories')} className="btn">Categories</button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                {type === 'blog_posts' && <th>Content</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t">
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  {type === 'blog_posts' && (
                    <td>{typeof item.content === 'string' ? item.content.slice(0, 60) + '...' : ''}</td>
                  )}
                  <td className="space-x-2">
                    <button onClick={() => alert(type === 'blog_posts' ? item.content : item.title)} className="btn-sm">👁️</button>
                    <button onClick={() => handleEdit(item)} className="btn-sm">✏️</button>
                    <button
                      onClick={() => setData(data.filter((d) => d.id !== item.id))}
                      className="btn-sm text-red-500"
                    >🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && data.length === 0 && type && <p>No data found.</p>}

      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit {type === 'blog_posts' ? 'Content' : 'Title'}</h2>
            {type === 'blog_posts' ? (
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="textarea w-full mb-4"
                rows={5}
              />
            ) : (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="input w-full mb-4"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button onClick={saveEdit} className="btn">Save</button>
              <button onClick={() => setEditing(null)} className="btn btn-ghost">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
