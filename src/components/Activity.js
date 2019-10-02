import React, { useEffect } from 'react';
import './Activity.css';

const drawLine = ({id, position, type}) => {
	const color = {
		commit: '#00bb00cc'
	}
	const height = 20;
	const width = 150;
	const x = width * position;
	const context = document.querySelector(`.activity-canvas-${id}`).getContext('2d');
	//context.translate(-0.5, -0.5);
	context.lineWidth = 1;
	context.strokeStyle = color.commit;
	context.beginPath();
	context.moveTo(x, 0);
	context.lineTo(x, height);
	context.stroke();
};

const Activity = (props) => {
	
	const {id, fromTimestamp, toTimestamp, events} = props.data;
	
	useEffect(() => {
		events.forEach(event => {
			const position = (event.timestamp - fromTimestamp) / (toTimestamp - fromTimestamp);
			drawLine({
				id,
				position,
				type: 'commit',
			});
		})
	});
	
	return (
		<div className="Activity">
			<canvas className={`activity-canvas-${id}`} width="150" height="20"/>
		</div>
	);
};

export default Activity;