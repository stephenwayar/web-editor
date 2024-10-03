import React from 'react';
import { Group, rem } from '@mantine/core';
import type { EmbedType } from './EmbedModal';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

interface Props {
  handleEmbed: (type: EmbedType, imageFile?: FileWithPath) => void;
}

const PictureDropzone: React.FC<Props> = ({ handleEmbed }) => {
  return (
    <div className='space-y-2'>
      <h3 className="text-lg font-semibold text-[#333333]">
        Upload Image
      </h3>

      <p className="text-sm text-[#333333]">
        FILE UPLOAD
      </p>

      <Dropzone
        multiple={false}
        onReject={() => { }}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE} // Accepts all image formats
        onDrop={(files) => handleEmbed('picture', files[0])} // Calls handleEmbed if image is valid
        className='border-[1.5px] h-40 border-[#23803D] bg-[#FAFAFA]'
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              stroke={1.5}
              className='mb-20'
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              stroke={1.5}
              className='mb-20'
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <div className='mb-20'>
              <button onClick={close} className='text-[#010e05] px-4 py-2 rounded-md border border-[#23803D]'>
                Import image from device
              </button>
            </div>
          </Dropzone.Idle>
        </Group>
      </Dropzone>
    </div>
  );
}

export default PictureDropzone