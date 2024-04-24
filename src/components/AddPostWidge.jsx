import { CldUploadButton } from 'next-cloudinary'
import { AtSign, Camera, Ellipsis, Forward, Hash, Heart, Image, MessageCircle, Paperclip, Share2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { setPosts } from '@features/posts/postsSlice';

const AddPostWidge = () => {
    const statePosts = useSelector((state) => state.Posts)
    const [img, setImage] = useState(null);
    const [showHashtagInput, setShowHashtagInput] = useState(false);
    const [showMentionInput, setShowMentionInput] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

    const handleHashtagClick = (e) => {
        e.preventDefault();
        setShowHashtagInput(true);
        setShowMentionInput(false);
    };

    const handleMentionClick = (e) => {
        e.preventDefault();
        setShowMentionInput(true);
        setShowHashtagInput(false);
    };

    const uploadPhoto = (result) => {
        setValue("postImage", result?.info?.secure_url);
        setValue("userId", user?.id);
        setImage(result?.info?.secure_url);
    }

    const onSubmit = async (data) => {
        const res = await fetch("api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const newPost = await res.json();

        if (res.ok) {
            dispatch(setPosts({ Posts: [newPost, ...statePosts] }));
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-full rounded-md'>
            <button type="submit" className='w-full h-[40px] bg-[#111827] text-white rounded-full font-bold'>Share Public</button>
            <div className='divide-y'>
                <div className='flex items-center space-y-2 p-4'>
                    <img src={user?.profileImage || "https://images.pexels.com/photos/161709/newborn-baby-feet-basket-161709.jpeg"} alt='profileImage'
                        className='w-12 h-12 rounded-full'
                    />

                    {showHashtagInput && (
                        <div className='bg-[#FBFBFB] ml-3 w-full h-12 rounded-full flex items-center justify-between px-4'>
                            <input type="tag" placeholder='#Hashtag'
                                {...register("hashtag")}
                                defaultValue=""
                                className='border-none w-full outline-none bg-transparent text-sm' />
                        </div>
                    )}

                    {showMentionInput && (
                        <div className='bg-[#FBFBFB] ml-3 w-full h-12 rounded-full flex items-center justify-between px-4'>
                            <input type="text" placeholder='@Mention'
                                {...register("mention")}
                                defaultValue=""
                                className='border-none w-full outline-none bg-transparent text-sm' />
                        </div>
                    )}
                    <div className='bg-[#FBFBFB] ml-3 w-full h-12 rounded-full flex items-center justify-between px-4'>
                        <input type="text" placeholder='share something...'
                            {...register("text")}
                            defaultValue=""
                            className='border-none w-full outline-none bg-transparent text-sm' />
                        <span className='opacity-50'>😃</span>
                    </div>
                </div>
                <div className='flex p-4 items-center spcace-x-2'>
                    <div className='flex items-center'>
                        <span className='text-[20px] text-blue-500'><Image /></span>
                        <div>
                            <CldUploadButton options={{ maxFiles: 1 }} onUpload={uploadPhoto} uploadPreset="uewxgvm2" className="font-bold text-[20px]">
                                <p className="text-[#000] ml-2 text-sm">Upload New Photo</p>
                            </CldUploadButton>
                        </div>
                    </div>

                    {/* <div className='flex items-center ml-3'>
              <span className='text-[20px] text-blue-500'><Camera /></span>
              <div>
             <CldUploadButton options={{maxFiles: 1}} onUpload={uploadPhoto} uploadPreset="uewxgvm2" className="text-[20px]">
            <p className="text-[#000] ml-2 text-sm">video</p>
            </CldUploadButton>   
              </div>
             </div>

             <div className='flex items-center ml-3'>
              <span className='text-[20px] text-blue-500'><Paperclip /></span>
              <p className="text-[#000] ml-2 text-sm">Attachment</p> 
             </div> */}

                    <button onClick={handleHashtagClick} className='flex items-center ml-3'>
                        <span className='text-[20px] text-blue-500'><Hash /></span>
                        <p className="text-[#000] ml-2 text-sm">Hashtag</p>
                    </button>

                    <button onClick={handleMentionClick} className='flex items-center ml-3'>
                        <span className='text-[20px] text-blue-500'><AtSign /></span>
                        <p className="text-[#000] ml-2 text-sm">Mention</p>
                    </button>

                </div>
            </div>
        </form>
    )
}

export default AddPostWidge