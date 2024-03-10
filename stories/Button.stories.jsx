import { AiOutlineHome } from 'react-icons/ai'
import {Button} from '../src'
import _ from 'lodash'

export default {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
}

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
          <Button key={postion} icon={<AiOutlineHome />} tooltip='Tooltip' position={postion}>
            {_.startCase(postion)}
          </Button>
        ))}
      </div>
    )
  },
}


