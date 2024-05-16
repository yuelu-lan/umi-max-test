import { trim } from '@/utils/format';
import { isString } from 'lodash';

self.addEventListener('message', (e) => {
  const data = e.data;
  console.log('🚀 ~ 主线程传递的消息:', trim(data), isString(data));

  setTimeout(() => {
    postMessage('hello worker !!!');
  }, 1000);
});
