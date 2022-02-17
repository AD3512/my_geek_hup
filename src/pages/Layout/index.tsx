import styles from './index.module.scss'
import Icon from '@/components/Icon'

import { TabBar } from 'antd-mobile'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

// 二级路由组件
import Home from '@/pages/Home'
import Question from '@/pages/Question'
import Video from '@/pages/Video'
import Profile from '@/pages/Profile'
import PrivateRoute from '@/components/PrivateRoute'

export default function Layout() {
  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <Icon type="icon-huojian" />,
    },
    {
      key: '/home/question',
      title: '问答',
      icon: <Icon type="icon-youxi" />,
    },
    {
      key: '/home/video',
      title: '视频',
      icon: <Icon type="icon-wurenji" />,
    },
    {
      key: '/home/profile',
      title: '我的',
      icon: <Icon type="icon-jiqiren" />,
    },
  ]

  const location = useLocation()
  const { pathname } = location
  const history = useHistory()
  const setRouteActive = (value: string) => {
    history.push(value)
  }
  return (
    <div className={styles.layout}>
      {/* 二级路由 */}
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/home/question">
          <Question />
        </Route>
        <Route path="/home/video">
          <Video />
        </Route>
        <PrivateRoute component={Profile} path="/home/profile">
          <Profile />
        </PrivateRoute>
      </Switch>
      {/* 底部导航栏 */}
      <TabBar
        className="tabBar"
        activeKey={pathname}
        onChange={(value) => setRouteActive(value)}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}
