import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Language as LanguageIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import clsx from 'clsx'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: 'inherit'
  },
  languageText: {
    color: '#121212',
    fontSize: '1rem',
    marginLeft: 3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  languageTextTransparent: {
    color: '#ffffff'
  },
  iconLanguage: {
    color: '#121212',
    width: 24,
    height: 24
  },
  iconLanguageTransparent: {
    color: '#ffffff'
  }
}))

const LanguageSelector = ({ alt }) => {
  const classes = useStyles()
  const { i18n } = useTranslation('translations')
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const trigger = useScrollTrigger({
    target: window || undefined,
    disableHysteresis: true
  })

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const useTransparentBG = isDesktop && !trigger && isHome

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (item) => {
    setAnchorEl(null)
    if (typeof item === 'string') i18n.changeLanguage(item)
  }

  const languages = [
    {
      value: 'es',
      label: 'Español'
    },
    {
      value: 'en',
      label: 'English'
    }
  ]

  return (
    <>
      <IconButton className={classes.wrapper} onClick={handleClick}>
        <LanguageIcon
          alt={alt}
          className={clsx(classes.iconLanguage, {
            [classes.iconLanguageTransparent]: useTransparentBG
          })}
        />
        <Typography
          variant="h5"
          className={clsx(classes.languageText, {
            [classes.languageTextTransparent]: useTransparentBG
          })}
        >
          {(i18n.language || '').toLocaleUpperCase().substring(0, 2)}
        </Typography>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.length &&
          languages.map((item) => (
            <MenuItem
              key={`language-menu-${item.label}`}
              onClick={() => handleClose(item.value)}
            >
              {`${item.label} - ${(item.value || '').toLocaleUpperCase()}`}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

LanguageSelector.propTypes = {
  alt: PropTypes.string
}

export default LanguageSelector
