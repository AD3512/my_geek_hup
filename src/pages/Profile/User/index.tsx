import MyNavBar from '@/components/MyNavBar'
import { getUserProfile, uploadPhoto } from '@/store/actions/profile'
import { Button, DatePicker, Dialog, List, Popup, Toast } from 'antd-mobile'
import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { useInitalState } from '@/utils/hooks'
import Edit from './Edit'
import EditList from './EditList'
import { editInfo } from '@/store/actions/profile'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/actions/login'

export type visibleRightType = {
  visibleRight: boolean
  type: type
}
export type type = '' | 'name' | 'intro' | 'birthday' | 'gender'

export default function User() {
  // 绑定上传input框
  const updatePic = useRef<HTMLInputElement>(null)
  const history = useHistory()
  const dispatch = useDispatch()

  // --------------------------------修改日期------------------------------
  const dayjs = require('dayjs')

  const { userProfile } = useInitalState(getUserProfile, 'profile')

  const [showBirthday, setShowBirthday] = useState(false)
  console.log(userProfile.birthday)

  // const [birthday, setBirthday] = useState(userProfile.birthday)

  const onBirthdayShow = () => {
    setShowBirthday(true)
  }
  const onBirthdayHide = () => {
    setShowBirthday(false)
  }
  // -----------------------------修改头像 性别----------------------------------
  // 弹层控制
  const [EditListShow, setEditListShow] = useState(false)
  const onEditListShow = () => {
    setEditListShow(true)
  }
  const onEditListHide = () => {
    setEditListShow(false)
  }
  // 设置类型,判断修改头像还是性别
  const [type, setType] = useState('')

  const handel = (type: 'gender' | 'photo') => {
    onEditListShow()
    setType(type)
  }
  // ------------------------------修改性别-----------------------------------------
  const handelSex = (type: 'gender', value: string) => {
    onEditListHide()
    // onBirthdayHide()
    submit(type, value)
  }
  // ---------------------------------修改头像--------------------------------------
  const handelPic = () => {
    updatePic.current?.click()
  }
  const handelFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    // console.log(file, 777)
    const fd = new FormData()
    fd.append('photo', file)
    await dispatch(uploadPhoto(fd))
    Toast.show('上传成功')
    onEditListHide()
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
    // console.log(type, value, 77777)
    dispatch(editInfo(type, value))
    onBirthdayHide()
    hideVisibleRight()
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
      dispatch(logout())
      // 提示用户
      Toast.show('退出成功')
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
        visible={EditListShow}
        onMaskClick={() => {
          onEditListHide()
        }}
      >
        <input type="file" ref={updatePic} hidden onChange={handelFileUpload} />
        <EditList
          type={type}
          hideList={onEditListHide}
          handelSex={handelSex}
          handelPic={handelPic}
        ></EditList>
        {/* {sex === 'photo' ? (
          <List className="photo">
            <List.Item
              style={{ textAlign: 'center' }}
              arrow={false}
              onClick={() => handelPic()}
            >
              拍照
            </List.Item>
            <List.Item
              style={{ textAlign: 'center' }}
              arrow={false}
              onClick={() => handelPic()}
            >
              本地选择
            </List.Item>
            <List.Item
              style={{ textAlign: 'center' }}
              arrow={false}
              onClick={() =>  onEditListHide()}
            >
              取消
            </List.Item>
            <input hidden type="file" ref={updatePic} />
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
              onClick={() =>  onEditListHide()}
            >
              取消
            </List.Item>
          </List>
        )} */}
      </Popup>

      {/* ------------------------------出生日期-------------------------------- */}
      <DatePicker
        visible={showBirthday}
        onCancel={() => {
          onBirthdayHide()
        }}
        value={new Date(userProfile.birthday)}
        title="选择出生日期"
        min={new Date('1900-01-01')}
        max={new Date()}
        onConfirm={(val) => {
          console.log(userProfile.birthday)

          console.log(val)
          submit('birthday', dayjs(val).format('YYYY-MM-DD'))
        }}
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
