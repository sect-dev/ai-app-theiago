'use client'
import React, {FC, useEffect} from 'react';
import FavoritesGirls from "@/app/widgets/FavoritesGirls";
import {Character} from "@/app/shared/api/types";
import CardsList from "@/app/widgets/CardsList";
import {signInAnonymouslyHandler} from "@/app/shared/api/auth";
import {PaymentModalType, usePaymentStore} from "@/app/shared/store/paymentStore";

interface ComponentProps {
  avatars: Character[] | null
  action: PaymentModalType | null
}

const HomePage:FC<ComponentProps> = ({avatars,action}) => {
  const {setSuccessPaymentModal} = usePaymentStore()
  const favoriteAvatars = avatars && avatars?.filter(item => item.top_horizontal_list_position).sort((a,b) => a.top_horizontal_list_position - b.top_horizontal_list_position) || null
  const simpleAvatars = avatars && avatars?.filter(item => item.tags).filter(item => !item.top_horizontal_list_position).sort((a,b) => a.position - b.position) || null
  const tags: string[] = Array.from(new Set(simpleAvatars?.flatMap(avatar => avatar.tags ?? [])));

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const tempToken = localStorage.getItem("tempToken");
    if(avatars && (action && action === 'subscription_success' || action === 'auth_success')) {
      setSuccessPaymentModal({isSuccessPaymentModalActive:true, successPaymentModalType:action})
    }
    if (!accessToken && !tempToken) {
      signInAnonymouslyHandler();
    }
  }, []);

  return (
    <div className="animate-fadeIn overflow-y-auto h-[calc(100vh-60px)]">
      <div className="container !px-0">
        <div className="space-y-[8px] sm:space-y-0">
          <FavoritesGirls avatars={favoriteAvatars} />
          <div className="bg-[#121423] p-[24px] rounded-l-[24px] md:p-[16px] sm:pt-0 md:rounded-none">
            <CardsList tags={tags} avatars={simpleAvatars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;