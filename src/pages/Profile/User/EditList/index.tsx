import styles from './index.module.scss'

type Props = {
  handelSex: (type: 'gender', value: string) => void
  hideList: () => void
  handelPic: () => void
  type: string
}

const genderList = [
  { title: '男', value: '0' },
  { title: '女', value: '1' },
]

const photoList = [
  { title: '拍照', value: '' },
  { title: '本地选择', value: '' },
]

const EditList = ({ hideList, type, handelSex, handelPic }: Props) => {
  const handelchange = (val: string) => {
    if (val === '') {
      // console.log(val)
      handelPic()
    } else {
      handelSex('gender', val)
      // console.log(val)
    }
  }
  const list = type === 'gender' ? genderList : photoList
  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div
          key={item.title}
          onClick={() => handelchange(item.value)}
          className="list-item"
        >
          {item.title}
        </div>
      ))}

      <div className="list-item" onClick={hideList}>
        取消
      </div>
    </div>
  )
}

export default EditList
