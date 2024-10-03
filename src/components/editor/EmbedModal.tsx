import React from "react";
import { Modal } from "@mantine/core";

export type EmbedType = 'picture' | 'video' | 'social'

interface Props {
  opened: boolean;
  close: () => void;
  embedType: EmbedType
  children: React.ReactNode;
  handleEmbed: (type: EmbedType) => void
}

const EmbedModal: React.FC<Props> = ({ opened, close, children, handleEmbed, embedType }) => {
  return (
    <Modal
      centered
      size={700}
      shadow="sm"
      zIndex={10000}
      opened={opened}
      onClose={close}
      title={
        <p className="text-[#010E05] font-semibold text-lg">Embed</p>
      }
      overlayProps={{
        style: { backgroundColor: '#BFBFBF' }
      }}
    >
      {children}

      <div className="space-x-3 mt-5">
        <button onClick={() => handleEmbed(embedType)} className='text-white px-4 py-2 font-semibold rounded-md bg-[#23803D]'>
          Embed
        </button>

        <button onClick={close} className='text-[#010e05] px-4 py-2 font-semibold rounded-md border border-[#23803D]'>
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default EmbedModal