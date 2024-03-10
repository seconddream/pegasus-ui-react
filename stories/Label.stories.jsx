import { AiOutlineHome } from 'react-icons/ai'
import { Label } from '../src'
import _ from 'lodash'

export default {
  title: 'Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
}

export const Playground = {
  args: {
    icon: <AiOutlineHome />,
    text: 'Label',
    onClose: undefined,
  },
}

export const SizeVariations = {
  render: () => {
    return (
      <div className='flex gap-2'>
        {['sm', 'xs'].map((size) => (
          <Label key={size} size={size} icon={<AiOutlineHome />} text={size} />
        ))}
      </div>
    )
  },
}
