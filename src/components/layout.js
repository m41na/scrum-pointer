import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import HowToVoteIcon from '@material-ui/icons/HowToVote'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Pointer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
  }
}))

export default function Layout ({ history, mode, toggleMode, children }) {
  const classes = useStyles()

  const goHome = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <HowToVoteIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link href="#" onClick={goHome} >Pointer</Link>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              GitHub
            </Link>
          </nav>
          <FormGroup row>
            <FormControlLabel control={<Switch checked={mode} onChange={toggleMode} name="mode" />} label="Primary" />
          </FormGroup>
        </Toolbar>
      </AppBar>
      <Container component="main" className={classes.main} maxWidth="lg">
        {children}
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">My sticky footer can be found here.</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  history: PropTypes.object,
  mode: PropTypes.bool,
  toggleMode: PropTypes.func
}
