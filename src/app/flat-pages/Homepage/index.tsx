"use client";
import React, { FC, useEffect } from "react";
import FavoritesGirls from "@/app/widgets/FavoritesGirls";
import { Character } from "@/app/shared/api/types";
import CardsList from "@/app/widgets/CardsList";
import { signInAnonymouslyHandler } from "@/app/shared/api/auth";
import {
  PaymentModalType,
  usePaymentStore,
} from "@/app/shared/store/paymentStore";
import { useRouter } from "next/navigation";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { activateTokens } from "@/app/shared/api/payment";
import { sendGTMEvent } from "@next/third-parties/google";
import notification from "@/app/widgets/Notification";

interface ComponentProps {
  avatars: Character[] | null;
  action: PaymentModalType | null;
  characterId: string | null;
  orderNumber: string | null;
  product: string | null;
}

const HomePage: FC<ComponentProps> = ({
  avatars,
  action,
  characterId,
  orderNumber,
  product,
}) => {
  const { setSuccessPaymentModal, setTokens, tokens } = usePaymentStore();
  const { setSelectedCharacterId } = useSelectedCardStore();
  const navigate = useRouter();
  const favoriteAvatars =
    (avatars &&
      avatars
        ?.filter((item) => item.top_horizontal_list_position)
        .sort(
          (a, b) =>
            a.top_horizontal_list_position - b.top_horizontal_list_position,
        )) ||
    null;
  const simpleAvatars =
    (avatars &&
      avatars
        ?.filter((item) => item.tags)
        .filter((item) => !item.top_horizontal_list_position)
        .sort((a, b) => a.position - b.position)) ||
    null;
  const tags: string[] = Array.from(
    new Set(simpleAvatars?.flatMap((avatar) => avatar.tags ?? [])),
  );

  const getTokens = async (orderNumber: string, product: string) => {
    try {
      const response = await activateTokens(orderNumber);
      if (response) {
        const productItem = product.split("_")[0];
        const totalTokens = +tokens + +productItem;
        setSelectedCharacterId(characterId);
        localStorage.setItem("tokens", totalTokens.toString());
        setTokens(totalTokens);
        notification.open({
          title: "Successful purchase",
          type: "success",
          description: `${productItem} tokens added to your balance`,
        });
      }
    } catch (error) {
      notification.open({
        title: "Successful purchase",
        type: "error",
        description: "Something went wrong while adding tokens",
      });
      console.log("error");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const tempToken = localStorage.getItem("tempToken");
    if (
      avatars &&
      ((action && action === "subscription_success") ||
        action === "auth_success")
    ) {
      sendGTMEvent({
        event: "paywall_complete_buy",
        placement: "quiz",
        product_name: "subscription",
      });
      setSuccessPaymentModal({
        isSuccessPaymentModalActive: true,
        successPaymentModalType: action,
      });
    }
    if (
      action === "tokens_success" &&
      characterId &&
      orderNumber &&
      product
    ) {
      if (characterId === "None") {
        navigate.push("/");
      } else {
        navigate.push("/chats");
      }
      getTokens(orderNumber, product);
    }
    if (!accessToken && !tempToken && !action) {
      signInAnonymouslyHandler();
    }
  }, []);

  return (
    <div className="h-[calc(100vh-60px)] animate-fadeIn overflow-y-auto">
      <div className="container !px-0">
        <div className="space-y-[8px] sm:space-y-0">
          <FavoritesGirls avatars={favoriteAvatars} />
          <div className="rounded-l-[24px] bg-[#121423] p-[24px] md:rounded-none md:p-[16px] sm:pt-0">
            <CardsList tags={tags} avatars={simpleAvatars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
