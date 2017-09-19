const scheHasMap = Object.create(null);
const scheQueue = [];
let scheWaiting = false

/**
 * Push a watcher into the watcher queue.
 */
function queueWatcher(watcher) {
  const id = watcher.id;

  // Jobs with duplicate IDs will be skipped
  // every unique watcher only need to be updated in every event loop
  if (scheHasMap[id]) {
    return;
  }

  scheQueue.push(watcher);

  // function queueWatcher only execute once in every event loop
  if (!scheWaiting) {
    scheWaiting = true;
    nextTick(flushSchedulerQueue);
  }
};

function flushSchedulerQueue() {
  for (let i = 0; i < scheQueue.length; i++) {
    const watcher = scheQueue[i];
    const id = watcher.id;
    scheHasMap[id] = null;
    watcher.run();
  }

  resetSchudulerState();
}

function resetSchudulerState() {
  scheQueue.length = 0;
  scheWaiting = false;
}
