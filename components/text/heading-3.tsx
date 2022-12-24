import React from 'react'
type Props = {
    children: React.ReactNode
}

const Heading3 = ({children}: Props) => {
  return <h3 className='font-bold text-3xl text-slate-200'>{children}</h3>
}

export default Heading3