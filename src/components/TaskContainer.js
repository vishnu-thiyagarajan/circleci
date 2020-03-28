import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
// import List from './List'

const useStyles = makeStyles({
  Container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '125px'
  }
})

function TaskContainer (props) {
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.Container}>
          make
      </Container>
    </div>
  )
}

export default TaskContainer
