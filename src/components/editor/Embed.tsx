import React from "react";
import { Icon } from "@iconify/react";

interface Props {
  icon: string;
  title: string;
  subtitle: string
  action: () => void;
}

const Embed: React.FC<Props> = ({ icon, title, subtitle, action }) => (
  <button onClick={action} className="flex px-4 py-2 hover:bg-[#F7FCF8] w-full items-start space-x-2">
    <div>
      <Icon
        width="20"
        height="20"
        color="#212121"
        icon={icon}
        className="mt-1"
      />
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