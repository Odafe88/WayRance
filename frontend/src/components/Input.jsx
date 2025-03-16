import React from 'react'

const FormInput = ({handleChange, label, ...props}) => {
  return (
    <div className="flex justify-center items-center gap-2 p-[10px] mb-4">
          <label>{label}</label>
          <input className="outline-none rounded text-black px-2" {...props} />
    </div>
  )
}

export default FormInput