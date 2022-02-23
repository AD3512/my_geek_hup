import { useHistory, useLocation } from 'react-router-dom'
import { InfiniteScroll, NavBar, PullToRefresh } from 'antd-mobile'

import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearch } from '@/store/actions/search'
import { RootState } from '@/types/store'
import ArticleItem from '@/pages/Home/ArticleItem'

const Result = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const location = useLocation()

  const params = new URLSearchParams(location.search)

  const keyword = params.get('keyword')!

  const {
    results,
    page = 1,
    total_count,
  } = useSelector((state: RootState) => state.search.searchResult)

  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setisLoading] = useState(false)

  const onRefresh = async () => {
    await dispatch(getSearch(1, keyword))
  }

  const loadMore = async () => {
    if (!isLoading) {
      setisLoading(true)
      await dispatch(getSearch(page + 1, keyword))
      setisLoading(false)
    }
  }

  useEffect(() => {
    // console.log(page, total_count, results.length, 2222222222)
    if (total_count === results.length) {
      setHasMore(false)
    }
  }, [page, results, total_count])

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">
        <PullToRefresh onRefresh={onRefresh}>
          {results ? (
            results.map((item, index) => (
              <ArticleItem key={index} articleList={item}></ArticleItem>
            ))
          ) : (
            <div>
              <h2>暂无搜索结果</h2>
            </div>
          )}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </PullToRefresh>
      </div>
    </div>
  )
}

export default Result
