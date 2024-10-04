import React from "react";

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

        <textarea
          value={socialLinkProps.code}
          placeholder='<a className="normal">Facebook</a>'
          onChange={({ target }) => setSocialLinkProps({ ...socialLinkProps, code: target.value })}
          className="border px-2 py-3 min-h-16 max-h-28 rounded-md border-[#23803D] outline-[#23803D]" />
      </div>
    </div>
  )
}

export default SocialForm