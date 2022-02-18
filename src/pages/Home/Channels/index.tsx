import classnames from 'classnames'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { RootState } from '@/types/store'
import { useSelector } from 'react-redux'
import _ from 'lodash'

type Props = {
  hide: () => void
}
const Channels = ({ hide }: Props) => {
  const { userChannels, allChannels } = useSelector(
    (state: RootState) => state.home
  )

  const selectChannels = _.differenceBy(allChannels, userChannels, 'id')

  // console.log(userChannels, selectChannels)
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon onClick={hide} type="icon-close" />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit">编辑</span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {/* <span className={classnames('channel-list-item')}>
              推荐
              <Icon type="icon-liebiao" />
            </span> */}
            {userChannels.map((item) => (
              <span key={item.id} className={classnames('channel-list-item')}>
                {item.name}
                <Icon type="icon-close2" />
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {selectChannels.map((item) => (
              <span key={item.id} className="channel-list-item">
                {'+ ' + item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
