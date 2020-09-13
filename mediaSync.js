const maxGap = 0.16;
let timer = null;
let oldTiming = null;

function checkPos(video, timing) {
  const {velocity, position} = timing.query();
  if (velocity > 0) {
    const gap = video.currentTime - position;
    const absGap = Math.abs(gap);
    let delay = false;
    if (absGap > maxGap) {
      video.currentTime -= gap;
      delay = true;
    }
    timer = setTimeout(
      () => {
        checkPos(video, timing);
      },
      delay ? Math.trunc(absGap * 100) : 10,
    );
  } else {
    video.currentTime = position;
  }
}

export default function sync(video, timing) {
  if (oldTiming) {
    oldTiming.off('change');
  }
  oldTiming = timing;
  timing.on('change', () => {
    const vector = timing.query();
    const {velocity} = vector;
    video.playbackRate = velocity;
    clearTimeout(timer);
    checkPos(video, timing);
    if (velocity > 0) {
      if (video.paused) {
        video.play();
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  });
}
