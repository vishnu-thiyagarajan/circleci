import React, { useEffect, useState } from 'react'
import { NaviBar } from './components/NaviBar'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ListContainer from './components/ListContainer'
import TaskContainer from './components/TaskContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000'
    }
  }
})
export const TodoContext = React.createContext()
function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}
export default function App () {
  const [selectedList, setSelectedList] = useState(null)
  const [today, setToday] = useState([])
  const [schld, setSchld] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [todos, setTodos] = useState([])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setSuccess(false)
    setMessage('')
  }
  useEffect(() => {
    const dateNow = new Date().toISOString().slice(0, 10)
    const allTasks = () => {
      const filtered = []
      todos.forEach((eachList, index) => {
        filtered.push(...eachList.tasks.map(item => ({
          ...item,
          listname: eachList.listname,
          listIndex: index
        })))
      })
      return filtered
    }
    const tasks = allTasks()
    setToday(tasks.filter(item => item.duedate === dateNow))
    setSchld(tasks.filter(item => item.duedate !== ''))
  }, [todos])
  useEffect(() => {
    fetch('https://todomongoapi.herokuapp.com/list')
      .then(response => response.json()).then(data => {
        data.forEach(element => {
          element.display = true
          element.tasks.map(item => ({ ...item, listid: element.id }))
        })
        setLoading(false)
        setError(false)
        setTodos(data)
      })
      .catch((err) => {
        console.log('Fetch error :', err)
        setLoading(false)
        setError(true)
      })
  }, [])
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <TodoContext.Provider value={{
          todos: todos,
          setTodos: setTodos,
          setSuccess: setSuccess,
          setError: setError,
          setMessage: setMessage,
          selectedList: selectedList,
          setSelectedList: setSelectedList,
          today: today,
          schld: schld
        }}
        >
          <NaviBar />
          <Switch>
            <Route path='/list/:id'>
              <TaskContainer />
            </Route>
            <Route path='/today'>
              <TaskContainer section='today' />
            </Route>
            <Route path='/scheduled'>
              <TaskContainer section='schld' />
            </Route>
            <Route path='/'>
              {loading ? 'Loading' : <ListContainer />}
            </Route>
          </Switch>
          <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              {message}
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
              Something went wrong!
            </Alert>
          </Snackbar>
        </TodoContext.Provider>
      </Router>
    </MuiThemeProvider>
  )
}
