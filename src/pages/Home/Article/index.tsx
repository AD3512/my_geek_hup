import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { getArticleInfo } from '@/store/actions/article'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'

import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

import { useInitalState } from '@/utils/hooks'
import { useEffect } from 'react'

const Article = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()

  const { articleInfo } = useInitalState(() => getArticleInfo(id), 'article')

  useEffect(() => {
    // 配置 highlight.js
    hljs.configure({
      // 忽略未经转义的 HTML 字符
      ignoreUnescapedHTML: true,
    })
    // 获取到内容中所有的code标签
    const codes = document.querySelectorAll('.dg-html pre code')
    codes.forEach((el) => {
      // 让code进行高亮
      hljs.highlightElement(el as HTMLElement)
    })
  }, [])

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{articleInfo.title}</h1>

            <div className="info">
              <span>{dayjs(articleInfo.pubdate).format('YYYY-MM-DD')}</span>
              <span>{articleInfo.read_count} 阅读</span>
              <span>{articleInfo.comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={articleInfo.aut_photo} alt="" />
              <span className="name">{articleInfo.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  articleInfo.is_followed ? 'followed' : ''
                )}
              >
                {articleInfo.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>

          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(articleInfo.content),
              }}
            />
            <div className="date">发布文章时间：{articleInfo.pubdate}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（10）</span>
            <span>20 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll
              hasMore={false}
              loadMore={async () => {
                console.log(1)
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src={articleInfo.aut_photo} alt="" />
              <span className="name">{articleInfo.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  articleInfo.is_followed ? 'followed' : ''
                )}
              >
                {articleInfo.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article
