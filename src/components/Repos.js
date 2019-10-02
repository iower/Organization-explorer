import React from 'react';
import './Repos.css';
import Activity from './Activity';


const Repos = (props) => {
	
	const { repos } = props;
	
	repos.sort((repo1, repo2) => {
		return repo1.stargazers_count > repo2.stargazers_count ? -1 : 1;
	});
	
	return (
		<table className="Repos">
			<thead>
				<tr>
					<th>⭐</th>
					<th>🥢</th>
					<th>⚠️</th>
					<th>Repo</th>
					<th>Activity</th>
				</tr>
			</thead>
			<tbody>
				{
					repos.map(repo => {
						return <Repo
							repo={repo}
							key={repo.id}
						/>
					})
				}
			</tbody>
		</table>
	);
};

const Repo = (props) => {
	const { repo } = props;
	
	let activityData = null;
	
	if (repo.commits) {
		
		const events = repo.commits.map(item => {
			return {
				timestamp: +(new Date(item.commit.author.date)),
				type: 'commit',
				message: item.commit.message,
				author: item.author,
			};
		});
		
		events.sort((event1, event2) => {
			return event1.timestamp > event2.timestamp ? 1 : -1;
		});
		
		const toTimestamp = new Date();
		const fromTimestamp = events.length ? events[0].timestamp : toTimestamp;
		
		activityData = {
			id: repo.id,
			fromTimestamp,
			toTimestamp,
			events
		}
		
	}
	
	console.log('activityData', activityData);
	
	return (
		<tr className="Repo">
			<td className="repo-stars-count">{repo.stargazers_count}</td>
			<td className="repo-forks-count">{repo.forks_count}</td>
			<td className="repo-open-issues-count">{repo.open_issues_count}</td>
			<td>
				<h3 className="repo-name">{repo.name}</h3>
				<div className="repo-description">{repo.description}</div>
			</td>
			<td>
				{
					!activityData
					?
					<span>...</span>
					:
					<Activity data={activityData} />
				}
			</td>
		</tr>
	);
};

export default Repos;