import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import socialIcon from '@/assets/imgs/social.png'

interface Props {
  icon: string;
  title: string;
  index: number;
  subtitle: string
  action: () => void;
}

const Embed: React.FC<Props> = ({ icon, title, subtitle, action, index }) => (
  <button onClick={action} className="flex px-4 py-2 hover:bg-[#F7FCF8] w-full items-start space-x-2">
    <div className="w-fit">
      {index === 2 ? (
        <Image
          priority
          alt="icon"
          width={18}
          height={18}
          src={socialIcon}
          className="mt-1"
        />
      ) : (
        <Icon
          width="20"
          height="20"
          color="#212121"
          icon={icon}
          className="mt-1"
        />
      )}
    </div>

    <div className="text-start text-[#010E05] space-y-1">
      <p className="font-[500]">
        {title}
      </p>

      <p className="text-xs text-[#343E37]">
        {subtitle}
      </p>
    </div>
  </button>
)

export default Embed