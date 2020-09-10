import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Item = React.forwardRef((props, ref) => {
	let style = { margin: '5px 0' }
	if (props.index < 10)
		style = { ...style, backgroundColor: 'white', color: 'black' }
	else
		style = { ...style, backgroundColor: 'lightgray', color: 'gray' }

	return (
		<Accordion expanded={props.expanded === `panel${props.index}`} onChange={props.handleExpand(`panel${props.index}`)} ref={ref} key={props.filename} style={style}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Grid container justify='space-between'>
					<Grid item xs={2} md={1}>
						<Typography style={{ textAlign: 'center' }}>{props.index+1}</Typography>
					</Grid>
					<Grid item xs={10} md={11}>
						<Typography>{props.filename}</Typography>
					</Grid>
				</Grid>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction='column'>
					<Grid item style={{ marginBottom: 5 }}>
						<Typography style={{ }}>Score: {props.score === Number.MAX_SAFE_INTEGER ? '---' : props.score}</Typography>
						<Typography style={{ fontStyle: 'italic' }}>This summary is auto-generated, so there will be plenty of mistakes.</Typography>
					</Grid>
					<Grid item>
						<Typography>{props.summary}</Typography>
					</Grid>
				</Grid>
				
			</AccordionDetails>
		</Accordion>
	)
})

Item.propTypes = {
	summary: PropTypes.string.isRequired,
	expanded: PropTypes.any.isRequired,
	handleExpand: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	filename: PropTypes.string.isRequired,
	score: PropTypes.number
}

export default Item