type svgProps = {
  svgPicture: 'error' | 'edit' | 'delete';
};
const svgOptions = ({ svgPicture }: svgProps) => {
  return (
    <div>
      {svgPicture === 'error' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current flex-shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
      ) : svgPicture === 'edit' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='20px'
          height='20px'
          viewBox='0 -0.5 21 21'
          version='1.1'
        >
          <g
            id='Page-1'
            stroke='none'
            strokeWidth='1'
            fill='none'
            fillRule='evenodd'
          >
            <g
              id='Dribbble-Light-Preview'
              transform='translate(-59.000000, -400.000000)'
              fill='#000000'
            >
              <g id='icons' transform='translate(56.000000, 160.000000)'>
                <path
                  d='M3,260 L24,260 L24,258.010742 L3,258.010742 L3,260 Z M13.3341,254.032226 L9.3,254.032226 L9.3,249.950269 L19.63095,240 L24,244.115775 L13.3341,254.032226 Z'
                  id='edit_fill-[#1480]'
                ></path>
              </g>
            </g>
          </g>
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20px'
          height='20px'
          viewBox='0 0 24 24'
          fill='none'
        >
          <g id='Interface / Trash_Full'>
            <path
              id='Vector'
              d='M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
        </svg>
      )}
    </div>
  );
};
export default svgOptions;
