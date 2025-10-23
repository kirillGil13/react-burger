import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-tabs.module.css';
import PropTypes from 'prop-types'

const tabs = [
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

const BurgerIngredientsTabs = ({currentTab, onTabClick}) => {
  return (
    <div className={styles.container}>
      {
        tabs.map((tab) => (
          <Tab key={tab.id} active={tab.id === currentTab} onClick={() => onTabClick(tab.id)}>
            {tab.title}
          </Tab>
        ))
      }
    </div>
  )
}

BurgerIngredientsTabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
}

export default BurgerIngredientsTabs
