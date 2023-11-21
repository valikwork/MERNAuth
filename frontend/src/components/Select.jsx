import React, { useState, useEffect } from 'react'
import iconsSVGUrl from '../assets/icons.svg'

export default function Select({
  name = 'Sort',
  options = [],
  setSelectedItem = () => '',
  defaultValue = options[0],
}) {

  const [selected, setSelected] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelectedItem(selected)
  }, [setSelectedItem, selected, isOpen])

  useEffect(() => {
    setSelected(defaultValue)
  }, [defaultValue])

  return (
    <div className='flex'>
      <h4 className='text-miraplayMainText font-light mr-2'>{name}:</h4>
      <div className='flex items-center justify-end gap-2 relative min-w-[140px]'>
          <p
            className='text-miraplayMainText font-light'
            onClick={() => options.length !== 1 && setIsOpen(prev => !prev)}
          >
            {selected}
          </p>
          {options.length !== 1 &&
           <svg className={`w-2 h-2 ease-linear ${isOpen ? 'rotate-90' : '-rotate-90'}`} fill='#fff'>
              <use href={`${iconsSVGUrl}#icon-swipe-next`}/>
          </svg>}
          {isOpen && options.length !== 1 && (
            <ul className='absolute top-[105%] right-0 w-full bg-miraplayHeaderBackground border-1 border-[#454545] rounded-xl flex flex-col '>
              {options.map(el => {
                    return (
                        selected !== el && <li 
                        key={el} 
                        className='text-miraplayMainText font-light h-[35px] w-full flex justify-center items-center' 
                        onClick={() => {
                          setIsOpen(false)
                          setSelected(el)
                      }
                      }>
                        {el}
                      </li>
                    )
                })
              }
            </ul>
          )}
      </div>
  </div>
  )
}
