import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function ({ seconds }) {
    localStorage.setItem('videoplayer-current-time', seconds);
  }, 1000)
);

window.onload = () => {
  if (localStorage['videoplayer-current-time']) {
    player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
  }
};
