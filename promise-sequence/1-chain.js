import { playlist, playVideo } from './common.js';

function bingeWatch(videos) {
  playVideo(videos[0])
    .then(() => playVideo(videos[1]))
    .then(() => playVideo(videos[2]))
    .then(() => playVideo(videos[3]))
    .then(() => playVideo(videos[4]))
    .then(() => playVideo(videos[5]))
    .then(() => playVideo(videos[6]));
}

bingeWatch(playlist);
