export const mockUserScore = {
	user: 'Mock User',
	score: 500,
};

export const mockFetchOptions = {
	method: 'POST',
	mode: 'cors',
	body: JSON.stringify(mockUserScore),
	headers: {
		'Content-Type': 'application/json',
	},
};

export const mockPostScoreSuccessResponse = {
	result: 'Leaderboard score created correctly.',
};

export const mockPostScoreFailureError = "Score couldn't be saved :(";

export const mockScoresData = {
	result: [
		{
			user: 'wewqr',
			score: 300,
		},
		{
			score: 50,
			user: 'erwer',
		},
		{
			user: 'theIncredibleHuman',
			score: 180,
		},
		{
			user: 'aanuman15',
			score: 370,
		},
		{
			user: 'theIncredibleHuman',
			score: 30,
		},
		{
			user: 'theIncredibleHuman',
			score: 90,
		},
		{
			score: 70,
			user: 'anewman15',
		},
		{
			user: 'theIncredibleHuman',
			score: 70,
		},
		{
			score: 120,
			user: 'erwrw',
		},
		{
			score: 90,
			user: 'anewman15',
		},
		{
			user: 'এর্বর',
			score: 140,
		},
		{
			user: 'wrwe',
			score: 30,
		},
		{
			user: 'theIncredibleHuman',
			score: 30,
		},
		{
			score: 30,
			user: 'erwrw',
		},
		{
			score: 500,
			user: 'theIncredibleHuman',
		},
		{
			user: 'anewman15',
			score: 250,
		},
		{
			user: 'theIncredibleHuman',
			score: 50,
		},
	],
};

const clonedMockScores = { ...mockScoresData };
clonedMockScores.result.sort((a, b) => b.score - a.score);
export const mockTopScores = clonedMockScores.result.slice(0, 10);