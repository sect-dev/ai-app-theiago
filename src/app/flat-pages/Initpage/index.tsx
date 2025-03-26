import React from 'react';
import Image from "next/image";
import ImageMain from '../../../../public/images/img/initpage/image-init.webp';
import IconGender from '@/../public/images/icons/icon-gender.svg';
import IconPaypal from '@/../public/images/icons/payment/icon-paypal.svg';
import SectionSelect from "@/app/flat-pages/Initpage/components/SectionSelect";
import SectionWithSwiper from "@/app/flat-pages/Initpage/components/SectionWithSwiper";
import SectionFooter from "@/app/flat-pages/Initpage/components/SectionFooter";
import SectionForm from "@/app/flat-pages/Initpage/components/SectionForm";
import SectionReviews from "@/app/flat-pages/Initpage/components/SectionReviews";
import SectionAdvantages from "@/app/flat-pages/Initpage/components/SectionAdvantages";
import SectionPlans from "@/app/flat-pages/Initpage/components/SectionPlans";
import PaymentDiscountBanner from "@/app/widgets/Payment/PaymentDiscountBanner";

const genderData = [
  {text: 'Calm introvert with charming personality', id: 2, image: IconGender},
  {text: 'Will share emotions with you', id: 3, image: IconGender},
  {text: 'Will behave XXX', id: 4, image: IconGender},
]

const Initpage = () => {
  return (
   <div>
     <div className="fm:hidden">
       <PaymentDiscountBanner />
     </div>
     <div className="animate-fadeIn w-full mx-auto max-w-[840px] pt-[24px] fm:pt-0">
       <div className="flex gap-[16px] fm:flex-col">
         <div className="w-full max-w-[365px] fm:order-[-1] fm:max-w-full">
           <div className="relative init-page-main h-[490px] fm:h-[120vw] sm:h-[150vw]">
             <Image
               src={ImageMain.src}
               fill
               alt="image"
               className="object-cover rounded-[32px] fm:rounded-none"
             />
           </div>
           <div className="relative mt-[-100px] z-[5] pl-[15px] fm:hidden">
             <p className="text-[28px] font-bold text-center mb-[15px]">Get closer to her</p>
             <SectionWithSwiper />
           </div>
         </div>
         <div className="bg-[#191B2C] py-[15px] rounded-[32px] order-[-1] max-w-[475px] px-[20px] fm:relative fm:z-[10] fm:mt-[-225px] fm:bg-transparent fm:max-w-full">
           <SectionSelect />
           <div className="space-y-[12px] fm:space-y-[3.08vw]">
             {genderData.map(item => {
               return (
                 <div key={item.id} className="flex items-center text-[14px] bg-[#2B2D44] rounded-[12px] px-[15px] py-[10px] font-semibold gap-[6px] fm:gap-[1.03vw] fm:rounded-[3.08vw] fm:px-[3.08vw] fm:py-[2.05vw] fm:text-[3.59vw]">
                   <Image
                     src={item.image.src}
                     width={item.image.width}
                     height={item.image.height}
                     alt="icon gender"
                     className="fm:size-[4.15vw]"
                   />
                   {item.text}
                 </div>
               )
             })}
           </div>
           <div className="hidden fm:pt-[24px] fm:block">
             <SectionWithSwiper />
           </div>
           <div className="hidden fm:py-[24px] fm:block">
             <PaymentDiscountBanner isMobileVersion />
           </div>
           <SectionAdvantages />
           <SectionPlans />
           <SectionReviews />
           <div className="space-y-[20px] pt-[10px] fm:space-y-[5.33vw]">
             <button className="bg-white w-full text-[#121423] h-[50px] text-[20px] font-medium rounded-[8px] flex items-center justify-center gap-[4px] fm:rounded-[2.13vw] fm:text-[5.33vw] fm:h-[13.33vw]">
               Pay with
               <span className="text-[23px] font-semibold tracking-[-0.015em]  fm:text-[6.13vw]">Pay</span>
             </button>
             <button className="rounded-full w-full h-[50px] text-[#121423] flex items-center justify-center gap-[12px] gap-[4px]l bg-[#FFC43A] text-[14px] font-semibold fm:gap-[3.20vw] fm:text-[3.73vw]  fm:h-[13.33vw]">
               <Image
                 src={IconPaypal.src}
                 width={IconPaypal.width}
                 height={IconPaypal.height}
                 alt="paypal icon"
                 className="fm:w-[16vw] fm:h-[3.73vw]"
               />
               Checkout
             </button>
           </div>
           <SectionForm />
           <SectionFooter />
         </div>
       </div>
     </div>
   </div>
  );
};

export default Initpage;