import React, { useState, useContext } from 'react'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ListIcon from '@material-ui/icons/List'
import TodayIcon from '@material-ui/icons/Today'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Badge from '@material-ui/core/Badge'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { TodoContext } from '../App'

function ButtonGrp () {
  const todoContext = useContext(TodoContext)
  const [type, setType] = useState('Lists')
  const handleType = (event, newType) => {
    if (newType !== null) setType(newType)
  }
  const handleList = () => todoContext.setSelectedList(null)
  const handleToday = () => todoContext.setSelectedList('today')
  const handleScheduled = () => todoContext.setSelectedList('scheduled')
  return (
    <>
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleType}
      >
        <ToggleButton value='Lists' data-tip='Lists' style={{ maxWidth: '40px', maxHeight: '35px' }}>
          <Link to='/'>
            <Badge badgeContent={todoContext.todos.length} color='primary'>
              <ListIcon onClick={handleList} fontSize='large' color='primary' />
            </Badge>
          </Link>
        </ToggleButton>
        <ToggleButton value='Today' data-tip='Today' style={{ maxWidth: '40px', maxHeight: '35px' }}>
          <Link to='/today'>
            <Badge badgeContent={4} color='primary'>
              <TodayIcon onClick={handleToday} fontSize='large' color='primary' />
            </Badge>
          </Link>
        </ToggleButton>
        <ToggleButton value='Scheduled' data-tip='Scheduled' style={{ maxWidth: '40px', maxHeight: '35px' }}>
          <Link to='/scheduled'>
            <Badge badgeContent={4} color='primary'>
              <ScheduleIcon onClick={handleScheduled} fontSize='large' color='primary' />
            </Badge>
          </Link>
        </ToggleButton>
      </ToggleButtonGroup>
      <ReactTooltip place='bottom' />
    </>
  )
}

export default ButtonGrp
