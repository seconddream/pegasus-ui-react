import { AiOutlineDelete, AiOutlineHome, AiOutlineReload, AiOutlineSave } from 'react-icons/ai'
import { Button, Section } from '../src'
import _ from 'lodash'
import { Fragment } from 'react'

export default {
  title: 'Section',
  component: Section,
  parameters: {
    layout: 'padded',
  },
}

export const Playground = {
  args: {
    title: 'Section Title',
    tools: [
      <Button type='primary' icon={<AiOutlineSave />}>
        Save
      </Button>,
      <Button  icon={<AiOutlineReload />}>
        Reload
      </Button>,
    ],
    collapsible: true,
    errorMessage: 'Something went wrong!',
    summary: 'Summary when collapsed',
    children: (
      <Fragment>
        <div className='flex w-full h-40 bg-slate-100'>content</div>
        <div className='flex w-full h-40 bg-slate-100'>content</div>
      </Fragment>
    ),
  },
}

