import { postScore, getTopScores } from '../../user-data/api';
import {
	mockUserScore,
	mockFetchOptions,
	mockPostScoreSuccessResponse,
	mockPostScoreFailureError,
	mockScoresData,
	mockTopScores,
} from '../__mocks__/__api_data__';

beforeEach(() => {
	fetch.resetMocks();
});

describe('postScore function', () => {
	it('posts user score successfully', async () => {
		fetch.mockResponseOnce(JSON.stringify(mockPostScoreSuccessResponse));
		const result = await postScore(mockUserScore);
		const uri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/HlhJM0tltblLcmbw1VvF/scores/';

		expect(result).toBe('Leaderboard score created correctly.');
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(uri, mockFetchOptions);
	});

	it('returns error when failed', async () => {
		fetch.mockReject(() => mockPostScoreFailureError);
		const result = await postScore(mockUserScore);
		const uri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/HlhJM0tltblLcmbw1VvF/scores/';

		expect(result).toBe("Score couldn't be saved :(");
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(uri, mockFetchOptions);
	});
});

describe('getTopScores', () => {
	it('gets top scores successfully', async () => {
		fetch.mockResponseOnce(JSON.stringify(mockScoresData));
		const topScores = await getTopScores();
		const uri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/HlhJM0tltblLcmbw1VvF/scores/';

		expect(topScores).toEqual(mockTopScores);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(uri);
	});

	it('returns error when fetch fails', async () => {
		fetch.mockResponseOnce(JSON.stringify(undefined));
		const topScores = await getTopScores();
		const uri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/HlhJM0tltblLcmbw1VvF/scores/';

		expect(topScores).toEqual("Couldn't retrieve Leaderboard information :(");
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(uri);
	});
});