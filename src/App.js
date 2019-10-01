import React from 'react';
import './App.css';

import Repos from './components/Repos'

class App extends React.Component {
	
	constructor() {
		super();
		this.state = {
			repos: [],
		}
	}
	
	getOrgRepos(orgName) {
		const url = `https://api.github.com/orgs/${orgName}/repos`;
		fetch(url)
			.then(answer => answer.json())
			.then(json => {
				//console.log(json);
				this.setState({
					repos: json
				})
			});
	}
	
	componentDidMount() {
		const orgName = 'cybercongress';
		this.getOrgRepos(orgName);
	}
	
	render() {
		
		return (
			<div className="App">
				<h1>Organization explorer</h1>
				<h2>Repositories ({this.state.repos.length}):</h2>
				{
					this.state.repos.length == 0
					?
					<div>Loading...</div>
					:
					<Repos data={this.state.repos} />
				}
			</div>
		);
	}
	
}

export default App;