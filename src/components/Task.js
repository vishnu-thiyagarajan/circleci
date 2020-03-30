import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/Comment'
import ReactTooltip from 'react-tooltip'
import { TodoContext } from '../App'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0px',
    margin: '10px'
  },
  listItemText: {
    fontSize: '20px'
  }
}))

export default function Task (props) {
  const taskObj = props.task
  const listIndex = props.listIndex
  const taskIndex = props.taskIndex
  const todoContext = useContext(TodoContext)
  const todos = todoContext.todos
  const classes = useStyles()
  const taskDone = (event) => {
    todos[listIndex].tasks[taskIndex].done = !todos[listIndex].tasks[taskIndex].done
    todos[listIndex].tasks[taskIndex].listid = todos[listIndex].id
    fetch('https://todomongoapi.herokuapp.com/task', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todos[listIndex].tasks[taskIndex])
    }).then((res) => {
      if (res.status !== 204) return todoContext.setError(true)
      todoContext.setTodos([...todos])
      todoContext.setSuccess(true)
      todoContext.setMessage('Task Completed!')
    }).catch(function (err) {
      todoContext.setError(true)
      console.log('Fetch Error :', err)
    })
  }
  const openEditName = () => {
    console.log('editname')
  }
  return (
    <>
      <List className={classes.root}>
        <ListItem dense button>
          <ListItemIcon>
            <Checkbox
              color='primary'
              edge='start'
              checked={taskObj.done}
              onChange={taskDone}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText onClick={openEditName} classes={{ primary: classes.listItemText }} primary={taskObj.taskname} />
          <ListItemSecondaryAction>
            {/* <div>{taskObj.duedate}</div>
            <div>{taskObj.priority}</div> */}
            <IconButton edge='end'>
              <CommentIcon data-tip='Details' />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ReactTooltip />
      </List>
    </>
  )
}
