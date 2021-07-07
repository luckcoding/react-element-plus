import { HtmlHTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = (props: HtmlHTMLAttributes<HTMLDivElement>) => {
  const [subling, setSubling] = useState<HTMLDivElement>();

  useEffect(() => {
    const subling = document.createElement('div');
    setSubling(subling);
    document.body.appendChild(subling as any);
    return () => {
      document.body.removeChild(subling);
    };
  }, []);

  return subling ? ReactDOM.createPortal(props.children, subling) : null;
};

export default Portal;
