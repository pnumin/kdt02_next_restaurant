'use client';

import { supabase } from "@/lib/supabase/client";
import type { restaurant } from "@/types/restaurant";
import { useEffect, useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
 
const PAGE_SIZE = 8;

export default function Home() {
  const [restaurants, setRestaurants] = useState<restaurant[]>([]);
  const [offset, setOffset] = useState(0); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true);
  
  const initData = async () => {
    if (!hasMore) return; 

    setIsLoading(true) ;
    const { data } = await supabase
      .from('restaurants')
      .select('*')
      .order('main_title', { ascending: true })
      .range(0, PAGE_SIZE - 1);

    if (data) {
      setRestaurants(data);
      setOffset(PAGE_SIZE);
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    } 
    setIsLoading(false) ;
  };

  // 맛집 데이터를 불러오는 함수
  const getData = async () => {
    if (!hasMore) return; 

    setIsLoading(true) ;
    const { data } = await supabase
      .from('restaurants')
      .select('*')
      .order('main_title', { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);

    if (data) {
      setRestaurants(prev => [...prev, ...data]);
      setOffset(prev => prev + PAGE_SIZE);
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    } 
    setIsLoading(false) ;
  };

  // 초기 데이터 로드
  useEffect(() => {
   initData();
  }, []);  

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">부산 맛집 리스트</h2>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants.map((restaurant, idx) => (
          <RestaurantCard key={restaurant.uc_seq + String(idx)} restaurant={restaurant} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button onClick={getData} 
                  disabled={isLoading} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400 transition-colors">
            {isLoading ? '로딩 중...' : '더보기'}
          </button>
        </div>
      )}

      {!hasMore && restaurants.length > 0 && (
        <p className="text-center text-gray-500 mt-4">모든 맛집을 불러왔습니다.</p>
      )}
    </div>
  );
}

