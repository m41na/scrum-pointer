import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import WarningIcon from '@material-ui/icons/Warning'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  message: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  back: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: '5em'
  }
}))

const ErrorPage = ({ history, error, errorMsg, clearError }) => {
  const classes = useStyles()

  const goHome = async () => {
    clearError()
    history.push('/')
  }

  return (
    error
      ? (
      <div className={classes.paper} data-testid="on-error">
        <Avatar className={classes.avatar}>
          <WarningIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Error handling request
      </Typography>

        <Grid container spacing={4} className={classes.message}>
          <Grid item xs={12} >
            <Paper elevation={3} className={classes.message}>
              <Typography component="h3" variant="h5" style={{ marginLeft: 20 }} >{errorMsg}</Typography>
            </Paper>
          </Grid>

          <Grid container justify="center">
            <Button className={classes.back} variant="outlined" color="secondary" onClick={goHome}>Back Home</Button>
          </Grid>
        </Grid>
      </div>
        )
      : <Redirect to="/" />
  )
}

ErrorPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  clearError: PropTypes.func
}

export default ErrorPage
