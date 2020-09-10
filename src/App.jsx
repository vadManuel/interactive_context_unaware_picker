import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'

import FlipMove from 'react-flip-move'

import Item from './Item'
import duck from './assets/duck_trans.png'
import data from './assets/data.json'

Object.keys(data).forEach(k => {
  data[k] = Object.keys(data[k]).map(i => data[k][i])
})

function App() {
  const [text, setText] = React.useState('')
  const [score, setScore] = React.useState(data.filename.map((f, i) => ({ _index: i, filename: f, score: 0 })))
  const [chips, setChips] = React.useState([])
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleChange = React.useCallback(e => {
    setText(e.target.value)
  }, [])

  const handleSubmit = React.useCallback(e => {
    e.preventDefault()

    let newChips = chips.slice()
    let newScore = score.slice()

    let newChipScore = Array(data.keywords.length).fill(Number.MAX_SAFE_INTEGER)

    data.keywords.forEach((words, i) => {
      let idx = words.indexOf(text)
      idx = idx === -1 ? Number.MAX_SAFE_INTEGER : (newScore[i].score === Number.MAX_SAFE_INTEGER ? idx : newScore[i].score + idx)
      newScore[i] = { ...newScore[i], score: idx }
      newChipScore[i] = idx
    })

    newChips.push({ label: text.toLowerCase(), scores: newChipScore })

    setScore(newScore)
    setText('')
    setChips(newChips)
  }, [text, score, chips])

  const handleChipDelete = React.useCallback(k => {
    let newChips = chips.slice()
    let newScore = score.slice()

    newChips[k].scores.forEach((score, i) => {
      let idx = 0
      if (newScore[i].score === Number.MAX_SAFE_INTEGER || score === Number.MAX_SAFE_INTEGER)
        idx = Number.MAX_SAFE_INTEGER
      else
        idx = newScore[i].score - score

      newScore[i] = { ...newScore[i], score: idx }
    })

    newChips.splice(k)

    setScore(newScore)
    setChips([...newChips, ...chips.slice(k + 1)])
  }, [score, chips])

  return (
    <Container maxWidth='sm'>
      <Grid container justify='center'>
        <Grid item>
          <a href='https://webcourses.ucf.edu/courses/1360085/files?'>
            <img style={{ height: '10rem' }} src={duck} alt='Interactive Context Unaware Picker (ICUP)' title='This will take you to webcourses, so you will have to login.' />
          </a>
        </Grid>
      </Grid>
      <Typography style={{ textAlign: 'center', padding: '1rem 0'}}>
        If you want to view the presentations, then click on the duck.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth variant='outlined' size='small' placeholder='Keywords (press enter to add)' onChange={handleChange} value={text} />
      </form>
      {chips.map((c, i) => (
        <Chip
          clickable
          key={i}
          size='small'
          name={i}
          label={c.label}
          style={{ margin: 2 }}
          onDelete={() => handleChipDelete(i)}
        />
      ))}

      <FlipMove>
        {score.sort((a, b) => a.score - b.score).map((s,i) => (
          <Item key={s.filename} {...s} index={i} expanded={expanded} handleExpand={handleExpand} summary={data.summary[s._index]}></Item>
        ))}
      </FlipMove>
    </Container>
  )
}

export default App
