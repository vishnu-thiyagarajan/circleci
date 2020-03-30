import React, { useState } from 'react'
import 'date-fns'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DateFnsUtils from '@date-io/date-fns'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/Comment'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const useStyles = makeStyles((theme) => ({
  textarea: {
    width: '99%',
    resize: 'none',
    border: '1px solid black',
    borderRadius: '5px',
    fontSize: 'large',
    outline: 'none !important'
  }
}))

export default function TaskDetails (props) {
  const classes = useStyles()
  const [task, setTask] = useState(props.taskObj)
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setTask(props.taskObj)
  }
  const handleSave = () => {
    props.taskDetails(task)
    setOpen(false)
  }
  return (
    <div>
      <IconButton edge='end' onClick={handleClickOpen}>
        <CommentIcon data-tip='Details' />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Task Details</DialogTitle>
        <DialogContent>
          <textarea
            rows='10'
            placeholder='Notes'
            className={classes.textarea}
            onFocus={(event) => { event.target.value = task.notes }}
            onInput={event => setTask({ ...task, notes: event.target.value })}
            autoFocus
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              placeholder='Due date'
              margin='normal'
              id='date-picker-dialog'
              format='yyyy-MM-dd'
              value={task.duedate ? task.duedate : null}
              onChange={(date) => setTask({ ...task, duedate: date })}
            />
          </MuiPickersUtilsProvider>
          <FormControl variant='filled' fullWidth>
            <InputLabel id='demo-simple-select-label'>Priority</InputLabel>
            <Select
              id='priority'
              value={task.priority}
              onChange={(event) => setTask({ ...task, priority: event.target.value })}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
