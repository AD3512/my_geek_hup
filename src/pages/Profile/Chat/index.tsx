import Icon from '@/components/Icon'
import { getUser } from '@/store/actions/profile'
import { useInitalState } from '@/utils/hooks'
import { NavBar, Input, Button } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'

// webkit包
import io, { Socket } from 'socket.io-client'
import { getToken } from '@/utils/token'
import { realName } from '@/utils/request'

type MessageListType = { type: 'robot' | 'user'; text: string }[]
const Chat = () => {
  const history = useHistory()

  // 用于缓存 socket.io 客户端实例
  const clientRef = useRef<Socket | null>(null)

  // 用于操作聊天列表元素的引用
  const chatListRef = useRef<HTMLDivElement | null>(null)

  // 发请求拿用户最新的头像
  // ------------------当前用户信息
  const { user } = useInitalState(getUser, 'profile')
  //-----------------------输入框中的内容
  const [message, setMessage] = useState('')

  //--------------------聊天信息数据
  const [messageList, setMessageList] = useState<MessageListType>([
    { type: 'robot', text: '你好~我是小智同学' },
    {
      type: 'user',
      text: 'hello',
    },
  ])

  const onSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.code)
    if (e.code === 'Enter') {
      sendMessage()
    }
  }

  const sendMessage = () => {
    if (message.trim().length === 0) return
    // console.log(message)
    clientRef.current?.emit('message', {
      msg: message,
      timetamp: +new Date(),
    })
    setMessage('')
    setMessageList((messageList) => [
      ...messageList,
      { type: 'user', text: message },
    ])
  }

  // window.scroll(function () {
  //   console.log(chatListRef.current?.scrollHeight)
  //   console.log(chatListRef.current?.scrollTop)
  // })

  useEffect(() => {
    // 1.和服务器建立了链接
    const client = io(realName, {
      query: {
        token: getToken().token,
      },
      transports: ['websocket'],
    })

    // 将客户端实例缓存到 ref 引用中
    clientRef.current = client

    // 2.判断链接是否成功
    client.on('connect', () => {
      // console.log('链接了')
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: '你好~有什么可以帮你' },
      ])
    }) // 当和服务器建立连接成功，这个事件就会触发

    // 3.监听消息的接收

    client.on('message', (val: { msg: string; timestamp: number }) => {
      // console.log(val, 1111)
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: val.msg },
      ])
    })

    // 4.离开页面端口链接
    return () => {
      console.log('断开了')
    }
  }, [])

  useEffect(() => {
    const current = chatListRef.current
    // console.log(current, 55555555)
    if (current) {
      current.scrollTop = current.scrollHeight
    }
  }, [messageList])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={chatListRef}>
        {messageList.map((item, index) => {
          /* 机器人的消息 */
          if (item.type === 'robot') {
            return (
              <div key={index} className="chat-item">
                <Icon type="icon-kefuguanli" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            /* 用户的消息 */
            return (
              <div key={index} className="chat-item user">
                <img src={user.photo} alt="" />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Icon type="icon-bianji" className="edit" />
        <Input
          className="no-border"
          value={message}
          onChange={(e) => setMessage(e)}
          onKeyUp={onSendMessage}
          placeholder="请描述您的问题"
        />
        <Button className="btn" onClick={sendMessage}>
          发送
        </Button>
      </div>
    </div>
  )
}

export default Chat
