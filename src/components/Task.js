import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/Comment'
import ReactTooltip from 'react-tooltip'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0px',
    margin: '10px',
    backgroundColor: theme.palette.background.paper
  },
  listItemText: {
    fontSize: '20px'
  }
}))

export default function Task (props) {
  const taskObj = props.task
  const classes = useStyles()
  return (
    <>
      <List className={classes.root}>
        <ListItem dense button>
          <ListItemIcon>
            <Checkbox
              edge='start'
              checked={taskObj.done}
              // onChange={() => }
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.listItemText }} primary={taskObj.taskname} />
          <ListItemSecondaryAction>
            {/* <div>{taskObj.duedate}</div>
            <div>{taskObj.priority}</div> */}
            <IconButton edge='end'>
              <CommentIcon data-tip='Details' />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ReactTooltip />
      </List>
    </>
  )
}
