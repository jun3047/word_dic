'use client'

import React from 'react';
import TrackButton from '@/app/feature/logging/TrackButton';

const WordBox = ({
  word,
  소속,
  active,
  setWord = undefined
}: {
  word: string;
  소속: string;
  active: boolean;
  setWord?: (text: string) => void
}) => {
  let bgColorClass;
  let borderColorClass;
  let textColorClass;
  let hoverBgColorClass;

  switch (소속) {
    case '화나다':
      borderColorClass = `border-red-main-color dark:border-c-red-50`;
      bgColorClass = `bg-red-main-color dark:bg-c-red-50`;
      hoverBgColorClass = `hover:bg-red-main-color dark:hover-c-red-50`;
      textColorClass = `text-red-main-color dark:text-c-red-50`;
      break;
    case '감동하다':
      borderColorClass = `border-orange-main-color dark:border-c-orange-50`;
      bgColorClass = `bg-orange-main-color dark:bg-c-orange-50`;
      hoverBgColorClass = `hover:bg-orange-main-color dark:hover-c-orange-50`;
      textColorClass = `text-orange-main-color dark:text-c-orange-50`;
      break;
    case '행복하다':
      borderColorClass = `border-yellow-main-color dark:border-c-yellow-50`;
      bgColorClass = `bg-yellow-main-color dark:bg-c-yellow-50`;
      hoverBgColorClass = `hover:bg-yellow-main-color dark:hover-c-yellow-50`;
      textColorClass = `text-yellow-main-color dark:text-c-yellow-50`;
      break;
    case '편안하다':
      borderColorClass = `border-green-main-color dark:border-c-green-50`;
      bgColorClass = `bg-green-main-color dark:bg-c-green-50`;
      hoverBgColorClass = `hover:bg-green-main-color dark:hover-c-green-50`;
      textColorClass = `text-green-main-color dark:text-c-green-50`;
      break;
    case '슬프다':
      borderColorClass = `border-skyblue-main-color dark:border-c-skyblue-50`;
      bgColorClass = `bg-skyblue-main-color dark:bg-c-skyblue-50`;
      hoverBgColorClass = `hover:bg-skyblue-main-color dark:hover-c-skyblue-50`;
      textColorClass = `text-skyblue-main-color dark:text-c-skyblue-50`;
      break;
    case '무섭다':
      borderColorClass = `border-purple-main-color dark:border-c-purple-50`;
      bgColorClass = `bg-purple-main-color dark:bg-c-purple-50`;
      hoverBgColorClass = `hover:bg-purple-main-color dark:hover-c-purple-50`;
      textColorClass = `text-purple-main-color dark:text-c-purple-50`;
      break;
    case '지루하다':
      borderColorClass = `border-blue-main-color dark:border-c-blue-50`;
      bgColorClass = `bg-blue-main-color dark:bg-c-blue-50`;
      hoverBgColorClass = `hover:bg-blue-main-color dark:hover-c-blue-50`;
      textColorClass = `text-blue-main-color dark:text-c-blue-50`;
      break;
    case '싫다':
      borderColorClass = `border-grey-main-color dark:border-c-grey-50`;
      bgColorClass = `bg-grey-main-color dark:border-c-grey-50`;
      hoverBgColorClass = `hover:bg-grey-main-color dark:border-c-grey-50`;
      textColorClass = `text-grey-main-color dark:border-c-grey-50`;
      break;
    default:
      borderColorClass = ``;
      bgColorClass = ``;
      textColorClass = ``;
      hoverBgColorClass = ``;
  }

  textColorClass = active ? `text-white dark:text-bg` : `${textColorClass}`;
  bgColorClass = active ? `${bgColorClass}` : `${hoverBgColorClass}`;

  const handleClick = () => {
    if (setWord) setWord(word);
  }

  return (
    <TrackButton
      eventName={`click_wordBox-${word}`}
      onClick={handleClick}
      className={`transition-colors duration-300 ${setWord || 'pointer-events-none'} border-2 rounded-xl inline-flex items-center justify-center px-19r py-1r group ${borderColorClass} ${bgColorClass}`}
    >
      <p className={`transition-colors duration-300 body-text font-bold group-hover:text-white dark:group-hover:text-bg ${textColorClass} `}>{word}</p>
    </TrackButton>
  )
}

export default WordBox;