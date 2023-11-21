import React from 'react'

function PrimaryButton({
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
      className={`rounded-lg border-2 p-3 border-[#3f9c14] bg-[rgba(63,156,20,.5)] ${className}`} 
      {...props}
    >
      <span className='text-miraplayMainText'>
        {text}
      </span>
    </button>
  )
}

export default PrimaryButton