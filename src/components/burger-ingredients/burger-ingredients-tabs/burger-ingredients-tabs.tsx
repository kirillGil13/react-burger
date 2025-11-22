import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-tabs.module.css';
import { TIngredientType } from '../../../types';
import { FC } from 'react';

interface ITab {
  id: TIngredientType
  title: string
}

interface IProps {
  currentTab: TIngredientType
  onTabClick: (tab: TIngredientType) => void
}

const tabs: ITab[] = [
  {
    id: 'bun',
    title: 'Булки'
  },
  {
    id: 'sauce',
    title: 'Соусы'
  },
  {
    id: 'main',
    title: 'Начинки'
  }
]

const BurgerIngredientsTabs: FC<IProps> = ({currentTab, onTabClick}) => {
  return (
    <div className={styles.container}>
      {
        tabs.map((tab) => (
          <Tab key={tab.id} value={tab.id} active={tab.id === currentTab} onClick={() => onTabClick(tab.id)}>
            {tab.title}
          </Tab>
        ))
      }
    </div>
  )
}

export default BurgerIngredientsTabs
