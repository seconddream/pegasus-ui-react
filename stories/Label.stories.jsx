import { AiOutlineAim, AiOutlineHome } from 'react-icons/ai'
import Label from '../components/Label'
import _ from 'lodash'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Label',
  component: Label,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Playground = {
  args: {
    icon: <AiOutlineHome />,
    text: 'Label',
    onClose: undefined
  },
}

export const SizeVariations = {
  render: () => {
    return (
      <div className='flex gap-2'>
        {[ 'sm', 'xs'].map((size) => (
          <Label key={size} size={size} icon={<AiOutlineHome />} text={size} />
        ))}
      </div>
    )
  },
}
