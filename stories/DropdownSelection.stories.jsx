import { DropdownSelection } from '../src'
import _ from 'lodash'

export default {
  title: 'DropdownSelection',
  component: DropdownSelection,
  parameters: {
    layout: 'centered',
  },
}

export const Playground = {
  args: {
    options: [
      { label: 'Wien', value: 'Wien' },
      { label: 'Salzburg', value: 'Salzburg' },
      { label: 'St. Pölten', value: 'St. Pölten' },
      { label: 'Graz', value: 'Graz' },
      { label: 'Linz', value: 'Linz' },
      { label: 'Very very', value: 'LlongInz' },
    ],
  },
}

export const CloseOutside = {
  render: () => {
    return (
      <div className='flex gap-3'>
        <DropdownSelection
        multiple
          options={[
            { label: 'Wien', value: 'Wien' },
            { label: 'Salzburg', value: 'Salzburg' },
            { label: 'St. Pölten', value: 'St. Pölten' },
            { label: 'Graz', value: 'Graz' },
            { label: 'Linz', value: 'Linz' },
            { label: 'Very very', value: 'LlongInz' },
          ]}
        />
         <DropdownSelection
         multiple
          options={[
            { label: 'Wien', value: 'Wien' },
            { label: 'Salzburg', value: 'Salzburg' },
            { label: 'St. Pölten', value: 'St. Pölten' },
            { label: 'Graz', value: 'Graz' },
            { label: 'Linz', value: 'Linz' },
            { label: 'Very very', value: 'LlongInz' },
          ]}
        />
      </div>
    )
  },
}
