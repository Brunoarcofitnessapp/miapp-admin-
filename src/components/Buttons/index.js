import { Button } from 'antd'
import styles from './button.module.css'


export const CommonButton = ({
  title,
  style,
  type,
  loading,
  onClick = () => { },
  ...rest
}) => {
  return (
    <>
      <Button type={type} onClick={onClick} className={styles.common_bttn} style={style} {...rest} >
        {loading ? (
 
        <div className={'basic'}></div>

        ) : (
      <p className={styles.common_bttn_p}>
        {title} 
      </p>

        )}
    </Button>
    </>
  )
}
