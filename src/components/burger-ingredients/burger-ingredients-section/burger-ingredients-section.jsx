import { forwardRef } from 'react';
import styles from './burger-ingredients-section.module.css'
import PropTypes from 'prop-types';

const BurgerIngredientsSection = forwardRef(({title, children, id}, ref) => {
  const contentClassName = [styles.content, 'mt-6'].join(' ');

  return (
    <section id={id} className='pt-10'>
      <span ref={ref} className='text text_type_main-medium'>{title}</span>

      <div className={contentClassName}>
        {children}
      </div>
    </section>
  )
})

BurgerIngredientsSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string
}

export default BurgerIngredientsSection
