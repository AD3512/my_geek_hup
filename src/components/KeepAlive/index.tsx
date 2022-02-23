import { Route, RouteProps } from 'react-router-dom'
import styles from './index.module.scss'

type Props = RouteProps & {
  activePath: string
}

// 示例：
//  1 需要保留页面的路由地址 activePath: '/home'，浏览器地址栏（当前路由）pathname: '/home'
//  1 需要保留页面的路由地址 activePath: '/home'，浏览器地址栏（当前路由）pathname: '/home/index'
//  2 需要保留页面的路由地址 activePath: '/home'，浏览器地址栏（当前路由）pathname: '/login'
const KeepAlive = ({ activePath, children, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      children={(props) => {
        const {
          location: { pathname },
        } = props
        const isMatch = pathname.startsWith(activePath)

        return (
          <div
            className={styles.root}
            style={{ display: isMatch ? 'block' : 'none' }}
          >
            {children}
          </div>
        )
      }}
    />
  )
}

export default KeepAlive
