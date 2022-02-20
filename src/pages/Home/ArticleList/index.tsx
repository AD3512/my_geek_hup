import ArticleItem from '../ArticleItem'

import styles from './index.module.scss'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '@/store/actions/home'
import { RootState } from '@/types/store'
import { InfiniteScroll } from 'antd-mobile'

const ArticleList = ({ channel_id }: { channel_id: number }) => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getArticles(channel_id, +new Date() + ''))
  // }, [channel_id, dispatch])

  const { channelActive } = useSelector((state: RootState) => state.home)

  const { timestamp, articles = [] } = channelActive[channel_id] || {}

  const hasMore = timestamp === null ? false : true
  const loadMore = async () => {
    const res = await dispatch(
      getArticles(channel_id, timestamp || +new Date() + '')
    )
    console.log(res)
    // if (timestamp === null) {
    //   setHasMore(false)
    // }
  }

  // console.log(channelActive, channel_id, 888888)

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <div className="article-item">
        {/* <ArticleItem /> */}
        {articles.map((item) => (
          <ArticleItem key={item.art_id} articleList={item} />
        ))}
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default ArticleList
