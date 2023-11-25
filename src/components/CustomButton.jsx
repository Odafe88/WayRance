import React from 'react'

const CustomButton = ({content, ...props}) => {
  return (
    <div className="py-4">
      <button className="bg-yellow-500 text-[16px] font-semibold rounded-sm px-2 md:px-4 py-2 md:font-bold 
      " {...props}
      >
        {content}
      </button>
    </div>
  )
}

export default CustomButton