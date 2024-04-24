"use client"

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Loader from "./Loading";

const ads = [
    {
      id: 1,
      imageUrl: 'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg',
      description: 'This is the second ad description.',
    },
    {
      id: 2,
      imageUrl: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg',
      description: 'This is the third ad description.',
    },
  ];
  
  const AdsPage = () => {
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();
    const user = session?.user;

    useEffect(() => {
      if(user) setLoading(false)
    }, [user])

    return loading ? <Loader /> : (
      <div className="min-h-screen overflow-scroll">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Ads</h1>
          
          <div className="grid grid-cols-1 gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-white rounded-md shadow-md overflow-hidden">
                <img src={ad.imageUrl} alt={`Ad ${ad.id}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-gray-700">{ad.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default AdsPage;
  