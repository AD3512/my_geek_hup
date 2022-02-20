import classnames from 'classnames'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { RootState } from '@/types/store'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { changeActive, delChannel, addChannel } from '@/store/actions/home'
import { useState } from 'react'

type Props = {
  hide: () => void
}
const Channels = ({ hide }: Props) => {
  const { userChannels, allChannels, active } = useSelector(
    (state: RootState) => state.home
  )

  const dispatch = useDispatch()

  const selectChannels = _.differenceBy(allChannels, userChannels, 'id')

  const [isEdit, setIsEdit] = useState(false)

  console.log(isEdit, '编辑')

  // console.log(userChannels, selectChannels)
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon onClick={hide} type="icon-close" />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', isEdit ? 'edit' : '')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span
              className="channel-item-edit"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? '完成' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {/* <span className={classnames('channel-list-item')}>
              推荐
              <Icon type="icon-liebiao" />
            </span> */}
            {userChannels.map((item) => (
              <span
                key={item.id}
                onClick={() => {
                  if (isEdit) return
                  dispatch(changeActive(item.id))
                  hide()
                }}
                className={classnames(
                  'channel-list-item',
                  active === item.id ? 'selected' : ''
                )}
              >
                {item.name}
                {item.id !== 0 && (
                  <Icon
                    type="icon-guanbi"
                    onClick={() => dispatch(delChannel(item.id))}
                  />
                )}
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
              <span
                key={item.id}
                onClick={() => dispatch(addChannel(item))}
                className="channel-list-item"
              >
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
