import { Heart } from 'lucide-react'

const CommentsWidget = ({setIsComments, comment}) => {
  return (
   <div className='mt-8'>
    <span onClick={() => setIsComments(false)}
     className="font-bold mb-2 absolute text-red-500 cursor-pointer top-3 right-4 text-[16px]">X</span>
    <div className="">
      {/*  */}

      <div className="flex p-3 w-full rounded-lg bg-white text-black items-start">
        <div className="w-[50px] flex items-center justify-center h-[50px] bg-blue-500 rounded-full overflow-hidden">
          <img 
            src={comment.user.profileImage}
            alt="profileImage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 flex flex-col ml-3 flex-grow">
          <span className="font-semibold text-blue-500">{comment.user.username}</span>
          <span className="text-sm">{comment.text}</span>
        </div>
        <button className="flex items-center space-x-2 text-black hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
      </div>
  
      {/*  */}
    </div>
  </div>
  )
}

export default CommentsWidget