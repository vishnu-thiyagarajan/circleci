import React, { useState } from 'react'
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
    bottom: 0
  }
})
export default function BottomBar () {
  const [done, setDone] = useState(false)
  const classes = useStyles()
  return (
    <div className={classes.stickToBottom}>
      <ToggleButton
        data-tip='Show done tasks'
        value='false'
        selected={done}
        onChange={() => { setDone(!done) }}
      >
        <DoneOutlineIcon color='primary' />
      </ToggleButton>
      <ReactTooltip />
    </div>
  )
}
