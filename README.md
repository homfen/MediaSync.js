## MediaSync.js

Working with [timingsrc](http://webtiming.github.io/timingsrc/index.html), sync timing object and video.

#### Install

```
npm install mediasync.js
```

#### Usage

```
import MediaSync from 'mediasync.js'

const timing = new TIMINGSRC.TimingObject({
  position: 0,
  velocity: 0,
  acceleration: 0,
});

const video = document.querySelector('video');

MediaSync(video, timing);
```
