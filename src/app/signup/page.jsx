"use client"; // This is a client component 👈🏽
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signupUser } from '../_api/user';

const SignUp = () => {
  const { register, handleSubmit, control, watch, formState: { errors }, } = useForm();

  const router = useRouter()

  const Onsubmithandler = async (data) => {
    try {
      const res = await signupUser(data)
      if (res.data.status === 200) {
        toast.success(res.data.msg);
        router.push('/login')
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Something went wrong.')
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:h-screen md:h-screen lg:py-0">
        <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="../../../logo.svg" alt="logo" />
          Gooter
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(Onsubmithandler)}>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                <input type="text"
                  {...register('fullName', {
                    required: 'Please enter you fullname.',
                    minLength: { value: 2, message: "min 2 " }, maxLength: { value: 10, message: 'Username cannot exceed 10 characters', },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              {errors.fullName && <span className='mt-3 text-red-400'>{errors.fullName.message}</span>}

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email"
                  {...register('username', { required: 'Please enter you valid Email address.' })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              {errors.username && <span className='mt-3 text-red-400'>{errors.username.message}</span>}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password"
                  {...register('password', { required: 'Please enter you valid password.' })}
                  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              {errors.password && <span className='pt-3 text-red-400'>{errors.password.message}</span>}

              <div className='flex justify-evenly'>
                <div className='flex items-center'>
                  <p>Male:</p>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <input
                        checked={value === "male"}
                        onChange={() => onChange(value === "male" ? '' : 'male')}
                        type="checkbox"
                        className='checkbox'
                      />
                    )}
                  />
                </div>
                <div className='flex items-center mx-2'>
                  <p>Female:</p>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <input
                        checked={value === "female"}
                        onChange={() => onChange(value === "female" ? '' : 'female')}
                        type="checkbox"
                        className='checkbox'
                      />
                    )}
                  />
                </div>
              </div>

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link href={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp