import { Node, mergeAttributes } from '@tiptap/core'

export const PictureNode = Node.create({
  name: 'picture',
  group: 'block',
  atom: true, // It’s an atomic node, meaning it can’t be split

  addAttributes() {
    return {
      src: {
        default: null, // The default source URL of the image
      },
      alt: {
        default: '', // Alternative text for accessibility
      },
    }
  },

  // Parse the HTML to recognize `img[src]` as this node
  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ]
  },

  // Render HTML for the image in the editor
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  // Define the view of the image node in the editor
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div'); // Create a div container
      const img = document.createElement('img'); // Create the image element
      img.src = node.attrs.src; // Set the source from the node attributes
      img.alt = node.attrs.alt || 'Picture'; // Set alt text for the image
      img.style.width = '100%'; // Set the width of the image to 100% using style
      img.height = 350; // Set a fixed height for the image (or adjust as needed)

      // Optionally, set some styles for better presentation
      dom.style.backgroundColor = 'black'; // Set background color to black
      dom.style.textAlign = 'center'; // Center-align the image in the div

      dom.appendChild(img); // Append the image to the container

      return {
        dom, // Return the DOM structure
      };
    };
  },
})