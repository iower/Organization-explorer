const allowSeriesOfRequests = true;

const api = {
	
	getRepos: (orgName, callback) => {
		const url = `https://api.github.com/orgs/${orgName}/repos`;
		fetch(url)
			.then(answer => answer.json())
			.then(json => {
				callback(json)
			});
	},
	
	getEvents: ({orgName, repoName}, callback) => {
		//`https://api.github.com/repos/${orgName}/${repoName}/events`
	},
	
	getCommits: async ({orgName, repoName}, callback) => {
		
		let page = 1;
		let json;
		let jsonAcc = [];
		
		do {
			const url = `https://api.github.com/repos/${orgName}/${repoName}/commits?page=${page++}`;
			console.log('Request...');
			await fetch(url)
				.then(answer => answer.json())
				.then(answerJson => {
					json = answerJson;
				});
			jsonAcc = jsonAcc.concat(json);
		} while (allowSeriesOfRequests && json.length);
		
		
		callback(jsonAcc);
		
	},
	
}

export default api;
