'use client'
import { setAuthuser } from '@/redux/userSlice'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'


const Login = () => {

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch()

  const Onsubmithandler = async (e) => {
    console.log(user);
    e.preventDefault();
    try {

      const resposnse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (resposnse.status === 200) {
        toast.success(resposnse.data.msg);
        router.push('/');
        
        dispatch(setAuthuser(resposnse.data));
        localStorage.setItem('token',resposnse.data.Token)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg)
    }
    setUser({
      username: "",
      password: "",
    })
  }

  return (
    <div className='min-w-96 mx-auto'>
      <div className='signup-box h-full w-full bg-pink-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
        <h1 className='title'>Login</h1>
        <form className='mt-3' onSubmit={Onsubmithandler}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="email"
              className="grow"
              placeholder="username" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="password"
              className="grow" />
          </label>
          <div className='my-5'>
            <p className='text-center'>Don't have an account? <Link to='/signup' href={'/signup'} className='text-blue-500'>signup</Link> </p>
          </div>
          <div>
            <button type='submit' className="btn btn-success">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login