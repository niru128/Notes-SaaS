import API from '@/api/api';
// import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Notes = () => {

    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tenant, setTenant] = useState(localStorage.getItem('tenant') || '');
    const [role, setRole] = useState(localStorage.getItem('role') || 'Member');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const startEditing = (note) => {
        setEditingId(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };


    const fetchNotes = async () => {
        const res = await API.get('/notes')
        setNotes(res.data);
    }

    const createNote = async () => {

        try {

            await API.post('/notes', { title, content })
            setTitle('');
            setContent('');
            fetchNotes();
            toast.success("Note created successfully")

        } catch (err) {
            toast.error(err.response.data.msg || "Something went wrong")
        }


    }
    const deleteNote = async (id) => {
        try {
            await API.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            fetchNotes();
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to delete note");
        }
    };


    const updateNote = async () => {
        try {
            await API.put(`/notes/${editingId}`, {
                title: editTitle,
                content: editContent,
            });
            toast.success("Note updated successfully");
            setEditingId(null);
            setEditTitle('');
            setEditContent('');
            fetchNotes();
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to update note");
        }
    };


    useEffect(() => {
        fetchNotes();
    }, [])

    const upgradeTenant = async () => {
        try {
            await API.post(`/tenants/${tenant}/upgrade`);
            toast.success("Upgraded to pro");
            fetchNotes();  // optionally refresh notes if limits change UI
        } catch (error) {
            toast.error(error.response?.data?.msg || "Upgrade failed");
        }
    }


    return (
        <motion.div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-500'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className='bg-white p-10 rounded-xl shadow-lg  w-11/12 h-auto'
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className='text-3xl font-bold mb-4'>Notes ({tenant} - {role})</h1>
                {notes.map(n => (
                    <div className='mt-2 mb-6 border-b pb-2' key={n._id}>
                        {editingId === n._id ? (
                            <>
                                <input
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                    className='border p-2 w-full font-bold mb-2'
                                />
                                <textarea
                                    value={editContent}
                                    onChange={e => setEditContent(e.target.value)}
                                    className='border p-2 w-full mb-2'
                                />
                                <button
                                    onClick={updateNote}
                                    className='bg-green-600 text-white py-1 px-3 mr-2 rounded cursor-pointer hover:bg-green-800'
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className='bg-gray-500 text-white py-1 px-3 rounded cursor-pointer hover:bg-gray-700'
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className='font-bold text-lg'>{n.title}</h3>
                                <p>{n.content}</p>
                                <div className='flex space-x-2 mt-2'>
                                    <button
                                        onClick={() => startEditing(n)}
                                        className='bg-yellow-500 text-white py-1 px-3 rounded cursor-pointer hover:bg-yellow-700'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteNote(n._id)}
                                        className='bg-red-600 text-white py-1 px-3 rounded cursor-pointer hover:bg-red-800'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}


                <div className='flex flex-col space-y-2 justify-center'>
                    <h3 className='font-bold'>Add a new Note</h3>
                    <input placeholder="Title" value={title} className='border p-2 w-100 font-bold' onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Content" value={content} className='border p-2 ' onChange={e => setContent(e.target.value)} />
                    <button onClick={createNote} className='bg-blue-600 py-2 pr-3 items-center cursor-pointer hover:bg-purple-800 text-white' >Add Note</button>
                    {role === 'Admin' && <button className='bg-green-700 py-2 pr-3 items-center cursor-pointer' onClick={upgradeTenant}>Upgrade to Pro</button>}
                </div>

            </motion.div>
        </motion.div>
    )
}

export default Notes
