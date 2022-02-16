import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import '@/App.scss'

// 引入组件
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile/User'
// import Edit from '@/pages/Profile/Edit'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* <Route
            exact
            path="/"
            render={() => <Redirect to="login"></Redirect>}
          ></Route> */}
          {/* 重定向,默认展示首页 */}
          <Redirect exact from="/" to="/login"></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Layout}></Route>
          <Route path="/user/profile" component={Profile}></Route>
          {/* <Route path="/user/edit/:name" component={Edit}></Route> */}
        </Switch>
      </div>
    </Router>
  )
}

export default App
