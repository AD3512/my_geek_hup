import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState } from 'react'
// import Mock from 'mockjs'
import { useDebounceFn } from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'
import { getSuggestionList } from '@/store/actions/search'
import { RootState } from '@/types/store'

const SearchPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')

  // const timerId = useRef<number>(-1)

  const { suggestionList } = useSelector((state: RootState) => state.search)

  // console.log(suggestionList)

  const { run: getSuggestList } = useDebounceFn(
    (val) => {
      console.log(val, '发请求')
      if (!val) return
      dispatch(getSuggestionList(val))
    },
    {
      wait: 500,
    }
  )

  const heigtLight = (str: string) => {
    const reg = new RegExp(keyword, 'gi')

    return str.replace(reg, (match) => {
      return `<span>${match}</span>`
    })
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text">搜索</span>}
      >
        <SearchBar
          value={keyword}
          // onChange={(val) => {
          //   window.clearTimeout(timerId.current)
          //   setKey(val)
          //   timerId.current = window.setTimeout(() => {
          //     console.log('发请求')
          //   }, 1000)
          // }}
          onChange={(val) => {
            setKeyword(val)
            getSuggestList(val)
          }}
          placeholder="请输入关键字搜索"
        />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: true ? 'none' : 'block',
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div className={classnames('search-result', true ? 'show' : '')}>
        {suggestionList.map((item, index) => (
          <div key={index} className="result-item">
            <Icon className="icon-search" type="icon-sousuo1" />
            <div
              className="result-value text-overflow"
              dangerouslySetInnerHTML={{ __html: heigtLight(item) }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
