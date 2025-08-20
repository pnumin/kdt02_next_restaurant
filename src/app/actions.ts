//서버 액션
'use server'

import { supabase } from "@/lib/supabase/client";
import type { restaurant } from "@/types/restaurant";

const PAGE_SIZE = 8;

export async function getRestaurants(
  prevState : { restaurants : restaurant[], offset:number},
  formData : FormData
) : Promise<{ restaurants : restaurant[], offset:number}> {
  const offset = Number(formData.get('offset')) ;

  // Supabase에서 다음 페이지 데이터 가져옴 
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('main_title', { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) {
    console.error("Error fetching restaurants:", error);
    // 에러 발생 시 이전 상태를 그대로 반환
    return prevState;
  }

  // 이전 데이터와 새로운 데이터를 합쳐서 반환합니다.
  return {
    restaurants: [...prevState.restaurants, ...data],
    offset: offset + PAGE_SIZE,
  };
}

