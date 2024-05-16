import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../language/LanguageContext'
import en from '../language/languages/EN.json'
import se from '../language/languages/SE.json'


const ChangeChild = () => {

  const {language} = useLanguage();
  const lang = language === 'se' ? se : en
  return (
    <div><Link className='navbar-link' to='/profile'>{lang.change_child}</Link></div>
  )
}

export default ChangeChild
