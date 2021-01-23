export const postScore = async (userInfo) => {
	const optionsObject = {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify(userInfo),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const uri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/HlhJM0tltblLcmbw1VvF/scores/';
		const response = await fetch(uri, optionsObject);
		const data = await response.json();
		return data;
	} catch (error) {
		return "Score couldn't be saved :(";
	}
};

export const getTopScores = async () => {
	const uri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/HlhJM0tltblLcmbw1VvF/scores/';
	try {
		const response = await fetch(uri);
		const data = await response.json();
		const { result } = data;
		result.sort((a, b) => b.score - a.score);
		const topScores = data.result.slice(0, 10);
		return topScores;
	} catch (error) {
		return "Couldn't retrieve Leaderboard information :(";
	}
};