import { NavBar } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

export default function Profile(props: any) {
  // console.log(props)
  const right = props?.right
  const history = useHistory()
  const back = () => {
    history.go(-1)
  }
  return (
    <NavBar
      style={{ borderBottom: '1px solid #ccc' }}
      right={right}
      onBack={back}
    >
      {props.children}
    </NavBar>
  )
}
