import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import List from './List'

const useStyles = makeStyles({
  Container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '125px'
  }
})

function ListContainer () {
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.Container}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          return (<List key={i} />)
        })}
      </Container>
    </div>
  )
}

export default ListContainer
