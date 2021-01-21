export default class User {
  constructor(username = 'theIncredibleHuman') {
    this._username = username;
    this._score = 0
  }

  get username() {
    return this._username;
  }

  set username(newUsername) {
    this._username = newUsername;
  }

  get score() {
    return this._score;
  }

  set score(newScore) {
    this._score = newScore;
  }
}