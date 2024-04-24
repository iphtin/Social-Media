"use client"

import { useForm } from "react-hook-form"
import { CldUploadButton } from 'next-cloudinary';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react"
import { useDispatch } from 'react-redux';
import { setLogin } from "@features/posts/postsSlice";

const AuthForm = ({type}) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue, 
        formState: { errors },
    } = useForm()
    const[img, setImage] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const uploadPhoto = (result) => {
        setValue("profileImage", result?.info?.secure_url);
        setImage(result?.info?.secure_url);
    }

    const onSubmit = async (data) => {
        if(type === "signUp") {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        if(res.ok) {
          router.push("/");
        }

        }

        if(type === "Login") {
          const res = await signIn("credentials", {
            ...data,
            redirect: false,
          }); 


          if (res.ok) {
            const sessionData = await getSession();

            dispatch(setLogin({ user: sessionData.user }));  
            router.push("/home");
          }

          if(res.error) {
            console.error("something Went Wrong!");
          }
  
  
        }
  
    } 

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">
          {type === "signUp" ? "Create New Account For Free" : "Log In" }
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {type === "signUp" && (
            <div>
              <input
                {...register("username", { required: true })}
                placeholder="Username"
                type="text"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.username && <span className="text-red-600 text-sm font-medium">This field is required</span>}
            </div>
            )}
            <div>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="E-mail"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.email && <span className="text-red-600 text-sm font-medium">This field is required</span>}
            </div>
            <div>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.password && <span className="text-red-600 text-sm font-medium">This field is required</span>}
            </div>
            {type === "signUp" && (
            <div className="space-y-4 flex space-x-8 items-center">
            <img src={watch("profileImage") || img ||"https://images.pexels.com/photos/556669/pexels-photo-556669.jpeg"} alt="Profile Image"
             className="w-[140px] h-[140px] rounded-full"
            />
            <CldUploadButton options={{maxFiles: 1}} onUpload={uploadPhoto} uploadPreset="uewxgvm2" className="font-bold text-[20px]">
            <p className="text-[#000] ml-8 font-bold">Upload New Photo</p>
            </CldUploadButton>
            </div>
            )}
            <button type="submit" className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            {type === "signUp" ? "Join free" : "Log In"}
            </button>
          </form>

          {type === "signUp" ? (
                  <Link href="/" className='link'>
                      <p className='text-red-400 mt-2'>Already have an account? Sign In Here</p>
                  </Link>
                ) : (
                    <Link href="/register" className='link'>
                        <p className='text-red-400 mt-2'>Don't have an account ? Register Here</p>
                    </Link>
           )}

        </div>
      </div>
    )
}

export default AuthForm