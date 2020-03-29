import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import ReactTooltip from 'react-tooltip'
import { TodoContext } from '../App'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    '& > *': {
      margin: '12px',
      width: '180px',
      height: '220px'
    }
  },
  preview: {
    margin: '10px',
    width: '150px'
  },
  para: {
    margin: '5px',
    whiteSpace: 'pre-line',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '150px',
    height: '192px'
  },
  heading: {
    display: 'flex',
    fontSize: '18px',
    justifyContent: 'left',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '195px'
  },
  editBox: {
    width: '150px'
  }
}))

export default function List (props) {
  const todoContext = useContext(TodoContext)
  const listObj = props.list
  const classes = useStyles()
  const [selectedList, setSelectedList] = useState(null)
  const [name, setName] = useState(listObj.listname)
  const [edit, setEdit] = useState(false)
  const tasks = listObj.tasks.map(task => task.taskname)
  const yetTodo = listObj.tasks.filter(task => task.done === false).length
  const editList = (event) => {
    if (name) {
      fetch('https://todomongoapi.herokuapp.com/list', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: listObj.id, listname: name })
      }).then(res => {
        if (res.status !== 204) return todoContext.setError(true)
        const key = todoContext.todos.findIndex(item => item.id === listObj.id)
        todoContext.todos[key].listname = name
        todoContext.setTodos(todoContext.todos)
        setEdit(false)
        todoContext.setSuccess(true)
        todoContext.setMessage('List name edited!')
      }).catch(function (err) {
        todoContext.setError(true)
        console.log('Fetch Error :', err)
      })
    }
  }
  const deleteList = () => {
    fetch('https://todomongoapi.herokuapp.com/list', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: listObj.id })
    }).then((res) => {
      if (res.status !== 204) return todoContext.setError(true)
      todoContext.setTodos(todoContext.todos.filter((item) => item.id !== listObj.id))
      todoContext.setSuccess(true)
      todoContext.setMessage('List deleted!')
    }).catch(function (err) {
      todoContext.setError(true)
      console.log('Fetch Error :', err)
    })
  }
  const selectList = () => setSelectedList(listObj)
  const renderRedirect = () => {
    if (selectedList) {
      return (<Redirect to={`/list/${selectedList._id}`} />)
    }
  }
  return (
    <div>
      {renderRedirect()}
      <div className={classes.root}>
        <Paper onClick={selectList} elevation={20}>
          <Badge badgeContent={yetTodo} color='primary'>
            <div className={classes.preview}>
              <p className={classes.para}>{tasks.join('\n')}</p>
            </div>
          </Badge>
        </Paper>
      </div>
      <div className={classes.heading} data-tip={name}>
        <Button onClick={deleteList}><DeleteIcon /></Button>
        {!edit && <div onClick={() => { setEdit(true) }}>{name}</div>}
        {edit &&
          <div className={classes.editBox}>
            <TextField
              autoFocus
              onChange={(event) => setName(event.target.value)}
              onBlur={() => { setEdit(false) }}
              onKeyUp={(event) => { if (event.key === 'Enter') editList(event) }}
              label='Edit list name'
              size='small'
              value={name}
            />
          </div>}
      </div>
      <ReactTooltip />
    </div>

  )
}
