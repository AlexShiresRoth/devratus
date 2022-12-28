import Image from "next/image";
import React from "react";

type Props = {
  url: string;
};

const Avatar = ({ url }: Props) => {
  if (!url) return null;
  return (
    <div className="w-8 h-8 rounded-full relative border-2 border-sky-400">
      <Image
        src={url}
        alt={"avatar image"}
        fill={true}
        className="object-center object-cover rounded-full"
      />
    </div>
  );
};

export default Avatar;
