import React from 'react'
import { NaviBar } from './components/NaviBar'
import BottomBar from './components/BottomBar'
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
}
)
export default function App () {
  return (
    <MuiThemeProvider theme={theme}>
      <Router><NaviBar />
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
            <ListContainer />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}
