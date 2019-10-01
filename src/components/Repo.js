import React from 'react';
import './Repo.css';

const Repo = (props) => {
	console.log(props)
	return (
		<div className="Repo">
			<h3>{props.data.name}</h3>
		</div>
	);
}

export default Repo;