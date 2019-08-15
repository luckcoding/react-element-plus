import React from 'react';
import { Avatar } from '@crude/ui';

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
const fitUrl = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];

export default class extends React.PureComponent {
  render() {
    const errorHandler = () => {
      return true
    }
    return (
      <div>
        <div className="row-part">
          <Avatar size={50} src={circleUrl}/>
          <Avatar size="large" src={circleUrl}/>
          <Avatar size="medium" src={circleUrl}/>
          <Avatar size="small" src={circleUrl}/>
        </div>
        <div className="row-part">
          <Avatar size={50} shape="square" src={squareUrl}/>
          <Avatar size="large" shape="square" src={squareUrl}/>
          <Avatar size="medium" shape="square" src={squareUrl}/>
          <Avatar size="small" shape="square" src={squareUrl}/>
        </div>
        <div className="row-part">
          <Avatar icon="cr-icon-user-solid" />
          <Avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <Avatar>user</Avatar>
        </div>
        <div>
          <Avatar size={60} src="https://empty" error={errorHandler}>
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </Avatar>
        </div>
        <div>
          {fits.map((fit, k) => (
            <Avatar
              key={k}
              shape="square"
              size={100}
              fit={fit}
              src={fitUrl}
            />
          ))}
        </div>
      </div>
    );
  }
}
