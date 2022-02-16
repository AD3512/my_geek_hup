import MyNavBar from '@/components/MyNavBar'
import { getUserProfile, quitLogin } from '@/store/actions/profile'
import { removeToken } from '@/utils/token'
import { Button, DatePicker, Dialog, List, Popup } from 'antd-mobile'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { useInitalState } from '@/utils/hooks'
import Edit from './components/Edit'
import { editInfo } from '@/store/actions/profile'
import { useDispatch } from 'react-redux'

export type visibleRightType = {
  visibleRight: boolean
  type: type
}
export type type = '' | 'name' | 'intro' | 'birthday' | 'gender' | 'photo'

export default function User() {
  const history = useHistory()
  const dispatch = useDispatch()

  // --------------------------------修改日期------------------------------
  const dayjs = require('dayjs')

  const { userProfile } = useInitalState(getUserProfile, 'profile')

  const [showBirthday, setShowBirthday] = useState(false)
  const [birthday, setBirthday] = useState(userProfile.birthday)

  const onBirthdayShow = () => {
    setShowBirthday(true)
  }
  const onBirthdayHide = () => {
    setShowBirthday(false)
  }
  // -----------------------------修改头像 性别----------------------------------
  const [photoVs, setPhotoVs] = useState(false)
  const [sex, setSex] = useState('')
  const handel = (type: 'gender' | 'photo') => {
    setPhotoVs(true)
    setSex(type)
  }
  // 修改性别
  const handelSex = (type: 'gender' | 'photo', value: string) => {
    setPhotoVs(false)
    submit(type, value)
  }

  // ------------------------------修改昵称 简介----------------------------
  const [visibleRight, setVisibleRight] = useState<visibleRightType>({
    visibleRight: false,
    type: '',
  })
  const initVisibleRight: visibleRightType = {
    visibleRight: false,
    type: '',
  }
  const hideVisibleRight = () => {
    setVisibleRight(initVisibleRight)
  }
  // -------------------------提交修改-------------------------
  const submit = (type: type, value: string) => {
    console.log(type, value, 77777)
    hideVisibleRight()
    dispatch(editInfo(type, value))
  }

  // -----------------------------退出登录---------------------
  const Quit = async () => {
    const result = await Dialog.confirm({
      header: '温馨提示',
      content: '亲,确定要退出吗?',
    })
    // 确认退出
    if (result) {
      // 清空仓库
      quitLogin()
      // 删token
      removeToken()
      // 跳到登录页
      history.push('/login')
    }
  }

  return (
    <div className={styles.user}>
      <MyNavBar>个人信息</MyNavBar>
      <List>
        <List.Item
          extra={
            <img
              className="user_photo"
              src={userProfile.photo}
              alt="头像"
            ></img>
          }
          clickable
          onClick={() => handel('photo')}
        >
          头像
        </List.Item>
        <List.Item
          extra={userProfile.name}
          clickable
          onClick={() =>
            setVisibleRight({
              visibleRight: true,
              type: 'name',
            })
          }
        >
          昵称
        </List.Item>
        <List.Item
          extra={userProfile.intro || '未填写'}
          clickable
          onClick={() =>
            setVisibleRight({
              visibleRight: true,
              type: 'intro',
            })
          }
        >
          简介
        </List.Item>
      </List>
      <List>
        <List.Item
          extra={userProfile.gender === 0 ? '男' : '女'}
          clickable
          onClick={() => handel('gender')}
        >
          性别
        </List.Item>
        <List.Item
          extra={userProfile.birthday}
          clickable
          onClick={() => onBirthdayShow()}
        >
          生日
        </List.Item>
      </List>
      <div className="user_foot">
        <Button onClick={Quit}>退出登录</Button>
      </div>
      {/* ---------------------------弹出层------------------------------- */}
      <Popup
        className="aa"
        visible={photoVs}
        onMaskClick={() => {
          setPhotoVs(false)
        }}
      >
        {sex === 'photo' ? (
          <List className="photo">
            <List.Item style={{ textAlign: 'center' }}>拍照</List.Item>
            <List.Item style={{ textAlign: 'center' }}>本地选择</List.Item>
            <List.Item
              style={{ textAlign: 'center' }}
              arrow={false}
              onClick={() => setPhotoVs(false)}
            >
              取消
            </List.Item>
          </List>
        ) : (
          <List className="gender">
            <List.Item
              style={{ textAlign: 'center' }}
              arrow={false}
              onClick={() => handelSex('gender', '0')}
            >
              男
            </List.Item>
            <List.Item
              style={{ textAlign: 'center' }}
              arrow={false}
              onClick={() => handelSex('gender', '1')}
            >
              女
            </List.Item>
            <List.Item
              arrow={false}
              style={{ textAlign: 'center' }}
              onClick={() => setPhotoVs(false)}
            >
              取消
            </List.Item>
          </List>
        )}
      </Popup>

      {/* ------------------------------出生日期-------------------------------- */}
      <DatePicker
        visible={showBirthday}
        onClose={() => {
          onBirthdayHide()
        }}
        title="选择出生日期"
        min={new Date('1900-01-01')}
        value={new Date(birthday)}
        max={new Date()}
        onConfirm={(val) => submit('birthday', dayjs(val).format('YYYY-MM-DD'))}
        // onConfirm={(val) => console.log(dayjs(val).format('YYYY-MM-DD'))}
        // onConfirm={(val) => console.log(val)}
      ></DatePicker>
      {/* -----------------------------右侧弹出层-------------------------- */}
      <Popup
        destroyOnClose
        className="right_viseble"
        visible={visibleRight.visibleRight}
        position="right"
        onMaskClick={() => {
          hideVisibleRight()
        }}
        bodyStyle={{ minWidth: '100vw' }}
      >
        <Edit hide={hideVisibleRight} submit={submit}>
          {visibleRight.type}
        </Edit>
      </Popup>
    </div>
  )
}
