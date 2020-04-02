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
  const [showDone, setShowDone] = useState(false)
  const section = props.section
  const [selectedList, setSelectedList] = useState(null)
  const [listIndex, setListIndex] = useState(null)
  const [doneTasks, setDoneTasks] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    const index = todoContext.todos.findIndex((list) => list.id === Number(id))
    setListIndex(index)
    const listObj = todoContext.todos[index]
    setSelectedList(listObj)
    todoContext.setSelectedList(listObj)
    if (listObj) setShowDone(listObj.tasks.filter(task => task.done === true).length > 0)
    if (section === 'today') setShowDone(todoContext.today.filter(task => task.done === true).length > 0)
    if (section === 'schld') setShowDone(todoContext.schld.filter(task => task.done === true).length > 0)
  }, [id, todoContext, section])
  const classes = useStyles()
  return (
    <>
      <Container className={classes.Container}>
        {selectedList && <AddTask selectedList={selectedList} listIndex={listIndex} />}
        <br />
        {selectedList && selectedList.tasks.map((task, index) => {
          if (!doneTasks && task.done) return (<div key={index} />)
          return (<Task key={index} task={task} listIndex={listIndex} taskIndex={index} />)
        })}
        {section === 'today' && todoContext.today.map((task, index) => {
          if (!doneTasks && task.done) return (<div key={index} />)
          return (<Task key={index} task={task} section={section} listIndex={task.listIndex} taskIndex={index} />)
        })}
        {section === 'schld' && todoContext.schld.map((task, index) => {
          if (!doneTasks && task.done) return (<div key={index} />)
          return (<Task key={index} task={task} section={section} listIndex={task.listIndex} taskIndex={index} />)
        })}
        <div />
      </Container>
      {showDone && <BottomBar doneTasks={doneTasks} setDoneTasks={setDoneTasks} />}
    </>
  )
}

export default TaskContainer
