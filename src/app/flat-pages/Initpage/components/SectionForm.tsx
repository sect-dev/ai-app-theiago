'use client'
import React from 'react';
import {CustomSelect} from '@/app/shared/ui/CustomSelect'
import Image from "next/image";
import IconMoneyback from '@/../public/images/icons/payment/icon-moneyback.svg';
import IconCards from '@/../public/images/icons/payment/icon-cards.webp';

import {useForm,Controller,SubmitHandler,FieldValues} from "react-hook-form";
import clsx from "clsx";

interface IFormData extends FieldValues {
  cardNumber: string
  expiration: string
  cvv: string
  countries: string
}

const SectionForm = () => {
  const {register, control, handleSubmit, formState: { errors, isValid },} = useForm<IFormData>();

  const options = [
    { value: 'FR', label: 'France' },
    { value: 'UAE', label: 'United Arabian Emirates' },
    { value: 'RU', label: 'Russia' },
    { value: 'USA', label: 'United States of America' },
  ]

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="py-[20px] space-y-[24px]">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="p-[12px] mb-[20px] init-page-gradient-border relative rounded-[24px] before:rounded-[24px]">
          <div className="space-y-[0.556vw] xxl:space-y-[8px] lg:space-y-[0.781vw] md:space-y-[0.981vw] sm:space-y-[2.222vw]">
            <div className="relative">
              <input
                className={clsx("bg-[#21233A] border-[1px] border-transparent font-bai-jamjuree text-[0.972vw] pl-[1.042vw] pr-[14vw] py-[0.942vw] w-full rounded-[1.111vw] placeholder:text-[0.972vw] xxl:h-[48px] xxl:text-[14px] xxl:placeholder:text-[14px] xxl:rounded-[16px] xxl:py-[15px] xxl:px-[15px] lg:placeholder:text-[1.367vw] lg:text-[1.367vw] lg:px-[1.465vw] lg:py-[1.365vw] md:px-[1.765vw] md:py-[1.665vw] md:placeholder:text-[1.667vw] md:text-[1.667vw] sm:placeholder:text-[3.889vw] sm:rounded-[4.444vw] sm:text-[3.889vw] sm:py-[3.567vw] sm:px-[4.167vw]", {
                  '!border-[#cc0000]': errors.cardNumber
                })}
                placeholder="Card number"
                {...register('cardNumber',{ required: true })}
              />
              <Image
                src={IconCards.src}
                width={IconCards.width}
                height={IconCards.height}
                alt="Card icon"
                className="absolute right-[15px] top-1/2 translate-y-[-50%]"
              />
            </div>
            <div className="flex gap-[0.556vw] pb-[0.667vw] xxl:pb-[0px] lg:pb-[0.977vw] md:pb-[1.217vw] sm:pb-[4.167vw]">
              <div className="w-full">
                <input
                  className={clsx("bg-[#21233A] border-[1px] border-transparent font-bai-jamjuree text-[0.972vw] px-[1.042vw] py-[0.942vw] w-full rounded-[1.111vw] placeholder:text-[0.972vw] xxl:h-[48px] xxl:text-[14px] xxl:placeholder:text-[14px] xxl:rounded-[16px] xxl:py-[15px] xxl:px-[15px] lg:placeholder:text-[1.367vw] lg:text-[1.367vw] lg:px-[1.465vw] lg:py-[1.365vw] md:px-[1.765vw] md:py-[1.665vw] md:placeholder:text-[1.667vw] md:text-[1.667vw] sm:placeholder:text-[3.889vw] sm:rounded-[4.444vw] sm:text-[3.889vw] sm:py-[3.567vw] sm:px-[4.167vw]",{
                    '!border-[#cc0000]': errors.expiration
                  })}
                  placeholder="Expiration"
                  {...register('expiration', { required: true })}
                />
                {/*{errors.expiration && <p>expiration name is required.</p>}*/}
              </div>
              <div className="w-full">
                <input
                  className={clsx("bg-[#21233A] border-[1px] border-transparent font-bai-jamjuree text-[0.972vw] px-[1.042vw] py-[0.942vw] w-full rounded-[1.111vw] placeholder:text-[0.972vw] xxl:h-[48px] xxl:text-[14px] xxl:placeholder:text-[14px] xxl:rounded-[16px] xxl:py-[15px] xxl:px-[15px] lg:placeholder:text-[1.367vw] lg:text-[1.367vw] lg:px-[1.465vw] lg:py-[1.365vw] md:px-[1.765vw] md:py-[1.665vw] md:placeholder:text-[1.667vw] md:text-[1.667vw] sm:placeholder:text-[3.889vw] sm:rounded-[4.444vw] sm:text-[3.889vw] sm:py-[3.567vw] sm:px-[4.167vw]", {
                    '!border-[#cc0000]': errors.cvv
                  })}
                  placeholder="Cvv"
                  type="password"
                  {...register('cvv', { required: true })}
                />
                {/*{errors.cvv && <p>cvv name is required.</p>}*/}
              </div>
            </div>
            <div>
              <Controller
                name="countries"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={options}
                  />
                )}
              />
              {/*<input*/}
              {/*  className="bg-[#21233A] font-bai-jamjuree text-[0.972vw] px-[1.042vw] py-[0.942vw] w-full rounded-[1.111vw] placeholder:text-[0.972vw]"*/}
              {/*  placeholder="Country"*/}
              {/*  {...register('country', { required: true,pattern: /\d+/ })}*/}
              {/*/>*/}
              {/*{errors.country && <p>country name is required.</p>}*/}
            </div>
          </div>
        </div>
        <button className="relative overflow-hidden bg-button-gradient rounded-[24px] w-full h-[60px] text-white text-center">
          <span className="uppercase  font-bold font-noto text-[14px]">get your girlfriend</span>
          <span className="bg-white-gradient  animate-[moveRight_4.25s_ease-in_infinite_forwards] block rotate-[20deg] size-[125px] absolute -left-1/2 top-1/2 -translate-y-1/2" />
        </button>
        <p className="text-center font-bold text-center text-[12px] pt-[12px]">🔥 65,756 people received a girlfriend this week. 🔥</p>
      </form>
      <div className="flex items-center gap-[4px] bg-[#2B2D44] px-[14px] py-[8px] rounded-[12px]">
        <Image
          src={IconMoneyback.src}
          width={IconMoneyback.width}
          height={IconMoneyback.height}
          alt="money back icon"
          className="mt-[5px]"
        />
        <div>
          <p className="font-bold text-[28px] tracking-[-0,01em]">30 DAYS </p>
          <p className="text-[14px] font-bold tracking-[-0,01em]">Money back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;