import { supabase } from '@/lib/supabase/client';
import type { restaurant } from '@/types/restaurant';
import Link from 'next/link'; 
import InfoRow from '@/components/InfoRow';

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id)
  
  const { data: restaurant, error } = await supabase
  .from('restaurants')
  .select('*')
  .eq('uc_seq', id)
  .single<restaurant>();

  const kakaoMapUrl = `https://map.kakao.com/link/map/${restaurant?.main_title},${restaurant?.lat},${restaurant?.lng}`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-200 mb-8 shadow-lg">
        <img
          src={restaurant?.main_img_normal}
          alt={restaurant?.main_title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 헤더 정보 */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600">
          {restaurant?.gugun_nm}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
          {restaurant?.main_title}</h1>
        {restaurant?.subtitle && 
        <p className="text-lg text-gray-600 mt-2">{restaurant.subtitle}</p>}
      </div>

      {/* 상세 정보 목록 */}
      <div className="border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <InfoRow label="주소" value={restaurant?.addr1} />
          <InfoRow label="연락처" value={restaurant?.cntct_tel} />
          <InfoRow label="대표 메뉴" value={restaurant?.rprsntv_menu} />
          <InfoRow label="운영 및 휴무" value={restaurant?.usage_day_week_and_time} />
          <InfoRow label="홈페이지" value={restaurant?.homepage_url} isLink={true} />
          <InfoRow label="지도" value={kakaoMapUrl} isLink={true} />
        </dl>
      </div>

      {/* 상세 설명 */}
      {restaurant?.itemcntnts && <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">상세 정보</h2>
          <div className="prose max-w-none text-gray-700" 
                dangerouslySetInnerHTML={{ __html: restaurant.itemcntnts.replace(/\n/g, '<br />') }} />
        </div>}

      <div className="mt-12 text-center">
        <Link href="/" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors">
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}