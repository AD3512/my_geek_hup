// 引入样式
import styles from './index.module.scss'
// 引入组件库组件
import { Button, NavBar, Form, Input, Card, Toast } from 'antd-mobile'

import { useHistory } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputRef } from 'antd-mobile/es/components/input'

// 引入仓库方法
import { getCode, login } from '@/store/actions/login'
// 导入type类型
import { LoginFormType } from '@/types/data'
// import { AxiosError } from 'axios'

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  // 使用useRef存id
  let timeId = useRef<number>(-1)

  const [count, setCount] = useState(0)

  const [form] = Form.useForm()
  // 获取dom元素
  const mobileRef = useRef<InputRef>(null)
  // 点击导航返回
  const back = () => {
    history.go(-1)
  }

  // 提交表单验证登录
  const submitLoginInfo = async (values: LoginFormType) => {
    // 获取input错误信息
    console.log(values, 111)
    await dispatch(login(values))
    history.push('/home')
    Toast.show({
      icon: 'success',
      content: '登录成功',
      duration: 600,
    })

    // try {
    //   await dispatch(login(values))
    //   console.log('登陆成功')
    // } catch (e) {
    //   const error = e as AxiosError<{ message: string }>
    //   console.log(error.response?.data.message)
    // }
  }
  // 发送验证码
  const sendCode = async () => {
    if (count > 0) return
    // 获取input框内容
    const mobile = form.getFieldValue('mobile')
    // 获取input错误信息
    const error = form.getFieldError('mobile')
    // console.log(error, 444444)

    // 判断是否有内容是否是手机号
    if (mobile && error.length === 0) {
      await dispatch(getCode(mobile))
      setCount(60)
      // 小bug,报错 +window
      timeId.current = window.setInterval(() => {
        setCount((count) => {
          return count - 1
        })
      }, 1000)
    } else {
      Toast.show({ content: error })
      // 手机号码对应文本框 DOM 元素
      const mobileInputDOM = mobileRef.current
      // focus() 就是用来获得焦点的一个方法，是 DOM 元素自己提供的
      mobileInputDOM?.focus()
      return
    }
  }

  // 倒计时为0 清除定时器
  useEffect(() => {
    if (count === 0) {
      clearInterval(timeId.current)
    }
  }, [count])
  // 组件销毁的时候，清理定时器
  useEffect(() => {
    return () => {
      clearInterval(timeId.current)
    }
  }, [])

  return (
    <div className={styles.login}>
      <NavBar onBack={back}>登录</NavBar>
      <Card title="短信登录">
        <Form
          form={form}
          onFinish={submitLoginInfo}
          initialValues={{ mobile: '18756859920', code: '246810' }}
          layout="horizontal"
          footer={
            <Button
              className="btn"
              block
              type="submit"
              color="warning"
              size="large"
            >
              登录
            </Button>
          }
        >
          <Form.Item label="">
            <Form.Item
              name="mobile"
              noStyle
              rules={[
                { required: true, message: '请输入手机号' },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误',
                },
              ]}
            >
              {/* <Input placeholder="请输入手机号" /> */}
              <Input placeholder="请输入手机号" ref={mobileRef} />
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="code"
            extra={
              <span onClick={() => sendCode()}>
                {count === 0 ? '发送验证码' : `${count}秒后重试`}
              </span>
            }
            rules={[
              { required: true, message: '请输入验证码' },
              {
                pattern: /^\d{6}$/,
                message: '必须是六位数字验证码',
              },
            ]}
          >
            <Input placeholder="请输入短信验证码" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
