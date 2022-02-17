import { Router, Route, Switch, Redirect } from 'react-router-dom'
import '@/App.scss'
import history from '@/utils/history'

// 引入组件
import PrivateRoute from '@/components/PrivateRoute'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile/User'
// import Edit from '@/pages/Profile/Edit'

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          {/* <Route
            exact
            path="/"
            render={() => <Redirect to="login"></Redirect>}
          ></Route> */}
          {/* 重定向,默认展示首页 */}
          {/* <PrivateRoute path="/profile/edit">
            <ProfileEdit />
          </PrivateRoute> */}
          <Redirect exact from="/" to="/login"></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Layout}></Route>
          {/* <Route path="/user/profile" component={Profile}></Route> */}
          <PrivateRoute path="/user/profile" component={Profile}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App
