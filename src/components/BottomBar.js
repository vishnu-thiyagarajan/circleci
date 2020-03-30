import React from 'react'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { makeStyles } from '@material-ui/core/styles'
import ReactTooltip from 'react-tooltip'

const useStyles = makeStyles({
  stickToBottom: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'white'
  }
})
export default function BottomBar (props) {
  const classes = useStyles()
  return (
    <div className={classes.stickToBottom}>
      <ToggleButton
        data-tip='Show done tasks'
        value='false'
        selected={props.doneTasks}
        onChange={() => { props.setDoneTasks(!props.doneTasks) }}
      >
        <DoneOutlineIcon color='primary' />
      </ToggleButton>
      <ReactTooltip />
    </div>
  )
}
