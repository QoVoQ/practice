import { WebSocketHeartbeat } from './WebSocketHeartbeat.js'

const noop = () => { };

const ws = new WebSocketHeartbeat({
  url: 'ws://www.baidu.com',
  onOpen: () => console.log('open'),
  onMessage: noop,
  onError: () => console.log('error'),
  onClose: () => console.log('close')
})

console.log(ws);
