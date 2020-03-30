import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TodoContext } from '../App'

export default function AddTask (props) {
  const todoContext = useContext(TodoContext)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const addTask = () => {
    if (!name) return
    const todos = todoContext.todos
    const key = props.listIndex
    const data = {
      id: todos[key].tasks.length ? parseInt(todos[key].tasks[todos[key].tasks.length - 1].id) + 1 : 0,
      taskname: name,
      listname: props.selectedList.listname,
      listid: props.selectedList.id,
      notes: '',
      priority: 0,
      duedate: '',
      done: false
    }
    fetch('https://todomongoapi.herokuapp.com/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(result => {
        data._id = result.id
        todos[key].tasks = [...todos[key].tasks, data]
        todoContext.setTodos([...todos])
        setName('')
        handleClose()
        todoContext.setSuccess(true)
        todoContext.setMessage('New task added!')
      })
      .catch(function (err) {
        todoContext.setError(true)
        console.log('Fetch Error :', err)
      })
  }

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Add new task {props.selectedList ? 'to ' + props.selectedList.listname : ''}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add New Task {props.selectedList ? 'To ' + props.selectedList.listname : ''}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            margin='dense'
            id='taskname'
            onKeyUp={(event) => { if (event.key === 'Enter') addTask() }}
            label='New Task Name'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={addTask} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
