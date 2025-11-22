import { forwardRef, ReactNode } from 'react';
import styles from './burger-ingredients-section.module.css'

interface IProps {
  id: string;
  title: string;
  children?: ReactNode;
}

const BurgerIngredientsSection = forwardRef<HTMLSpanElement, IProps>(({title, children, id}, ref) => {
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

export default BurgerIngredientsSection
