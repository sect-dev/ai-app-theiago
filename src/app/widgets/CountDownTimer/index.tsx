'use client';
import {FC, useEffect, useRef, useState} from 'react';
import clsx from "clsx";

const COUNTDOWN_DURATION = 5 * 60 * 1000;

interface ComponentProps {
  isVisible: boolean
  setIsVisible: (value: boolean) => void
  className?:string
}

const CountDownTimer:FC<ComponentProps> = ({isVisible,setIsVisible, className}) => {
  const [timeLeft, setTimeLeft] = useState<number>(COUNTDOWN_DURATION);
  const timerStartedRef = useRef(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedStartTime = localStorage.getItem('timerStart');
    const startTime = storedStartTime ? parseInt(storedStartTime) : Date.now();

    if (!storedStartTime) {
      localStorage.setItem('timerStart', startTime.toString());
    }

    const updateTimer = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = COUNTDOWN_DURATION - elapsedTime;
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        setTimeLeft(0);
        setIsVisible(false);
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timerStartedRef.current) {
          timerStartedRef.current = true;
          setTimeLeft((prev) => (prev > 0 ? prev : 0));
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div ref={observerRef} className={clsx("relative flex justify-center text-[#F80C2B] text-[12px] items-center bg-[#191B2C] overflow-hidden countdown-bg px-[12px] h-[24px] rounded-[7px]", className)}>
      <span className="relative z-[5]  font-bold ">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default CountDownTimer;