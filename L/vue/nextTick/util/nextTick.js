const nextTick = (
  function() {
    const callbacks = [];
    let pending = false; // mark whether nextTick microtask has been triggered
    let asyncFunc;

    function nextTickHandler() {
      console.log('----------microtask begin ----');
      pending = false;
      // 之所以要slice复制一份出来是因为有的cb执行过程中又会往callbacks中加入内容
      // 比如$nextTick的回调函数里又有$nextTick
      // 这些是应该放入到下一个轮次的nextTick去执行的,
      // 所以拷贝一份当前的,遍历执行完当前的即可,避免无休止的执行下去
      const cps = callbacks.slice(0);
      callbacks.length = 0;
      for (let i = 0; i < cps.length; i++) {
        cps[i]();
      }
      console.log('----------microtask end ----');
    }

    // define asyncFunc
    // mutation observer can alse be used
    if(typeof Promise !== undefined) {
      const logError = e => console.error(e);
      asyncFunc = () => Promise.resolve().then(nextTickHandler).catch(logError);
    } else {
      asyncFunc = () => setTimeout(nextTickHandler, 0);
    }

    // function that is actually exposed
    return function queueNextTick(func, ctx) {
      var tmp = ctx
        ? func.bind(ctx)
        : func;

      callbacks.push(tmp);

      // 如果在当前task已经调用过asycFunc,则直接退出
      if (pending) { return; }
      pending = true;
      asyncFunc();
    }
  }()
);
