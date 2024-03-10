import { DateTimeSelection } from '../src'
import _ from 'lodash'

export default {
  title: 'DateTimeSelection',
  component: DateTimeSelection,
  parameters: {
    layout: 'centered',
  },
}

export const Playground = {
  // args: {},
}

export const CloseOutside = {
  render: () => {
    return (
      <div className='flex gap-3'>
        <DateTimeSelection />
        <DateTimeSelection />
      </div>
    )
  },
}
