export function WiXcoin({ width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="17"
      height="17"
      viewBox="0 0 17 17"
    >
      <defs>
        <filter id="Ellipse_21">
          <feOffset dx="1" dy="1" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood flood-opacity="0.322" result="color" />
          <feComposite operator="out" in="SourceGraphic" in2="blur" />
          <feComposite operator="in" in="color" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
        <filter
          id="Path_128"
          x="2.742"
          y="4.916"
          width="11.516"
          height="9.168"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="1" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="0.5" result="blur-2" />
          <feFlood flood-opacity="0.141" />
          <feComposite operator="in" in2="blur-2" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g id="Group_85" data-name="Group 85" transform="translate(-37 -181)">
        <g data-type="innerShadowGroup">
          <circle
            id="Ellipse_21-2"
            data-name="Ellipse 21"
            cx="8.5"
            cy="8.5"
            r="8.5"
            transform="translate(37 181)"
            fill="#d8a25e"
          />
          <g transform="matrix(1, 0, 0, 1, 37, 181)" filter="url(#Ellipse_21)">
            <circle
              id="Ellipse_21-3"
              data-name="Ellipse 21"
              cx="8.5"
              cy="8.5"
              r="8.5"
              fill="#fff"
            />
          </g>
          <g
            id="Ellipse_21-4"
            data-name="Ellipse 21"
            transform="translate(37 181)"
            fill="none"
            stroke="#d8a25e"
            stroke-width="2"
          >
            <circle cx="8.5" cy="8.5" r="8.5" stroke="none" />
            <circle cx="8.5" cy="8.5" r="7.5" fill="none" />
          </g>
        </g>
        <g transform="matrix(1, 0, 0, 1, 37, 181)" filter="url(#Path_128)">
          <path
            id="Path_128-2"
            data-name="Path 128"
            d="M8.706,4.05,6.881,10.209H5.738L4.444,5.548,3.07,10.209l-1.134.009L.19,4.05H1.262L2.538,9.066,3.921,4.05H5.055L6.34,9.039,7.625,4.05Z"
            transform="translate(4.05 1.37)"
            fill="#f9bb5f"
          />
        </g>
      </g>
    </svg>
  );
}
