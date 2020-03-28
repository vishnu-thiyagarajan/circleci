import React, { useContext } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import List from './List'
import { TodoContext } from '../App'

const useStyles = makeStyles({
  Container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '125px'
  }
})

function ListContainer () {
  const todoContext = useContext(TodoContext)
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.Container}>
        {todoContext.todos && todoContext.todos.map((list) => {
          return (list.display ? <List key={list.id} list={list} /> : <div key={list.id} />)
        })}
      </Container>
    </div>
  )
}

export default ListContainer
