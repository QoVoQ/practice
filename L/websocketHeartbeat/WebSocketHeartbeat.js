// @see https://github.com/zimv/WebSocketHeartBeat/blob/master/heartBeat.js
// @see https://www.cnblogs.com/1wen/p/5808276.html#!comments
// @see https://stackoverflow.com/questions/10550558/nginx-tcp-websockets-timeout-keepalive-config
// If back-end use a reverse-proxy server(nginx) to handle links of websocket,
// A heartbeat communication between server and client side is needed to prevent
// timeout of websocket.

// class `WebSocketHeartbeat` implements client side heartbeat communication.
// When an existing websocket connection is closed, client will try to restart
// a new websocket connection automatically.
export class WebSocketHeartbeat {
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
    this.isReconnecting = false;
    this.handlers = { onOpen, onMessage, onClose, onError };
    this.createSocket();
    this.reconnectTime = 0;
  }

  createSocket() {
    this.ws = new WebSocket(this.url);
    this.initEvents();
  }

  initEvents() {
    this.ws.onopen = e => {
      this.startHeartbeat();
      this.handlers.onOpen(e);
    }

    this.ws.onmessage = e => {
      this.resetHeartbeat();
      this.handlers.onMessage(e);
    }

    this.ws.onerror = e => {
      this.clean();
      this.handlers.onError(e);
      this.reconnect();
    }

    this.ws.onclose = e => {
      this.clean();
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
    if (this.isReconnecting) {
      return;
    }

    this.isReconnecting = true;
    setTimeout(() => {
      try {
        this.createSocket();
      } catch (e) {
        this.clean();
        throw e;
      } finally {
        this.isReconnecting = false;
      }
    }, 2000);

  }
}
