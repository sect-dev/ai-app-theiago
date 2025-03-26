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
    <div className="py-[20px] space-y-[24px] fm:py-[5.33vw] sm:space-y-[6.40vw]">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="p-[12px] mb-[20px] init-page-gradient-border relative rounded-[24px] before:rounded-[24px] fm:mb-[5.33vw] fm:p-[3.20vw] fm:rounded-[6.40vw] fm:before:rounded-[6.40vw]">
          <div className="space-y-[8px] fm:space-y-[2.13vw]">
            <div className="relative">
              <input
                className={clsx("bg-[#21233A] border-[1px] border-transparent font-bai-jamjuree  px-[14px] pr-[130px] text-[14px] placeholder:text-[14px] h-[48px] w-full rounded-[16px] fm:text-[3.73vw] fm:px-[3.73vw] fm:placeholder:text-[3.73vw] fm:pr-[34.67vw] fm:rounded-[4.27vw] fm:h-[12.80vw]", {
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
                className="absolute right-[15px] top-1/2 translate-y-[-50%] fm:right-[2vw] fm:w-[26.13vw] fm:h-[10.33vw]"
              />
            </div>
            <div className="flex gap-[4px] fm:gap-[1.07vw]">
              <div className="w-full">
                <input
                  className={clsx("bg-[#21233A] border-[1px] border-transparent font-bai-jamjuree px-[14px] text-[14px] placeholder:text-[14px] h-[48px] w-full rounded-[16px] fm:text-[3.73vw] fm:placeholder:text-[3.73vw] fm:px-[3.73vw] fm:rounded-[4.27vw] fm:h-[12.80vw]",{
                    '!border-[#cc0000]': errors.expiration
                  })}
                  placeholder="Expiration"
                  {...register('expiration', { required: true })}
                />
                {/*{errors.expiration && <p>expiration name is required.</p>}*/}
              </div>
              <div className="w-full">
                <input
                  className={clsx("bg-[#21233A] border-[1px] border-transparent font-bai-jamjuree px-[14px] text-[14px] placeholder:text-[14px] h-[48px] w-full rounded-[16px] fm:text-[3.73vw] fm:placeholder:text-[3.73vw] fm:px-[3.73vw] fm:rounded-[4.27vw] fm:h-[12.80vw]", {
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
        <button className="relative overflow-hidden bg-button-gradient rounded-[24px] w-full h-[60px] text-white text-center fm:rounded-[6.40vw] fm:h-[16vw]">
          <span className="uppercase  font-bold font-noto text-[14px] fm:text-[3.73vw] fm:h-[3.73vw]">get your girlfriend</span>
          <span className="bg-white-gradient  animate-[moveRight_4.25s_ease-in_infinite_forwards] block rotate-[20deg] size-[125px] absolute -left-1/2 top-1/2 -translate-y-1/2" />
        </button>
        <p className="text-center font-bold text-center text-[12px] pt-[12px] fm:text-[3.20vw] fm:p-[3.20vw]">🔥 65,756 people received a girlfriend this week. 🔥</p>
      </form>
      <div className="flex items-center gap-[4px] bg-[#2B2D44] px-[14px] py-[8px] rounded-[12px] fm:py-[2.13vw] fm:px-[3.73vw] fm:gap-[1.07vw] fm:rounded-[3.20vw]">
        <Image
          src={IconMoneyback.src}
          width={IconMoneyback.width}
          height={IconMoneyback.height}
          alt="money back icon"
          className="mt-[5px] fm:mt-[1.33vw] fm:size-[6.40vw]"
        />
        <div>
          <p className="font-bold text-[28px] tracking-[-0,01em] fm:text-[7.47vw]">30 DAYS </p>
          <p className="text-[14px] font-bold tracking-[-0,01em] fm:text-[3.73vw]">Money back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;