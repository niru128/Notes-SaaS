import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '@/api/api.js'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        try {

            e.preventDefault()

            const res = await API.post('/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('tenant', res.data.user.tenant)
            localStorage.setItem('role', res.data.user.role)
            toast.success("Login successful")
            navigate('/notes')


        }
        catch (error) {
            toast.error(error.response.msg || "Something went wrong")
            console.log(error)
        }
    }

    return (
        <motion.div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-500'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className='bg-white p-10 rounded-xl shadow-lg w-96'
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >

                <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
                <form onSubmit={handleLogin} className='flex flex-col items-center space-y-4'>
                    <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required className='p-3 w-full focus:outline-none border focus:ring-purple-300 rounded-lg' />
                    <input type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required className='p-3 w-full focus:outline-none border focus:ring-purple-300 rounded-lg' />
                    <Button type="submit" className="py-2 px-4 bg-blue-500 cursor-pointer hover:bg-purple-700 text-white">Login</Button>
                </form>

            </motion.div>
        </motion.div>
    )
}

export default Login
