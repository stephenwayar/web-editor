import React, { useState } from "react";
import Embed from "./Embed";
import VideoForm from "./VideoForm";
import { Icon } from '@iconify/react';
import SocialForm from "./SocialForm";
import { Popover } from "@mantine/core";
import PictureDropzone from "./PictureDropzone";
import EmbedModal, { EmbedType } from "./EmbedModal";

interface Props {
  videoOpened: boolean;
  socialOpened: boolean;
  openVideo: () => void;
  pictureOpened: boolean
  closeVideo: () => void;
  openSocial: () => void;
  openPicture: () => void;
  closeSocial: () => void;
  closePicture: () => void;
  videoProps: {
    provider: string;
    url: string;
  };
  setVideoProps: React.Dispatch<React.SetStateAction<{
    provider: string;
    url: string;
  }>>;
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
  handleEmbed: (type: EmbedType) => void
}

const EditorInsertButton: React.FC<Props> = ({ 
  openVideo,
  videoProps,
  closeVideo,
  openSocial,
  closeSocial,
  handleEmbed,
  openPicture,
  videoOpened,
  closePicture,
  socialOpened,
  pictureOpened,
  setVideoProps,
  socialLinkProps,
  setSocialLinkProps
}) => {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const embeds = [
    {
      title: 'Picture',
      action: () => {
        openPicture()
        setPopoverOpened(false)
      },
      subtitle: 'Jpeg, png',
      icon: 'clarity:picture-solid',
    },
    {
      title: 'Video',
      action: () => {
        openVideo()
        setPopoverOpened(false)
      },
      icon: 'icon-park-solid:video-one',
      subtitle: 'JW player, Youtube, Vimeo',
    },
    {
      title: 'Social',
      action: () => {
        openSocial()
        setPopoverOpened(false)
      },
      icon: 'ph:play-fill',
      subtitle: 'Instagram, Twitter, Tiktok, Snapchat, Facebook',
    }
  ]

  return (
    <React.Fragment>
      <Popover
        withArrow
        shadow="sm"
        width={350}
        arrowSize={0}
        position="bottom"
        opened={popoverOpened}
        onChange={setPopoverOpened}
        offset={{ mainAxis: 10, crossAxis: 155 }}
      >
        <Popover.Target>
          <button onClick={() => setPopoverOpened((o) => !o)} className="bg-[#E8F1E9] rounded-full p-2">
            <Icon
              width="18"
              height="18"
              color="#212121"
              icon="octicon:plus-16"
            />
          </button>
        </Popover.Target>

        <Popover.Dropdown className="px-0 space-y-2">
          <h3 className="text-[#333333] px-4 text-sm">
            EMBEDS
          </h3>

          <div>
            {embeds.map((embed, index: number) => (
              <Embed
                key={index}
                icon={embed.icon}
                title={embed.title}
                action={embed.action}
                subtitle={embed.subtitle}
              />
            ))}
          </div>
        </Popover.Dropdown>
      </Popover>

      <EmbedModal
        embedType='picture'
        close={closePicture}
        opened={pictureOpened}
        handleEmbed={handleEmbed}
      >
        <PictureDropzone 
          handleEmbed={handleEmbed} 
        />
      </EmbedModal>

      <EmbedModal
        embedType='video'
        close={closeVideo}
        opened={videoOpened}
        handleEmbed={handleEmbed}
      >
        <VideoForm 
          videoProps={videoProps}
          setVideoProps={setVideoProps}
        />
      </EmbedModal>

      <EmbedModal
        embedType='social'
        close={closeSocial}
        opened={socialOpened}
        handleEmbed={handleEmbed}
      >
        <SocialForm
          socialLinkProps={socialLinkProps}
          setSocialLinkProps={setSocialLinkProps}
        />
      </EmbedModal>
    </React.Fragment>
  )
}

export default EditorInsertButton