import Game from '../Game';

const formPlayerName = document.getElementById('form-player-name');
const formContainer = document.getElementById('form-container');

export const formEventListener = () => {
  formPlayerName.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerName = document.getElementById('player-name').value;
    if(!playerName) window.game = new Game();
    window.game = new Game(playerName);
    formPlayerName.reset();
    formContainer.classList.add('d-none');
  });
}