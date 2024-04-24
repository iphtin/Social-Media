import AdsPage from '@components/Ads'
import FriendListWidget from '@components/FriendListWidget'
import Main from '@components/Main'
import UserProfile from '@components/UserWidget'

// 111110
// FBFBFB
// #111827

const Home = () => {
  return (
      <div className='p-4 bg-[#FBFBFB] h-[100vh] overflow-scroll relative flex'>
        <div className="w-1/3 max-lg:w-1/2 max-md:hidden">
          <UserProfile />
        </div>
        <div className="w-2/3 max-lg:w-1/2 max-md:w-full">
          <Main />
        </div>
        <div className="w-1/3 max-lg:w-1/2 max-md:hidden">
          <FriendListWidget />
          <AdsPage />
        </div>
      </div>
  )
}

export default Home