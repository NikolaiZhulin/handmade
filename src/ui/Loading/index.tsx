import { FC, PropsWithChildren } from 'react';

import style from './style.module.scss';

interface IProps {
  className?: string;
}

const Loading: FC<PropsWithChildren<IProps>> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={`${style.Loading} ${className}
    `}
    >
      <g transform="translate(50,50)">
        <g transform="scale(0.8888888888888888)">
          <g transform="translate(-50,-50)">
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1s"
                keySplines="0.7 0 0.3 1"
                calcMode="spline"
              ></animateTransform>
              <path
                fill="#cc5849"
                d="M12.2,25.7C19.4,14.4,31.5,6.6,45.6,5.2l3.8,7.7l-4.2,8.3c-8.1,1.3-15,6-19.4,12.5l-4.9-7.5L12.2,25.7z"
              ></path>
              <path
                fill="#3875ea"
                d="M56,12.9l-4,8c8.2,0.6,15.5,4.6,20.5,10.6l9.3-0.6l4.7-7.2C78.8,13,66.3,5.7,52.1,5.1L56,12.9z"
              ></path>
              <path
                fill="#09ad64"
                d="M85.1,36.7l-8.9,0.5c3.5,7.2,3.9,15.6,1.1,23.1l5.1,7.7l8.6,0.5c5.6-12.4,5.3-27.1-1-39.2L85.1,36.7z"
              ></path>
              <path
                fill="#cc5849"
                d="M79.1,73.8l-4.9-7.5c-4.4,6.5-11.4,11.1-19.4,12.5l-4.2,8.3l3.8,7.7c14-1.4,26.1-9.2,33.4-20.5L79.1,73.8z"
              ></path>
              <path
                fill="#3875ea"
                d="M14.9,63.3l8.9-0.5c-3.5-7.2-3.9-15.6-1.1-23.1L17.6,32L9,31.5c-5.6,12.4-5.3,27.1,1,39.2L14.9,63.3z"
              ></path>
              <path
                fill="#09ad64"
                d="M44,87.1l4-8c-8.2-0.6-15.5-4.6-20.5-10.6l-9.3,0.6l-4.7,7.2C21.2,87,33.7,94.3,47.9,94.9L44,87.1z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Loading;
