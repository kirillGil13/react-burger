import { FC } from 'react';

interface IProps {
  error: string
}

const ErrorItem: FC<IProps> = ({ error }) => {
  return (
    <span className='text text_type_main-default text_color_inactive' style={{color: 'red'}}>{error}</span>
  );
}

export default ErrorItem