import React from 'react'
import styles from './burger-ingredients-section.module.css'
import PropTypes from 'prop-types';

class BurgerIngredientsSection extends React.Component {
  render() {
    const contentClassName = [styles.content, 'mt-6'].join(' ');

    return (
      <section className='pt-10'>
        <span className='text text_type_main-medium'>{this.props.title}</span>

        <div className={contentClassName}>
          {this.props.children}
        </div>
      </section>
    )
  }
}

BurgerIngredientsSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default BurgerIngredientsSection
