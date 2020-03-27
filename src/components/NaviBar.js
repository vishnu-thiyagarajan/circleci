import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import ReactTooltip from 'react-tooltip'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import ButtonGrp from './ButtonGrp'

const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px grey',
    color: 'black',
    padding: '0 0px'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
})
export function NaviBar (props) {
  const [input, setInput] = useState('')
  const [selectedTask, setSelectedTask] = useState(null)
  const getNewList = () => setInput(input === 'newlist' ? '' : 'newlist')
  const getSearchList = () => setInput(input !== 'searchlist' ? 'searchlist' : '')
  const classes = useStyles()
  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar className={classes.controls}>
          {selectedTask &&
            <Button data-tip='Go Back'>
              <ArrowBackIcon color='primary' />
            </Button>}
          {!selectedTask &&
            <ToggleButton
              data-tip='New List'
              value='false'
              selected={input === 'newlist'}
              onChange={getNewList}
            >
              <AddIcon color='primary' />
            </ToggleButton>}
          <ButtonGrp />
          {selectedTask &&
            <Button data-tip='Clear done'>
              <ClearAllIcon color='primary' />
            </Button>}
          {!selectedTask &&
            <ToggleButton
              data-tip='Search Lists'
              value='false'
              selected={input === 'searchlist'}
              onChange={getSearchList}
            >
              <SearchIcon color='primary' />
            </ToggleButton>}
        </Toolbar>
        <Box m='auto' p={1} width='50%'>
          {selectedTask && <div className={classes.center}>{selectedTask}</div>}
          {input === 'newlist' && !selectedTask &&
            <TextField
              label='New list name'
              size='small'
              autoFocus
              variant='outlined'
              fullWidth
            />}
          {input === 'searchlist' && !selectedTask &&
            <TextField
              size='small'
              autoFocus
              label='Search list name'
              type='search'
              variant='outlined'
              fullWidth
            />}
        </Box>
      </AppBar>
      <ReactTooltip />
    </>
  )
}
