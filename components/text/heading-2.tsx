import React from 'react'
type Props = {
    children: React.ReactNode
}

const Heading2 = ({children}: Props) => {
  return <h2 className='font-bold text-5xl text-slate-200'>{children}</h2>
}

export default Heading2