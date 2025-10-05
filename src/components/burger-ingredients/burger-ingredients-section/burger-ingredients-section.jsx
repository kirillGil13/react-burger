import styles from './burger-ingredients-section.module.css'
import PropTypes from 'prop-types';

const BurgerIngredientsSection = ({title, children}) => {
  const contentClassName = [styles.content, 'mt-6'].join(' ');

  return (
    <section className='pt-10'>
      <span className='text text_type_main-medium'>{title}</span>

      <div className={contentClassName}>
        {children}
      </div>
    </section>
  )
}

BurgerIngredientsSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default BurgerIngredientsSection
