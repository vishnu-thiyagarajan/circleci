import React, { useContext, useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import BottomBar from './BottomBar'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../App'

const useStyles = makeStyles({
  Container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '125px'
  }
})

function TaskContainer (props) {
  const todoContext = useContext(TodoContext)
  const [selectedList, setSelectedList] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    const index = todoContext.todos.findIndex((list) => list._id === id)
    setSelectedList(todoContext.todos[index])
  }, [id, todoContext])
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.Container}>
        {selectedList &&
          <div>
            {selectedList._id}
          </div>}
        <br />
      </Container>
      <BottomBar />
    </div>
  )
}

export default TaskContainer
