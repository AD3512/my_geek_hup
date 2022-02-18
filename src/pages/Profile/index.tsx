import Icon from '@/components/Icon'
import { Card, TabBar } from 'antd-mobile'
import styles from './index.module.scss'
import { getUser } from '@/store/actions/profile'
import { Link, useHistory } from 'react-router-dom'
import { useInitalState } from '@/utils/hooks'
export default function User() {
  const { user } = useInitalState(getUser, 'profile')
  const history = useHistory()

  const tabs1 = [
    {
      title: '动态',
      icon: <span>{user.art_count || 0}</span>,
    },
    {
      title: '关注',
      icon: <span>{user.follow_count || 0}</span>,
    },
    {
      title: '粉丝',
      icon: <span>{user.fans_count || 0}</span>,
    },
    {
      title: '被赞',
      icon: <span>{user.like_count || 0}</span>,
    },
  ]
  const tabs2 = [
    {
      title: '消息通知',
      icon: <Icon type="icon-lingsheng" />,
    },
    {
      title: '收藏',
      icon: <Icon type="icon-fankui-bangzhu" />,
    },
    {
      title: '阅读历史',
      icon: <Icon type="icon-shizhong" />,
    },
    {
      title: '我的作品',
      icon: <Icon type="icon-dengpao" />,
    },
  ]
  const tabs3 = [
    {
      key: '/opinion',
      title: '用户反馈',
      icon: <Icon type="icon-fankui-bangzhu" />,
    },
    {
      key: '/chat',
      title: '小智同学',
      icon: <Icon type="icon-kefuguanli" />,
    },
  ]
  const setRouteActive = (value: string) => {
    history.push(value)
  }

  return (
    <div className={styles.profile}>
      <div className="profile_head">
        <div className="left">
          <div
            className="headImg"
            style={{
              backgroundImage: `url(${user.photo})`,
            }}
          ></div>
          <h3 className="profile_name">{user.name}</h3>
        </div>
        <div className="right">
          <Link to="/user/profile">
            个人信息 <Icon type="icon-xiayige"></Icon>
          </Link>
        </div>
      </div>
      <TabBar className="profile_tabBar">
        {tabs1.map((item) => (
          <TabBar.Item key={item.title} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
      <Card className="profile_card">
        <TabBar>
          {tabs2.map((item) => (
            <TabBar.Item key={item.title} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </Card>
      <Card className="profile_card" title="更多服务">
        <TabBar onChange={(value) => setRouteActive(value)}>
          {tabs3.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </Card>
    </div>
  )
}
