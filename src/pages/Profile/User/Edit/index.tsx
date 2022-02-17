import { Input, NavBar, TextArea } from 'antd-mobile'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { useEffect, useRef, useState } from 'react'
import { type } from '../'

import { InputRef } from 'antd-mobile/es/components/input'
import { TextAreaRef } from 'antd-mobile/es/components/text-area'
type Props = {
  submit: (type: type, value: string) => void
  hide: () => void
  children: type
}
export default function Edit(props: Props) {
  const inputRef = useRef<InputRef>(null)
  const textRef = useRef<TextAreaRef>(null)
  const name = useSelector((state: RootState) => state.profile.userProfile.name)
  const intro = useSelector(
    (state: RootState) => state.profile.userProfile.intro
  )

  const [value, setValue] = useState(
    props.children === 'name' ? name : intro || ''
  )

  const back = () => {
    props.hide()
  }
  useEffect(() => {
    if (props.children === 'name') {
      // 获取光标位置
      inputRef.current?.focus()
    } else {
      textRef.current?.focus()
      // 调整光标位置到最后
      document.querySelector('textarea')?.setSelectionRange(-1, -1)
    }
  }, [props.children])

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
          ref={inputRef}
          className="input"
          placeholder="请输入昵称"
          value={value}
          onChange={(val) => {
            setValue(val)
          }}
        />
      ) : (
        <TextArea
          ref={textRef}
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
