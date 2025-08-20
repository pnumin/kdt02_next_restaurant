'use client';

import RestaurantCard from '@/components/RestaurantCard';
import { supabase } from '@/lib/supabase/client';
import type { restaurant } from '@/types/restaurant';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';

export default function Region() {
  const [area, setArea] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [restaurants, setRestaurants] = useState<restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 지역 자료 가져오기
  const getArea = async () => {
    const { data } = await supabase
      .from('restaurants')
      .select('gugun_nm');

    if (data) {
      // 중복을 제거하고 정렬 
      const area = [...new Set(data.map((item) => item.gugun_nm))].sort();
      setArea(area);
    }
  }

  useEffect(() => {
    getArea();
  }, []);

  // 선택된 지역이 변경될 때마다 해당 지역의 맛집 목록 가져옴 
  const getData = async (area: string) => {
    if (!area) {
      setRestaurants([]);
      return;
    }

    setIsLoading(true);
    setRestaurants([]); // 새로운 지역 선택 시 기존 목록 초기화

    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('gugun_nm', area)
      .order('main_title', { ascending: true });

    if (error) {
      console.error('Error fetching restaurants by region:', error);
    } else {
      setRestaurants(data || []);
    }

    setIsLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newArea = e.target.value;
    setSelectedArea(newArea);
    getData(newArea);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <h2 className="text-2xl font-bold">지역별 맛집 검색</h2>
 
        <select id="region-select"
          value={selectedArea}
          onChange={handleChange}
          className="bg-gray-50 border mx-4 border-gray-300
                     text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block p-2.5">
          <option value="">-- 지역을 선택하세요 --</option>
          {area.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select> 
      </div>

      {isLoading ? <div className="text-center py-10">
        <p>맛집 정보를 불러오는 중...</p>
      </div> : <>
        {restaurants.length > 0 ?
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.uc_seq} restaurant={restaurant} />
            ))}
          </div> : <div className="text-center py-10 text-gray-500">
            {selectedArea ? `${selectedArea}'에 대한 맛집 정보가 없습니다.` : '먼저 지역을 선택해주세요.'}
          </div>}
      </>}
    </div>
  );
}