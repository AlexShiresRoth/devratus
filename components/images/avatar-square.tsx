import Image from 'next/image'
import React from 'react'

type Props = {
    url: string
}

const AvatarSquare = ({url}: Props) => {
  return (
     <div className="w-full h-20 rounded relative border-2 border-sky-400">
      <Image
        src={url}
        alt={"avatar image"}
        fill={true}
        className="object-center object-cover rounded"
      />
    </div>
  )
}

export default AvatarSquare