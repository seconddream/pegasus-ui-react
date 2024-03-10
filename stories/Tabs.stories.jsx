import { AiOutlineDashboard, AiOutlineHome, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai'
import { Tabs,Tab } from '../src'
import _ from 'lodash'

export default {
  title: 'Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
}


export const ButtonStyle = {
  render: () => {
    return (
      <Tabs block onTabChange={console.log}>
        <Tab id='dashboard' title='Dashboard' icon={<AiOutlineDashboard />} >
          <div>Dashboard</div>
          <div>Dashboard</div>
        </Tab>
        <Tab id='profile' title='Profile' icon={<AiOutlineUser />} >
          <div>Profile</div>
          <div>Profile</div>
        </Tab>
        <Tab id='settings' title='Settings' icon={<AiOutlineSetting />} >
          <div>Settings</div>
          <div>Settings</div>
        </Tab>
      </Tabs>
    )
  },
}
