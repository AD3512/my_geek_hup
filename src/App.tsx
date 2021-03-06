import { Router, Route, Switch, Redirect } from 'react-router-dom'
import '@/App.scss'
import history from '@/utils/history'

// 引入组件
import PrivateRoute from '@/components/PrivateRoute'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile/User'
import Chat from '@/pages/Profile/Chat'
import Opinion from '@/pages/Profile/Opinion'
import Article from '@/pages/Home/Article'
import Search from '@/pages/Search'
import Result from '@/pages/Search/Result'
// import Edit from '@/pages/Profile/Edit'

import KeepAlive from '@/components/KeepAlive'

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <KeepAlive path={'/home'} activePath="/home">
          <Layout></Layout>
        </KeepAlive>
        <Switch>
          {/* <Route
            exact
            path="/"
            render={() => <Redirect to="login"></Redirect>}
          ></Route> */}
          {/* 重定向,默认展示首页 */}

          <Redirect exact from="/" to="/login"></Redirect>
          <Route path="/login" component={Login}></Route>
          {/* <Route path="/home" component={Layout}></Route> */}
          <Route path="/article/:id" component={Article}></Route>
          <Route exact path="/search" component={Search}></Route>
          <Route path="/search/result" component={Result}></Route>
          {/* <Route path="/user/profile" component={Profile}></Route> */}
          <PrivateRoute path="/user/profile" component={Profile}></PrivateRoute>
          <PrivateRoute path="/chat" component={Chat}></PrivateRoute>
          <PrivateRoute path="/opinion" component={Opinion}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App
