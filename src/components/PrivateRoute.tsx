import React from 'react'
import { Route, useLocation, Redirect, RouteProps } from 'react-router-dom'
import { hasToken } from '@/utils/token'

interface PrivateRouteType extends RouteProps {
  component: any
}

export default function PrivateRoute({
  children,
  component: Component,
  ...rest
}: PrivateRouteType) {
  const location = useLocation()
  console.log(hasToken())

  return (
    <Route
      {...rest}
      render={() => {
        if (hasToken()) {
          return children ? children : <Component></Component>
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: location.pathname } }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
