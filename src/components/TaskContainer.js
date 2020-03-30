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
  const [showDone, setShowDone] = useState(false)
  const [doneTasks, setDoneTasks] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    const index = todoContext.todos.findIndex((list) => list.id === Number(id))
    setListIndex(index)
    const listObj = todoContext.todos[index]
    setSelectedList(listObj)
    if (listObj) setShowDone(listObj.tasks.filter(task => task.done === true).length > 0)
  }, [id, todoContext.todos])
  const classes = useStyles()
  return (
    <>
      <Container className={classes.Container}>
        <AddTask selectedList={selectedList} listIndex={listIndex} />
        <br />
        {selectedList && selectedList.tasks.map((task, index) => {
          if (!doneTasks && task.done) return (<div key={index} />)
          return (<Task key={index} task={task} listIndex={listIndex} taskIndex={index} />)
        })}
        <div />
      </Container>
      {showDone && <BottomBar doneTasks={doneTasks} setDoneTasks={setDoneTasks} />}
    </>
  )
}

export default TaskContainer
