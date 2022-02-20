import classnames from 'classnames'

import Icon from '@/components/Icon'

import styles from './index.module.scss'
import { Article } from '@/types/store'

import dayjs from '@/utils/day'

type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */

  articleList: Article
}

const ArticleItem = ({ articleList }: Props) => {
  const {
    title,
    comm_count,
    pubdate,
    aut_name,
    cover: { type, images },
  } = articleList
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            <div className="article-img-wrapper">
              {images.map((item, index) => (
                <img key={index} src={item} alt="" />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).fromNow()}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
