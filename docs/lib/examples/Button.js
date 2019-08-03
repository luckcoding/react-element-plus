import React from 'react';
import { Button } from '@crude/ui';

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <Button>default</Button>
        <Button small>small</Button>
        <Button large>large</Button>
        <br />
        <Button full>full</Button>
        <Button block>block</Button>
        <br />
        <Button clear>clear</Button>
        <Button outline>outline</Button>
        <br />
        <Button round>round</Button>
        <br />
        <Button color="secondary">color=secondary</Button>
        <Button color="tertiary">color=tertiary</Button>
        <Button color="success">color=success</Button>
        <Button color="warning">color=warning</Button>
        <Button color="danger">color=danger</Button>
        <Button color="light">color=light</Button>
        <Button color="medium">color=medium</Button>
        <Button color="dark">color=dark</Button>
        <br />
        <Button disabled>color=secondary disabled</Button>
        <Button color="secondary" disabled>color=secondary disabled</Button>
        <br />
        <Button loading loadingType="bar">loading</Button>
        <br />
        <Button startSlot={<span>startSlot</span>}>startSlot</Button>
        <Button endSlot={'endSlot'} color="secondary">endSlot</Button>
        <Button endSlot={'endSlot'} loading color="danger">endSlot with loading</Button>
        <br />
        <Button tag="a" href="/" disabled>tag=a</Button>
        <br />
        <Button debounce={1000} onClick={() => console.log(Date.now())}>debounce=1000,clickTime</Button>
      </div>
    );
  }
}
