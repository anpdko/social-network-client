import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'

import { setTheme } from '../../store/theme/themeSlice'
import styles from './Theme.module.scss'

const Theme = ({ className }) => {
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [ theme ])

  const handleChange = () => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))

  return (
    <div
      className={cn(className, styles.root, theme === 'dark' ? styles.dark : styles.light)}
      onClick={handleChange}
    />
  )
}

export default Theme