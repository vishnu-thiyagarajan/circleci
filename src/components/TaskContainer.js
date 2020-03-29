import React, { useContext, useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import BottomBar from './BottomBar'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../App'
import Task from './Task.js'

const useStyles = makeStyles({
  Container: {
    display: 'flex',
    flexWrap: 'column-wrap',
    marginTop: '125px',
    justifyContent: 'center'
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
        {selectedList && selectedList.tasks.map((task) => {
          return (<Task key={task.id} task={task} />)
        })}
        <div />
      </Container>
      <BottomBar />
    </div>
  )
}

export default TaskContainer
