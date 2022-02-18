import { Button, NavBar } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

export default function Opinion() {
  const history = useHistory()
  return (
    <div>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        意见反馈
      </NavBar>
      <textarea name="" id="" cols={50} rows={20}></textarea>
      <Button>反馈</Button>
    </div>
  )
}
