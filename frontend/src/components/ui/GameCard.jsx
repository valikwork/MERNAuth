import React from 'react'
import iconsSVGUrl from '../../assets/icons.svg'
import launcherToIconName from '../../utils/launcherToIconName';

export default function GameCard({ game }) {

  const { 
    genre, 
    commonGameName, 
    gameDescription, 
    gameImage, 
    inTop, 
    gameClass,
    gameLaunchers,
  } = game;

  return (
    <li className='flex flex-col max-w-[370px] w-full rounded-3xl overflow-hidden border-1 border-[#454545] bg-miraplayHeaderBackground' >
      <div className='topPart relative height-[495px]'>
        <img 
          src={gameImage}
          alt={commonGameName}
          className='object-cover object-center h-[335px] w-full'
        />
        <div className='absolute top-4 left-4 flex gap-4 items-center w-11/12'>
          {inTop && <span className='text-sm rounded-[10px] text-miraplayMainText bg-miraplayGreen px-[10px] py-[5px] backdrop-blur-md'>TOP</span>}
          <span className='text-sm rounded-[10px] text-miraplayMainText bg-[rgba(12,5,32,.25)] px-[10px] py-[5px] backdrop-blur-md'>{genre}</span>
          {gameClass && gameClass === 'STANDART' && <span className='text-sm ml-auto rounded-[10px] text-miraplayMainText bg-miraplayGreen px-[10px] py-[5px] backdrop-blur-md'>FREE</span>}
        </div>
      </div>
      <div className='bottomPart p-8 pb-10 relative'>
        {gameLaunchers.length > 0 && (
          <ul className='launchers absolute -top-4 left-4'>
            {gameLaunchers.map(launcher => (
              <li key={launcher} className='h-[40px] w-[40px] bg-miraplayHeaderBackground rounded-full flex justify-center items-center'>
                <svg  className='fill-white w-[25px] h-[25px]' fill='#fff'>
                  <use href={`${iconsSVGUrl}#icon-${launcherToIconName(launcher)}`}></use>
                </svg>
              </li>
            ))}
          </ul>
        )}
        <h5 className='truncate text-2xl text-miraplayMainText font-extrabold mb-6'>{commonGameName}</h5>
        {gameDescription && <p className='truncate line-clamp-3 whitespace-normal font-light text-sm text-miraplayMainText'>{gameDescription}</p>}
      </div>
    </li>
  )
}
