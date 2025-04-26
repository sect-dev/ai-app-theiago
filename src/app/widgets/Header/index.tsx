"use client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import IcnPlus from "@/../public/images/icons/icon-plus.svg";
import IcnCoins from "@/../public/images/icons/icon-coins.svg";
import clsx from "clsx";
import { useAuthStore } from "@/app/shared/store/authStore";
import { signOutUser } from "@/app/shared/api/auth";
import { useRouter } from "next/navigation";
import { usePaymentStore } from "@/app/shared/store/paymentStore";

interface ComponentProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const Header: FC<ComponentProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user, loading, setAuthModal } = useAuthStore();
  const navigate = useRouter();
  const { setTokensModal, tokens } = usePaymentStore();

  const getTokensHandle = () => {
    setTokensModal(true);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="fixed bg-[#191B2C] top-0 left-0 z-50 w-full py-[6px] md:py-[14px] md:relative">
      <div className="container">
        <div className="flex justify-between items-center font-bai-jamjuree">
          <div className="flex items-center gap-[14px]">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex-col h-[12px] w-[18px] gap-[4px] hidden md:flex"
            >
              <span
                className={clsx(
                  "block h-[2px] w-full rounded-[5px] bg-white transition-transform duration-300",
                  {
                    "origin-[2px] rotate-[45deg] sm:origin-[0.356vw]":
                      isMenuOpen,
                  },
                )}
              />
              <span
                className={clsx(
                  "block h-[2px] w-full rounded-[5px] bg-white transition-opacity duration-300",
                  {
                    "opacity-0": isMenuOpen,
                  },
                )}
              />
              <span
                className={clsx(
                  "block h-[2px] w-full rounded-[5px] bg-white transition-transform duration-300",
                  {
                    "origin-[1px] rotate-[-45deg] sm:origin-[0.565vw]":
                      isMenuOpen,
                  },
                )}
              />
            </button>
            <Link
              href="/"
              className="font-bold block text-[20px] tracking-[0.04em] sm:text-[5.33vw] "
            >
              <span className="logo-gradient">Ai</span>
              <span>Go</span>
            </Link>
          </div>

          {loading ? (
            <div className="animate-pulse block main-gradient h-[27px] w-[72px] flex items-center rounded-[8px] " />
          ) : user && !user?.isAnonymous ? (
            <div className="flex gap-2">
              <button
                onClick={getTokensHandle}
                className="block main-gradient h-[24px] rounded-[15px] px-[12px]"
              >
                <span className="relative z-[5] flex items-center">
                  <Image
                    src={IcnPlus.src}
                    width={IcnPlus.width}
                    height={IcnPlus.height}
                    alt="plus image"
                    className="size-[8px]"
                  />
                  <span className="text-[12px] font-bold pl-[8px] pr-[4px]">
                    {tokens}
                  </span>
                  <Image
                    src={IcnCoins.src}
                    width={IcnCoins.width}
                    height={IcnCoins.height}
                    alt="coins image"
                  />
                </span>
              </button>
              <button
                onClick={handleSignOut}
                className="animate-fadeIn relative gradient-border logo-gradient flex items-center justify-center gap-[8px] w-[64px] h-[24px]"
              >
                <span className="shrink-0 text-[12px] font-semibold">
                  Sign out
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                setAuthModal({ modalType: "login", isAuthModalActive: true })
              }
              className="animate-fadeIn main-gradient px-[12px] h-[24px] font-bold text-[12px] rounded-[8px] md:px-[12px] md:h-[27px] md:text-[14px]"
            >
              <span className="relative z-[5]">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
