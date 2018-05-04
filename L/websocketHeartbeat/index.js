// @see https://github.com/zimv/WebSocketHeartBeat/blob/master/heartBeat.js
// @see https://www.cnblogs.com/1wen/p/5808276.html#!comments
class WebSocketHeartbeat {
  constructor({
    url,
    onOpen,
    onMessage,
    onClose,
    onError,
    heartbeatInterval = 30 * 1000,
    heartbeatResTimeout = 10 * 1000
  }) {
    if (!WebSocket) {
      throw new Error('WebSocket is not available!');
    }
    this.ws = null;
    this.url = url;
    this.heartbeatInterval = heartbeatInterval;
    this.heartbeatIntervalTimer = null;
    this.heartbeatResTimeout = heartbeatResTimeout;
    this.heartbeatResTimeoutTimer = null;
    this.isConnecting = false;
    this.handlers = { onOpen, onMessage, onClose, onError };
    this.createSocket();
  }

  createSocket() {
    this.ws = new WebSocket(url);
    this.initEvents();
  }

  initEvents() {
    this.ws.onopen = e => {
      this.isConnecting = true;
      this.startHeartbeat();
      this.handlers.onOpen(e);
    }

    this.ws.onmessage = e => {
      this.resetHeartbeat();
      this.handlers.onMessage(e);
    }

    this.ws.onerror = e => {
      this.clean();
      this.isConnecting = false;
      this.handlers.onError(e);
      this.reconnect();
    }

    this.ws.onclose = e => {
      this.clean();
      this.isConnecting = false;
      this.handlers.onClose(e);
      this.reconnect();
    }
  }

  resetHeartbeat() {
    clearTimeout(this.heartbeatResTimeoutTimer);
  }

  startHeartbeat() {
    this.heartbeatIntervalTimer = setInterval(() => {
      this.ws.send('signal:heartbeat');

      this.heartbeatResTimeoutTimer = setTimeout(() => {
        this.ws.close();
      }, this.heartbeatResTimeout);

    }, this.heartbeatInterval);
  }

  clean() {
    clearInterval(this.heartbeatIntervalTimer);
    clearTimeout(this.heartbeatResTimeoutTimer);
  }

  reconnect() {
    if (this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    try {
      this.createSocket();
    } catch (e) {
      this.isConnecting = false;
      throw e;
    }
  }
}
