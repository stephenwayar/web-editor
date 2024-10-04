import React from 'react';
import { RichTextEditor } from '@mantine/tiptap';

const EditorToolbar = () => (
  <RichTextEditor.Toolbar className='w-fit border-[1.5px] mx-4'>
    <RichTextEditor.ControlsGroup>
      <RichTextEditor.Link />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.AlignLeft />
      <RichTextEditor.AlignRight />
      <RichTextEditor.AlignCenter />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
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