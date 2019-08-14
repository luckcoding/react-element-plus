import React from 'react';
import { Toast, ToastContainer, Button } from '@crude/ui';


const Example = () => (
  <div>
    <Button
      onClick={() => Toast.show('there is message !')}
    >
        Show Info
    </Button>
    <Button
      onClick={() => Toast.success('there is message !')}
    >
        Show Success
    </Button>
    <Button
      onClick={() => Toast.warning('there is message !')}
    >
        Show Warning
    </Button>
    <Button
      onClick={() => Toast.error('there is message !')}
    >
        Show Error
    </Button>

    <ToastContainer
      duration={5000}
    />
  </div>
);

export default Example;
