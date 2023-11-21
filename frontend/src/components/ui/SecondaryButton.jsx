import React from 'react'

export default function SecondaryButton({
  text = 'Click',
  type = 'button',
  onClick,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick ? onClick : null} 
      className={`rounded-lg border-2 p-3 border-[#454545] ${className}`} 
      {...props}
    >
      <span className='text-miraplayMainText'>
        {text}
      </span>
    </button>
  )
}
