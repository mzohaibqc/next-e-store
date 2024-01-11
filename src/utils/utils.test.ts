import { expect, test } from 'vitest';
import { sleep } from './index';

test('sleep', async () => {
    const time1 = Date.now();
    await sleep(50);
    const time2 = Date.now();
    expect((time2 - time1) >= 50).toBeTruthy()
});