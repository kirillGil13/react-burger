import styles from './loader.module.css'
import { FC } from 'react';

interface IProps {
  size?: string
}

const Loader: FC<IProps> = ({size}) => {
  return (
    <span className={styles.item} style={{width: size, height: size}} />
  )
}

export default Loader
