const maxGap = 0.16;
let timer = null;
let timing = null;
let video = null;
let sub = null;

function playbackRate(rate) {
  typeof video.playbackRate === 'function'
    ? video.playbackRate(rate)
    : (video.playbackRate = rate);
}

function currentTime(time) {
  if (typeof video.currentTime === 'function') {
    if (time != null) {
      video.currentTime(time);
    } else {
      return video.currentTime();
    }
  } else {
    if (time != null) {
      video.currentTime = time;
    } else {
      return video.currentTime;
    }
  }
}

function checkPos() {
  const {velocity, position} = timing.query();
  if (velocity > 0) {
    const gap = currentTime() - position;
    const absGap = Math.abs(gap);
    let delay = false;
    if (absGap > maxGap) {
      video.currentTime -= gap;
      delay = true;
    }
    timer = setTimeout(
      () => {
        checkPos();
      },
      delay ? Math.trunc(absGap * 100) : 10,
    );
  } else {
    currentTime(position);
  }
}

function onChange() {
  const vector = timing.query();
  const {velocity} = vector;
  playbackRate(velocity);
  clearTimeout(timer);
  checkPos();
  if (velocity > 0) {
    if (video.paused) {
      video.play();
    }
  } else {
    if (!video.paused) {
      video.pause();
    }
  }
}

export function unSync(timing) {
  if (sub) {
    timing.off(sub);
  }
  clearTimeout(timer);
}

export default function sync(theVideo, theTiming) {
  if (timing) {
    unSync(timing);
  }
  timing = theTiming;
  video = theVideo;
  sub = timing.on('change', onChange);
}
