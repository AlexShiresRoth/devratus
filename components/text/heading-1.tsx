import React from 'react'
type Props = {
    children: React.ReactNode
}

const Heading1 = ({children}: Props) => {
  return <h1 className='font-bold text-7xl text-slate-200'>{children}</h1>
}

export default Heading1