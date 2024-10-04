import React from 'react';
import type { Editor } from '@tiptap/react';
import { RichTextEditor } from '@mantine/tiptap';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Props {
  editor: Editor | null
}

const EditorToolbar: React.FC<Props> = ({ editor }) => (
  <RichTextEditor.Toolbar className='w-fit border-[1.5px] py-0 px-2 mx-4'>
    <RichTextEditor.ControlsGroup className='border-r-[1.5px] py-2 pr-2'>
      <button 
        className='flex text-[#38413A] items-center space-x-3'
        onClick={() => {
          editor?.commands.insertContent('<br />'); // Insert the line break
          editor?.commands.focus('end'); // Move the cursor to the end of the content
        }} 
      >
        <p>Paragraph</p>
        <Icon
          width="22"
          height="22"
          color="#38413A"
          className="mt-1"
          icon='iconamoon:arrow-down-2'
        />
      </button>
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup className='border-r-[1.5px] py-2 pr-2 space-x-2'>
      <RichTextEditor.Link />

      <button 
        onClick={() => {
          const imageUrl = prompt("Enter image URL"); // Prompt user for the image URL
          if (imageUrl) {
            editor?.commands.insertContent(`<img src="${imageUrl}" alt="description" />`); // Insert image
            editor?.commands.focus('end'); // Move cursor to the end of the content
          }
        }}
      >
        <Icon
          width="18"
          height="18"
          color="#212121"
          icon='clarity:picture-solid'
          className="mt-1"
        />
      </button>
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup className='border-r-[1.5px] py-2 pr-2'>
      <RichTextEditor.AlignLeft />
      <RichTextEditor.AlignRight />
      <RichTextEditor.AlignCenter />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup className='border-r-[1.5px] py-2 pr-2'>
      <RichTextEditor.Bold />
      <RichTextEditor.Italic />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.BulletList />
      <RichTextEditor.OrderedList />
      <RichTextEditor.Blockquote />
    </RichTextEditor.ControlsGroup>
  </RichTextEditor.Toolbar>
)

export default EditorToolbar