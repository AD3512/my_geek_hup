import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState } from 'react'
// import Mock from 'mockjs'
import { useDebounceFn } from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'
import {
  addHistory,
  clearHistory,
  clearSearchResult,
  delHistory,
  getSuggestionList,
} from '@/store/actions/search'
import { RootState } from '@/types/store'

const SearchPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // const timerId = useRef<number>(-1)

  const { suggestionList, historyList } = useSelector(
    (state: RootState) => state.search
  )

  // console.log(suggestionList)

  // 防抖发情求渲染
  const { run: getSuggestList } = useDebounceFn(
    (val) => {
      // console.log(val, '发请求')
      if (!val) return
      dispatch(getSuggestionList(val))
    },
    {
      wait: 500,
    }
  )

  // 高亮的正则表达式
  const heigtLight = (str: string) => {
    const reg = new RegExp(keyword, 'gi')

    return str.replace(reg, (match) => {
      return `<span>${match}</span>`
    })
  }

  // 搜索
  const handelSearch = (val: string) => {
    if (val.trim() === '') return
    // console.log('搜索', val, '并存本地')
    dispatch(addHistory(val))
    dispatch(clearSearchResult())
    // 跳转传参
    history.push(`/search/result?keyword=${val}`)
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span className="search-text" onClick={() => handelSearch(keyword)}>
            搜索
          </span>
        }
      >
        <SearchBar
          value={keyword}
          onChange={(val) => {
            setIsSearching(val.length > 0 ? true : false)
            setKeyword(val)
            getSuggestList(val)
          }}
          placeholder="请输入关键字搜索"
        />
      </NavBar>

      {historyList.length > 0 && (
        <div
          className="history"
          style={{
            display: isSearching ? 'none' : 'block',
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={() => dispatch(clearHistory())}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {historyList.map((item, index) => (
              <span key={index} className="history-item">
                <span
                  className="text-overflow"
                  onClick={() => handelSearch(item)}
                >
                  {item}
                </span>
                <Icon
                  type="icon-guanbi"
                  onClick={() => dispatch(delHistory(item))}
                />
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={classnames('search-result', isSearching ? 'show' : '')}>
        {suggestionList.map((item, index) => (
          <div
            key={index}
            className="result-item"
            onClick={() => handelSearch(item)}
          >
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
