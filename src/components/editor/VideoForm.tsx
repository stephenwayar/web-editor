import React from "react";

interface Props {
  videoProps: {
    provider: string;
    url: string;
  };
  setVideoProps: React.Dispatch<React.SetStateAction<{
    provider: string;
    url: string;
  }>>;
}

const VideoForm: React.FC<Props> = ({ videoProps, setVideoProps }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#333333]">
          VIDEO PROVIDER
        </label>

        <select
          value={videoProps.provider}
          onChange={e => setVideoProps({ ...videoProps, provider: e.target.value })}
          className="border px-2 py-3 rounded-md border-[#23803D] outline-[#23803D]"
        >
          <option value='Youtube'>Youtube</option>
          <option value='Vimeo' disabled>Vimeo</option>
          <option value='JW Player' disabled>JW Player</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#333333]">
          URL
        </label>

        <input
          type="text"
          value={videoProps.url}
          placeholder="https://youtu.be/dCKrQQNF1Qs"
          onChange={({ target }) => setVideoProps({ ...videoProps, url: target.value })}
          className="border px-2 py-3 rounded-md border-[#23803D] outline-[#23803D]" />
      </div>
    </div>
  )
}

export default VideoForm