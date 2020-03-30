import React, { useContext, useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import BottomBar from './BottomBar'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../App'
import Task from './Task.js'
import AddTask from './AddTask'

const useStyles = makeStyles({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '125px',
    alignItems: 'center'
  }
})

function TaskContainer (props) {
  const todoContext = useContext(TodoContext)
  const [selectedList, setSelectedList] = useState(null)
  const [listIndex, setListIndex] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    const index = todoContext.todos.findIndex((list) => list.id === Number(id))
    setListIndex(index)
    setSelectedList(todoContext.todos[index])
  }, [id, todoContext])
  const classes = useStyles()
  return (
    <>
      <Container className={classes.Container}>
        <AddTask selectedList={selectedList} listIndex={listIndex} />
        <br />
        {selectedList && selectedList.tasks.map((task, index) => {
          return (<Task key={task.id} task={task} listIndex={listIndex} taskIndex={index} />)
        })}
        <div />
      </Container>
      <BottomBar />
    </>
  )
}

export default TaskContainer
