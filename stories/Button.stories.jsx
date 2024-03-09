import { AiOutlineHome } from 'react-icons/ai'
import {Button} from '../src/components'
import _ from 'lodash'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Button',
  component: Button,
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
    children: 'Button',
  },
}

export const TypeVariations = {
  render: () => {
    return (
      <div className='flex gap-2'>
        {['primary', 'secondary', 'transparent'].map((type) => (
          <Button key={type} type={type} icon={<AiOutlineHome />}>
            {_.startCase(type)}
          </Button>
        ))}
      </div>
    )
  },
}

export const SizeVariations = {
  render: () => {
    return (
      <div className='flex gap-2'>
        {['lg', 'md', 'sm', 'xs'].map((size) => (
          <Button key={size} size={size} type='secondary' icon={<AiOutlineHome />}>
            {`Size ${size}`}
          </Button>
        ))}
      </div>
    )
  },
}

export const StateVariations = {
  render: () => {
    return (
      <div className='flex gap-2'>
        <Button loading icon={<AiOutlineHome />}>Loading</Button>
        <Button error icon={<AiOutlineHome />}>Error</Button>
        <Button success icon={<AiOutlineHome />}>Success</Button>
        <Button disabled icon={<AiOutlineHome />}>Disabled</Button>
        <Button danger icon={<AiOutlineHome />}>Danger</Button>
      </div>
    )
  },
}
export const WithToolTip = {
  render: () => {
    return (
      <div className='flex gap-2'>
        {['top', 'bottom'].map((postion) => (
          <Button key={postion} icon={<AiOutlineHome />} tooltips='Tooltips' position={postion}>
            {_.startCase(postion)}
          </Button>
        ))}
      </div>
    )
  },
}


