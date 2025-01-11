"use client"; // This is a client component 👈🏽
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignUp = () => {

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: ""
  });

  const router = useRouter()

  const Onsubmithandler = async (e) => {
    console.log(user);
    e.preventDefault();

    try {
      console.log(process.env.NEXT_PUBLIC_API_URL, "api url");
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, user, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
      if (res.data.status === 200) {
        toast.success(res.data.msg);
        router.push('/login')
      }
      console.log(res, "API response>>>>>>>>>>>");
    } catch (error) {
      toast.error(error.response.data.msg)
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      gender: ""
    })
  }

  const handlecheckBox = (gender) => {
    setUser({ ...user, gender });
  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='signup-box h-full w-full bg-pink-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
        <h1 className='title'>Signup</h1>

        <form className='mt-3' onSubmit={Onsubmithandler}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="fullName"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="email" 
              className="grow"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              placeholder="password"
              className="grow"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <div className='flex items-center'>
            <div className='flex items-center'>
              <p>Male:</p>
              <input
                checked={user.gender === "male"}
                onChange={() => handlecheckBox('male')}
                type="checkbox"
                className='checkbox' />
            </div>
            <div className='flex items-center mx-2'>
              <p>Female:</p>
              <input
                checked={user.gender === "female"}
                onChange={() => handlecheckBox('female')}
                type="checkbox"
                className='checkbox' />
            </div>
          </div>
          <div className='my-5'>
            <p className='text-center'>Already have account? <Link to='/login' href={'/login'} className='text-blue-500'>Login</Link> </p>
          </div>
          <div>
            <button type='submit' className="btn btn-success">SignUp</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp