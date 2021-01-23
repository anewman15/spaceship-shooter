/*
  eslint-disable no-underscore-dangle
*/

import User from '../user-data/User';

describe('User', () => {
	let newUser;
	beforeEach(() => {
		newUser = new User('Test Username');
	});

	test('allows creating a User', () => {
		expect(newUser instanceof User).toBe(true);

		expect(newUser).toEqual({
			_username: 'Test Username',
			_score: 0,
		});
	});

	test('allows getting the username', () => {
		expect(newUser.username).toBe(newUser._username);
	});

	test('allows resetting the username', () => {
		newUser.username = 'New Test Username';
		expect(newUser.username).toBe('New Test Username');
	});

	test('allows getting the score', () => {
		expect(newUser.score).toBe(newUser._score);
	});

	test('allows resetting the username', () => {
		newUser.score = 100;
		expect(newUser.score).toBe(100);
	});
});