import { Node, mergeAttributes } from '@tiptap/core'

export const YoutubeNode = Node.create({
  name: 'youtube', // Name of the node
  group: 'block', // Group the node belongs to
  atom: true, // Indicate that the node is atomic (cannot be split)

  // Define attributes for the node
  addAttributes() {
    return {
      src: {
        default: null, // Default value for the source URL
      },
    }
  },

  // Specify how to parse HTML to create this node
  parseHTML() {
    return [
      {
        tag: 'iframe[src]', // Parse iframe elements with a src attribute
      },
    ]
  },

  // Render the HTML representation of the node
  renderHTML({ HTMLAttributes }) {
    return ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      height: '350', // Set iframe height
      width: '100%', // Set iframe width
      allowfullscreen: 'true', // Allow fullscreen mode
      referrerpolicy: 'strict-origin-when-cross-origin', // Set referrer policy
      style: 'background-color: black;', // Set background color for the iframe
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture', // Allow specific features
    })]
  },

  // Define how the node should be viewed in the editor
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div') // Create a container div
      const iframe = document.createElement('iframe') // Create the iframe element
      iframe.src = node.attrs.src // Set iframe source from node attributes
      iframe.width = '100%' // Set iframe width
      iframe.height = '350' // Set iframe height
      iframe.allowFullscreen = true // Enable fullscreen
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' // Allow specific features
      dom.style.backgroundColor = 'black'; // Set the background color of the container
      dom.appendChild(iframe) // Append the iframe to the container

      return {
        dom, // Return the DOM structure
      }
    }
  },
})