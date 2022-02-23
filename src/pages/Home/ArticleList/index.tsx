import ArticleItem from '../ArticleItem'

import styles from './index.module.scss'

// import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles, getArticlesReresh } from '@/store/actions/home'
import { RootState } from '@/types/store'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

const ArticleList = ({ channel_id }: { channel_id: number }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  // useEffect(() => {
  //   dispatch(getArticles(channel_id, +new Date() + ''))
  // }, [channel_id, dispatch])

  const { channelActive } = useSelector((state: RootState) => state.home)

  const { timestamp, articles = [] } = channelActive[channel_id] || {}

  const hasMore = timestamp === null ? false : true
  const loadMore = async () => {
    await dispatch(getArticles(channel_id, timestamp || +new Date() + ''))
  }

  // console.log(channelActive, channel_id, 888888)

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <PullToRefresh
        onRefresh={async () => {
          console.log('下拉刷新')
          dispatch(getArticlesReresh(channel_id, +new Date() + ''))
        }}
      >
        {/* <ArticleItem /> */}
        {articles.map((item) => (
          <div
            key={item.art_id}
            className="article-item"
            onClick={() => {
              history.push(`/article/${item.art_id}`)
            }}
          >
            <ArticleItem articleList={item} />
          </div>
        ))}

        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}

export default ArticleList
