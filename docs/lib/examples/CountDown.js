import React from 'react';
import { CountDown } from '@crude/ui';
import { delay } from '@crude/extras';

const Example = () => (
  <div>
    <CountDown
      onClick={async (run) => {
        await delay(1000);
        run();
      }}
    />
    <CountDown
      text="To Do"
      nextText="Try Again"
      duration={10}
      cache="cache-1"
      onClick={run => run()}
    />
    <CountDown disabled />
    <CountDown />
  </div>
);
export default Example;
