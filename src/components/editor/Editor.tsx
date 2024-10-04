import React, { useEffect, useRef, useState } from 'react';
import { YoutubeNode } from './VideoNode';
import EditorToolbar from './EditorToolbar';
import { PictureNode } from './PictureNode';
import StarterKit from '@tiptap/starter-kit';
import type { EmbedType } from './EmbedModal';
import { useDisclosure } from '@mantine/hooks';
import { FileWithPath } from '@mantine/dropzone';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import SubScript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import EditorInsertButton from './EditorInsertButton';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { FloatingMenu, useEditor } from '@tiptap/react';
import Superscript from '@tiptap/extension-superscript';
import { getWordCount } from '@/helpers/functions/getWordCount';
import { convertToEmbedUrl } from '@/helpers/functions/convertToEmbedUrl';
import { convertImageToBase64 } from '@/helpers/functions/convertImageToBase64';

export default function Editor() {
  const maxWords = 1000
  const [wordCount, setWordCount] = useState(2)
  const [focus, setFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('Add post title')
  const [videoOpened, { open: openVideo, close: closeVideo }] = useDisclosure(false);
  const [socialOpened, { open: openSocial, close: closeSocial }] = useDisclosure(false);
  const [pictureOpened, { open: openPicture, close: closePicture }] = useDisclosure(false);
  const [videoProps, setVideoProps] = useState({
    provider: 'Youtube',
    url: ''
  })
  const [socialLinkProps, setSocialLinkProps] = useState({
    platform: 'Facebook',
    code: '', // No use case 
    url: ''
  })

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.focus(); // Focus the input when the component mounts
      input.setSelectionRange(input.value.length, input.value.length); // Move cursor to the end
    }
  }, []);

  const editor = useEditor({
    content: "<p>Add content</p>", // Initial content for the editor
    immediatelyRender: false, // Prevent rendering immediately

    onCreate({ editor }) {
      const text = editor.getText() // Get initial text content
      setWordCount(getWordCount(text)) // Initialize word count on editor creation
    },

    onUpdate({ editor }) {
      const text = editor.getText() // Get current text from editor
      const currentWordCount = getWordCount(text) // Calculate current word count

      // If the word count exceeds the maxWords limit, revert the last change
      if (currentWordCount > maxWords) {
        const truncatedText = text.split(/\s+/).slice(0, maxWords).join(' ') // Limit the text to 1000 words
        editor.commands.setContent(truncatedText) // Replace content with the truncated version
        setWordCount(maxWords) // Set word count to the max limit
      } else {
        setWordCount(currentWordCount) // Update word count if within limits
      }
    },

    extensions: [
      Link, // Extension for link functionality
      Underline, // Extension to support underlining text
      SubScript, // Extension for subscript text
      Highlight, // Extension to highlight text
      StarterKit, // Basic setup for the editor
      YoutubeNode, // Custom extension to embed YouTube videos
      Superscript, // Extension for superscript text
      PictureNode, // Custom extension for embedding pictures
      TextAlign.configure({ types: ['heading', 'paragraph'] }), // Extension for text alignment in headings and paragraphs
    ],
  });

  const handleEmbed = (type: EmbedType, imageFile?: FileWithPath) => {
    switch (type) {
      case 'picture':
        if (imageFile) {
          // Convert the image file to base64 and insert it into the editor
          convertImageToBase64(imageFile).then(base64Image => {
            editor?.commands.insertContent({
              type: 'picture', // Inserting a picture node
              attrs: {
                src: base64Image, // Set the image source to the base64 string
                alt: 'Uploaded Image', // Default alt text for accessibility
              },
            });
          });

          closePicture() // Close the image modal or UI component
        }
        break;

      case 'video':
        // Insert a YouTube video node into the editor
        if (videoProps.url) {
          editor?.commands.insertContent({
            type: 'youtube', // Inserting a YouTube node
            attrs: {
              anonymous: true, // Some property related to video
              src: convertToEmbedUrl(videoProps.url), // Convert the URL to an embeddable YouTube link
            },
          });

          setVideoProps({ ...videoProps, url: '' }) // Reset the video URL state
          closeVideo() // Close the video modal or UI component
        }
        break;

      case 'social':
        // Add a link to the page with the URL as both the text and link
        if (socialLinkProps.url) {
          editor?.commands.insertContent({
            type: 'paragraph', // Paragraph tag
            content: [
              {
                type: 'text', // Insert text node first
                text: `${socialLinkProps.platform} Link: ${socialLinkProps.url}`, 
              },
            ],
          });

          // Reset the social link properties after inserting
          setSocialLinkProps({ ...socialLinkProps, url: '' });
          closeSocial() // Close the modal 
        }
        break;

      default:
        // Handle invalid embed type ** This block will never fire **
        console.error('Invalid embed type provided');
    }
  };

  return (
    <div className='w-full max-w-[50rem] mx-auto'>
      <div className="border-[1px] min-h-[40rem] bg-white rounded-md border-[#ced4da] flex flex-col">
        <div className="mt-12 border-b-[1px] border-[#ced4da]" />

        <div className='mx-4 my-2'>
          <input
            type='text'
            value={title}
            ref={inputRef}
            placeholder='Title'
            onChange={({ target }) => setTitle(target.value)}
            className='border-none outline-none py-3 w-full text-[#343e37] bg-transparent font-bold text-3xl'
          />
        </div>

        <RichTextEditor className='border-none flex-grow flex flex-col bg-transparent' editor={editor}>
          {focus && <EditorToolbar />}

          {editor && (
            <div key='floating-menu'>
              <FloatingMenu editor={editor}>
                <EditorInsertButton
                  openVideo={openVideo}
                  closeVideo={closeVideo}
                  openSocial={openSocial}
                  videoProps={videoProps}
                  openPicture={openPicture}
                  videoOpened={videoOpened}
                  closeSocial={closeSocial}
                  handleEmbed={handleEmbed}
                  closePicture={closePicture}
                  socialOpened={socialOpened}
                  pictureOpened={pictureOpened}
                  setVideoProps={setVideoProps}
                  socialLinkProps={socialLinkProps}
                  setSocialLinkProps={setSocialLinkProps}
                />
              </FloatingMenu>
            </div>
          )}

          <RichTextEditor.Content
            onFocus={() => setFocus(true)}
          />

          <div className='w-full py-2 border-t-[1px] px-4 text-right text-[#343e37] text-sm border-[#ced4da] mt-auto'>
            {wordCount}/{maxWords} words
          </div>
        </RichTextEditor>
      </div>

      <div className='flex justify-end mt-5'>
        <button className='text-white px-4 py-2 font-semibold rounded-md bg-[#23803D]'>
          Post
        </button>
      </div>
    </div>
  );
}