import { Input, NavBar, TextArea } from 'antd-mobile'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { useState } from 'react'
import { type } from '../..'
// import { visibleRightType } from '../..'
type Props = {
  submit: (type: type, value: string) => void
  hide: () => void
  children: type
}
export default function Edit(props: Props) {
  const name = useSelector((state: RootState) => state.profile.userProfile.name)
  const intro = useSelector(
    (state: RootState) => state.profile.userProfile.intro
  )

  const [value, setValue] = useState(
    props.children === 'name' ? name : intro === null ? '' : intro
  )

  const back = () => {
    props.hide()
  }

  return (
    <div className={styles.edit}>
      <NavBar
        onBack={back}
        right={
          <span
            style={{ color: 'orange' }}
            onClick={() => props.submit(props.children, value)}
          >
            提交
          </span>
        }
      >
        {props.children === 'name' ? '编辑昵称' : '编辑简介'}
      </NavBar>
      {props.children === 'name' ? (
        <Input
          className="input"
          placeholder="请输入昵称"
          value={value}
          onChange={(val) => {
            setValue(val)
          }}
        />
      ) : (
        <TextArea
          className="textArea"
          value={value}
          showCount
          maxLength={100}
          onChange={(val) => {
            setValue(val)
          }}
        />
      )}
    </div>
  )
}
