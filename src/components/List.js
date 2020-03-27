import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'

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

export default function List () {
  const classes = useStyles()
  const [name, setName] = useState('checkkkkkkkkkkkkkkkkkkkkkk')
  const [edit, setEdit] = useState(false)
  const arr = ['checkkkkkkkkkkkkkkkkkkkkkkkkkkkk', 'ellepsissssssssssss', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'q','baaaa']
  return (
    <div>
      <div className={classes.root}>
        <Paper elevation={20}>
          <Badge badgeContent={4} color='primary'>
            <div className={classes.preview}>
              <p className={classes.para}>{arr.join('\n')}</p>
            </div>
          </Badge>
        </Paper>
      </div>
      <Tooltip title={name}>
        <div className={classes.heading}>
          <Button><DeleteIcon /></Button>
          {!edit && <div onClick={() => { setEdit(true) }}>{name}</div>}
          {edit &&
            <div className={classes.editBox}>
              <TextField
                autoFocus
                onChange={(event) => setName(event.target.value)}
                onBlur={() => { setEdit(false) }}
                onKeyUp={(event) => { if (event.key === 'Enter') setEdit(false) }}
                label='Edit list name'
                size='small'
                value={name}
              />
            </div>}
        </div>
      </Tooltip>
    </div>
  )
}
