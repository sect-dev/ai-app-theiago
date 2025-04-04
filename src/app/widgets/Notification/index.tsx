import React from 'react';
import Image from 'next/image';
import IconNotification from '@/../public/images/icons/icon-notificaton-check.svg';
import { createRoot } from 'react-dom/client';
import Link from 'next/link';
import './styles.css'
import clsx from "clsx";

interface NotificationConfig {
  title: string;
  description: string;
  link?: string;
  type?: 'success' | 'error'
}

interface ReactRootContainerElement extends HTMLElement {
  _reactRootContainer?: {
    unmount: () => void;
  };
}

// Пример вызова
// notification.open({
//   title: 'Добро пожаловать!',
//   description: 'Вы успешно авторизировались',
// });

const Notification: React.FC<NotificationConfig> = ({ title, description, link, type }) => {
  const onClose = () => {
    const notificationElement = document.getElementById('notification') as ReactRootContainerElement | null;
    if (notificationElement) {
      const root = notificationElement._reactRootContainer;
      if (root) {
        root.unmount();
      }
      if (notificationElement.parentNode === document.body) {
        document.body.removeChild(notificationElement);
      }
    }
  };

  return (
    <div className={clsx("notification fixed top-[5vw] right-[5vw]  z-[200] w-[20vw] animate-fadeIn rounded-[1.042vw] sm:top-[5vw] sm:right-1/2 sm:translate-x-1/2 sm:h-[30vw] sm:w-[90vw] sm:rounded-[3.56vw]", {
      'success': type === 'success',
      'error': type === 'error'
    })}>
      <div className="relative size-full p-[1.04vw] sm:p-[5.56vw]">
        <div className="relative z-[1] flex gap-[10px]">
          <div className="size-[1.46vw] sm:size-[8.33vw]">
            <Image
              src={IconNotification.src}
              width={IconNotification.width}
              height={IconNotification.height}
              alt="check"
            />
          </div>
         <div>
           <div className="mb-[0.42vw] flex items-center gap-[0.82vw] sm:mb-[2.32vw] sm:gap-[3.32vw]">
             <h4 className="text-[1.25vw] font-semibold leading-[1.2em] sm:text-[5.67vw]">{title}</h4>
           </div>
           <p className="text-[0.83vw] leading-[1.2em] max-w-[10vw] sm:max-w-[50vw] sm:text-[3.89vw]">{description}</p>
           {link && (
             <Link
               href={link}
               className="mt-[0.5vw] block text-[1.04vw] text-blue underline hover:no-underline sm:mt-[3vw] sm:text-[4.26vw]"
             >
               Перейти в личный кабинет
             </Link>
           )}
         </div>
        </div>
        <button
          onClick={onClose}
          className="absolute right-[1.042vw] top-[1.042vw] z-10 size-[1.25vw] sm:right-[3.5vw] sm:top-[3.5vw] sm:size-[6.667vw]"
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5L19 19M5.00003 19L12 12L19 5" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const notification = {
  open: (config: NotificationConfig) => {
    const div = document.createElement('div');
    div.id = 'notification';
    document.body.appendChild(div);

    const root = createRoot(div);
    root.render(<Notification title={config.title} description={config.description} link={config.link ?? ''} type={config.type ?? 'success'} />);

    setTimeout(() => {
      const notificationElement = document.getElementById('notification');
      if (notificationElement && notificationElement.parentNode === document.body) {
        root.unmount();
        document.body.removeChild(notificationElement);
      }
    }, 4500);
  },
};

export default notification;
