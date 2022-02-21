import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'

type Props = {
  src: string
  className?: string
}
/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
const Image = ({ src, className }: Props) => {
  // 记录图片加载是否出错的状态
  const [isError, setIsError] = useState(false)

  // 记录图片是否正在加载的状态
  const [isLoading, setIsLoading] = useState(true)

  // 对图片元素的引用
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    // 写在useEffct里,只创建一次io实例
    const io = new IntersectionObserver(([{ isIntersecting }]) => {
      // 判断是否在可视区内
      if (isIntersecting) {
        const imgDom = imgRef.current!
        if (imgDom) {
          // 将自定义属性的src赋值给src
          imgDom.src = imgDom.dataset.src!
          // 取消监听
          io.unobserve(imgRef.current!)
        }
      }
    })
    // 监听
    io.observe(imgRef.current!)

    return () => {
      // 取消监听
      io.disconnect()
    }
  }, [])

  // const img = document.querySelector('img')

  // const io = new IntersectionObserver((entries) => {
  //   console.log(entries, 111)
  // })
  // io.observe(img)

  return (
    <div className={classnames(styles.root, className)}>
      {/* 正在加载时显示的内容 */}
      {isLoading && (
        <div className="image-icon">
          <Icon type="icon-tupian1" />
        </div>
      )}

      {/* 加载出错时显示的内容 */}
      {isError && (
        <div className="image-icon">
          <Icon type="icon-icon" />
        </div>
      )}

      {/* 加载成功时显示的内容 */}
      {!isError && (
        <img
          alt=""
          data-src={src}
          ref={imgRef}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  )
}

export default Image
