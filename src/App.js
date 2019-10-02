import React from 'react';
import './App.css';

import api from './api'
import Repos from './components/Repos'


class App extends React.Component {
	
	constructor() {
		super();
		this.state = {
			repos: [],
		}
	}
	
	componentDidMount() {
		
		/*
			organization
				repository
					commit
						author
		*/
		
		
		const orgName = 'cybercongress';
		
		
		api.getRepos(orgName, (json) => {
			
			const repos = json;
			
			this.setState({
				repos,
			});
			
			repos.forEach(repo => {
				
				const repoName = repo.name;
				
				if (repoName !== '.cyber') {
					return;
				}
				
				api.getCommits({
					orgName,
					repoName,
				}, (commits) => {
					const repoIndex = this.state.repos.map(repo => repo.name).indexOf(repoName);
					
					const newRepos = this.state.repos;
					newRepos[repoIndex].commits = commits;
					
					this.setState({
						repos: newRepos
					});
					
				});
				
			});
			
		});
		
		
		
	}
	
	render() {
		
		return (
			<div className="App">
				<h1>Organization explorer</h1>
				<h2>Repositories ({this.state.repos.length}):</h2>
				{
					this.state.repos.length === 0
					?
					<div>Loading...</div>
					:
					<Repos repos={this.state.repos} />
				}
			</div>
		);
	}
	
}

export default App;