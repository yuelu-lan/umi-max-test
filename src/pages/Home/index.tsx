import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  useEffect(() => {
    const worker = new Worker(new URL('@/workers/worker.ts', import.meta.url), {
      type: 'module',
    });

    worker.postMessage('    massage');

    worker.addEventListener('message', (e) => {
      console.log('worker 传递给主线程的消息', e.data);
    });

    return () => {
      console.log('worker stop!');

      worker.terminate();
    };
  }, []);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
