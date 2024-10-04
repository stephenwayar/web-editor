import React from "react";
import { Switch } from "@mantine/core";

interface Props {
  socialLinkProps: {
    platform: string;
    code: string;
    url: string;
  };
  setSocialLinkProps: React.Dispatch<React.SetStateAction<{
    platform: string;
    code: string;
    url: string;
  }>>
}

const SocialForm: React.FC<Props> = ({ socialLinkProps, setSocialLinkProps }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#333333]">
          SOCIAL MEDIA PLATFORM
        </label>

        <select
          value={socialLinkProps.platform}
          onChange={e => setSocialLinkProps({ ...socialLinkProps, platform: e.target.value })}
          className="border px-2 py-3 rounded-md border-[#23803D] outline-[#23803D]"
        >
          <option value='Facebook'>Facebook</option>
          <option value='Instagram'>Instagram</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#333333]">
          URL
        </label>

        <input
          type="text"
          value={socialLinkProps.url}
          placeholder="https://youtu.be/dCKrQQNF1Qs"
          onChange={({ target }) => setSocialLinkProps({ ...socialLinkProps, url: target.value })}
          className="border px-2 py-3 rounded-md border-[#23803D] outline-[#23803D]" />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#333333]">
          CODE
        </label>

        <input
          type='text'
          value={socialLinkProps.code}
          placeholder='<a className="normal">Facebook</a>'
          className="border px-2 py-3 rounded-md border-[#23803D] outline-[#23803D]" 
          onChange={({ target }) => setSocialLinkProps({ ...socialLinkProps, code: target.value })}
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <label className="text-sm text-[#333333]">
            Disable caption
          </label>
        </div>

        <div>
          <Switch defaultChecked color="#23803D" size="xs" />
        </div>
      </div>
    </div>
  )
}

export default SocialForm