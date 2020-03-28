import React, { useEffect, useState } from 'react'
import { NaviBar } from './components/NaviBar'
import BottomBar from './components/BottomBar'
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
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [todos, setTodos] = useState([])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setSuccess(false)
    setMessage('')
  }
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
        <TodoContext.Provider value={{ todos: todos, setTodos: setTodos, setSuccess: setSuccess, setError: setError, setMessage: setMessage }}>
          <NaviBar />
          <Switch>
            <Route path='/today'>
              <TaskContainer />
              <BottomBar />
            </Route>
            <Route path='/scheduled'>
              <TaskContainer />
              <BottomBar />
            </Route>
            <Route path='/'>
              {loading ? 'Loading' : <ListContainer />}
            </Route>
          </Switch>
          <Snackbar open={success} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              {message}
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
              Something went wrong!
            </Alert>
          </Snackbar>
        </TodoContext.Provider>
      </Router>
    </MuiThemeProvider>
  )
}
