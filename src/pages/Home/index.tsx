import styles from './index.module.scss'
import { Popup, Tabs } from 'antd-mobile'
import Icon from '@/components/Icon'
import { useState } from 'react'
import { getAllChannels, getChannels } from '@/store/actions/home'
import { useInitalState } from '@/utils/hooks'
import Channels from './Channels'
export default function Home() {
  const [visible, setVisible] = useState(false)

  const show = () => {
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }

  const { userChannels } = useInitalState(getChannels, 'home')
  const { allChannels } = useInitalState(getAllChannels, 'home')

  // const selectChannels = allChannels.filter((item) => {
  //   const index = userChannels.findIndex((obj) => obj.id === item.id)
  //   return index === -1
  // })

  // console.log(selectChannels, 445)

  return (
    <div className={styles.home}>
      {/* 顶部导航 */}
      <Tabs defaultActiveKey="0">
        {userChannels.map((item) => (
          <Tabs.Tab title={item.name} key={item.id}>
            {item.id + '---------------' + item.name}
          </Tabs.Tab>
        ))}
      </Tabs>
      <div className="right_icon">
        <Icon type="icon-sousuo" className="my_icon"></Icon>
        <Icon type="icon-liebiao" className="my_icon" onClick={show}></Icon>
      </div>
      <Popup position="left" visible={visible}>
        <Channels hide={hide}></Channels>
      </Popup>
    </div>
  )
}
