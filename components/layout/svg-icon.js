// import { cloneElement } from "react";

export default function SvgIcon({ name, ...props }) {
  // return !props ? icons[name] : cloneElement(icons[name], { ...icons[name].props, ...props });
  return icons[name];
}

const icons = {
  avatar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="m95.84,81.49a49.61,46.87 0 0 0 -10.69,-15.1a49.83,47.07 0 0 0 -15.85,-10.01c-0.05,0 -0.11,0 -0.16,-0.18c8.26,-5.62 13.64,-14.75 13.64,-25.11c0,-17.21 -14.72,-31.08 -32.9,-31.08s-32.9,13.87 -32.9,31.08c0,10.36 5.37,19.49 13.64,25.11c-0.05,0.18 -0.11,0.18 -0.16,0.18c-5.94,2.28 -11.28,5.8 -15.85,10.01a49.83,47.07 0 0 0 -10.69,15.1a49.31,46.58 0 0 0 -3.91,17.21a1.06,1 0 0 0 1.06,1.05l7.96,0c0.58,0 1.05,-0.53 1.06,-1.05c0.27,-9.66 4.38,-18.62 11.65,-25.46c7.52,-7.2 17.51,-11.06 28.15,-11.06s20.63,3.86 28.15,11.06c7.27,6.85 11.38,15.81 11.65,25.46c0.01,0.7 0.48,1.05 1.06,1.05l7.96,0a1.06,1 0 0 0 1.06,-1.05c-0.13,-5.97 -1.45,-11.77 -3.91,-17.21zm-45.96,-28.8c-6.09,0 -11.82,-2.28 -16.13,-6.32s-6.69,-9.48 -6.69,-15.28c0,-5.8 2.37,-11.24 6.69,-15.28s10.04,-6.32 16.13,-6.32s11.82,2.28 16.13,6.32s6.69,9.48 6.69,15.28c0,5.8 -2.37,11.24 -6.69,15.28s-10.04,6.32 -16.13,6.32z" />
    </svg>
  ),
  image: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M22,3H2A1,1,0,0,0,1,4V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V4A1,1,0,0,0,22,3ZM21,19H3v-.531l5.033-4.2,1.3.977L8.293,16.293a1,1,0,0,0,1.414,1.414l6.185-6.185L21,18.333Zm0-4L16.8,9.4a1,1,0,0,0-1.507-.107l-4.53,4.53L8.6,12.2a1,1,0,0,0-1.24.031L3,15.865V5H21ZM5,9a2,2,0,1,1,2,2A2,2,0,0,1,5,9Z" />
    </svg>
  ),
  cart: (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   className="pointer-events-none w-full"
    //   fill="none"
    //   strokeWidth="2"
    //   stroke="currentColor"
    //   aria-hidden="true">
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    //   />
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="8.6" cy="16.9" r="1.5" />
      <circle cx="15.6" cy="16.9" r="1.5" />
      <path d="m2.1,1.9l2,0l3.5,11l8,0" />
      <path d="m6.82,10.4l-1.92,-6l12.51,0c0.34,0 0.58,0.33 0.47,0.66l-1.67,5c-0.06,0.2 -0.26,0.34 -0.47,0.34l-8.92,0z" />
    </svg>
  ),
  bell: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      strokeWidth="1.8"
      stroke="currentColor"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </svg>
  ),
  search: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className="pointer-events-none w-full"
      fill="currentColor"
      strokeWidth="100"
      aria-hidden="true">
      <path d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z" />
    </svg>
  ),
  logout: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2 24 24"
      className="pointer-events-none w-full"
      fill="currentColor"
      stroke="#000000"
      strokeWidth="0.4"
      aria-hidden="true">
      <path
        fill="#555"
        d="M10.2392344,0 C13.3845587,0 16.2966635,1.39466883 18.2279685,3.74426305 C18.4595621,4.02601608 18.4134356,4.43777922 18.124942,4.66396176 C17.8364485,4.89014431 17.4148346,4.84509553 17.183241,4.5633425 C15.5035716,2.51988396 12.9739849,1.30841121 10.2392344,1.30841121 C5.32416443,1.30841121 1.33971292,5.19976806 1.33971292,10 C1.33971292,14.8002319 5.32416443,18.6915888 10.2392344,18.6915888 C13.0144533,18.6915888 15.5774656,17.443711 17.2546848,15.3485857 C17.4825482,15.0639465 17.9035339,15.0136047 18.1949827,15.2361442 C18.4864315,15.4586837 18.5379776,15.8698333 18.3101142,16.1544725 C16.3816305,18.5634688 13.4311435,20 10.2392344,20 C4.58426141,20 8.8817842e-14,15.5228475 8.8817842e-14,10 C8.8817842e-14,4.4771525 4.58426141,0 10.2392344,0 Z M17.0978642,7.15999289 L19.804493,9.86662172 C20.0660882,10.1282169 20.071043,10.5473918 19.8155599,10.802875 L17.17217,13.4462648 C16.9166868,13.701748 16.497512,13.6967932 16.2359168,13.435198 C15.9743215,13.1736028 15.9693667,12.7544279 16.2248499,12.4989447 L17.7715361,10.9515085 L7.46239261,10.9518011 C7.0924411,10.9518011 6.79253615,10.6589032 6.79253615,10.2975954 C6.79253615,9.93628766 7.0924411,9.64338984 7.46239261,9.64338984 L17.7305361,9.64250854 L16.1726778,8.08517933 C15.9110825,7.82358411 15.9061278,7.40440925 16.1616109,7.14892607 C16.4170941,6.89344289 16.836269,6.89839767 17.0978642,7.15999289 Z"
      />
    </svg>
  ),
  moon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.002 8.002 0 1010.586 10.586z" />
    </svg>
  ),
  brightness: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <circle cx="10" cy="10" r="4" />
      <path
        fillRule="evenodd"
        d="M10 2a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 0110 2zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM5 10a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm10.657-5.657a.5.5 0 010 .707l-1.414 1.414a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L5.05 15.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM6.464 6.464a.5.5 0 01-.707 0L4.343 5.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707z"
        clipRule="evenodd"
      />
    </svg>
  ),
  circleHalf: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path fillRule="evenodd" d="M10 17V3a7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
    </svg>
  ),
  edit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="p-1 pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
    </svg>
  ),
  bin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="64 64 896 896"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
    </svg>
  ),
  eye: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="64 64 896 896"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
    </svg>
  ),
  link: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
      <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
    </svg>
  ),
  copy: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path>
      <path d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path>
    </svg>
  ),
  threeBars: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="pointer-events-none w-full"
      viewBox="0 0 100 100"
      strokeWidth="10"
      stroke="currentColor"
      aria-hidden="true">
      <path d="m5,5l89.35,0m-89.35,44.82l89.35,0m-89.35,44.82l89.35,0" strokeLinecap="round" />
    </svg>
  ),
  threeDots: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="64 64 896 896"
      className="pointer-events-none w-full"
      fill="currentColor"
      strokeWidth="30"
      stroke="currentColor"
      aria-hidden="true">
      <path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z" />
    </svg>
  ),
  crossMark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="pointer-events-none w-full"
      fill="none"
      strokeWidth="1"
      stroke="currentColor"
      aria-hidden="true">
      <path d="m10.88,89.06l78.5,-77.94m-78.5,0l78.5,77.94" strokeLinecap="round" strokeWidth="15" />
    </svg>
  ),
  checkMark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  ),
  plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 6v12m6-6H6" />
    </svg>
  ),
  minus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 12H6" />
    </svg>
  ),
  powerOff: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="64 64 896 896"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M705.6 124.9a8 8 0 00-11.6 7.2v64.2c0 5.5 2.9 10.6 7.5 13.6a352.2 352.2 0 0162.2 49.8c32.7 32.8 58.4 70.9 76.3 113.3a355 355 0 0127.9 138.7c0 48.1-9.4 94.8-27.9 138.7a355.92 355.92 0 01-76.3 113.3 353.06 353.06 0 01-113.2 76.4c-43.8 18.6-90.5 28-138.5 28s-94.7-9.4-138.5-28a353.06 353.06 0 01-113.2-76.4A355.92 355.92 0 01184 650.4a355 355 0 01-27.9-138.7c0-48.1 9.4-94.8 27.9-138.7 17.9-42.4 43.6-80.5 76.3-113.3 19-19 39.8-35.6 62.2-49.8 4.7-2.9 7.5-8.1 7.5-13.6V132c0-6-6.3-9.8-11.6-7.2C178.5 195.2 82 339.3 80 506.3 77.2 745.1 272.5 943.5 511.2 944c239 .5 432.8-193.3 432.8-432.4 0-169.2-97-315.7-238.4-386.7zM480 560h64c4.4 0 8-3.6 8-8V88c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8z"></path>
    </svg>
  ),
  download: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="64 64 896 896"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
    </svg>
  ),
  exclamationMark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  ),
  chevronDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  ),
  arrowDownInCircle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M12 17L12 7M12 17L8 13M12 17L16 13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
    </svg>
  ),
  arrowDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M12 17L12 7M12 17L8 13M12 17L16 13" />
    </svg>
  ),
  arrowsUpAndDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="pointer-events-none w-full">
      <path
        fillRule="evenodd"
        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
        clipRule="evenodd"></path>
    </svg>
  ),
  location: (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <g>
        <path d="M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z" />
        <path d="M512 512a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm0 64a160 160 0 1 1 0-320 160 160 0 0 1 0 320z" />
      </g>
    </svg>
  ),
  filter: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10.5A3.502 3.502 0 0 0 18.355 8H21a1 1 0 1 0 0-2h-2.645a3.502 3.502 0 0 0-6.71 0H3a1 1 0 0 0 0 2h8.645A3.502 3.502 0 0 0 15 10.5zM3 16a1 1 0 1 0 0 2h2.145a3.502 3.502 0 0 0 6.71 0H21a1 1 0 1 0 0-2h-9.145a3.502 3.502 0 0 0-6.71 0H3z"
      />
    </svg>
  ),
  heart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      strokeWidth="2.5"
      stroke="currentColor"
      aria-hidden="true">
      <path d="m21.28,4.2c-1.16,-1.51 -2.87,-2.4 -4.65,-2.4c-1.78,0 -3.49,0.89 -4.58,2.4c-1.09,-1.51 -2.8,-2.4 -4.58,-2.4c-1.78,0 -3.49,0.89 -4.65,2.4c-1.3,1.78 -1.37,4.39 -0.21,6.38c0,0 0,0.07 0.07,0.07l8.82,11.38c0.14,0.21 0.34,0.27 0.55,0.27s0.41,-0.07 0.55,-0.27l8.82,-11.31c0,0 0,-0.07 0.07,-0.07c1.16,-1.99 1.09,-4.66 -0.21,-6.44z" />
    </svg>
  ),
  tag: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 200"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="m3.33,196.18c-2.17,-5.68 18.84,-31.24 62.78,-76.71l19.38,-20.01l-19.8,-20.11c-37.02,-37.23 -62.67,-68.15 -62.67,-75.42c0,-1.71 12.35,-1.82 185.43,-1.61l185.32,0.33l4.98,0.50c6.93,3.32 12.66,8.09 16.02,16.15l0.82,5.99l0.33,70.51c0.33,79.6 0.43,77.67 -7.69,87.52c-2.93,3.53 -6.82,6.63 -11.04,8.77l-7.49,2.32l-184.34,0.33c-171.47,0.21 -184.34,0.1 -184.99,-1.5l-0.03,-0.01z" />
    </svg>
  ),
  favorite: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  ),
  phone: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="currentColor"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true">
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  whatsapp: (
    // whatsapp color: "#25d366"
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      className="pointer-events-none w-full"
      aria-hidden="true">
      <path
        d="m20,289l14,-65a138,138 0 1 1 50,47l-64,18z"
        fill="none"
        stroke="currentColor"
        strokeWidth="26"
      />
      <path
        d="m205,169c-3,-2 -6,-3 -9,1l-12,16c-3,2 -5,3 -9,1c-15,-8 -36,-17 -54,-47c-1,-4 1,-6 3,-8l9,-14c2,-2 1,-4 0,-6l-12,-29c-3,-8 -6,-7 -9,-7l-8,0c-2,0 -6,1 -10,5c-22,22 -13,53 3,73c3,4 23,40 66,59c32,14 39,12 48,10c11,-1 22,-10 27,-19c1,-3 6,-16 2,-18"
        fill="currentColor"
      />
    </svg>
  ),
  share: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true">
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="6" r="3" />
      <circle cx="17" cy="18" r="3" />
      <line x1="9.5" y1="10.5" x2="14.5" y2="7.5" id="Path" />
      <line x1="14.5" y1="16.5" x2="9.5" y2="13.5" id="Path" />
    </svg>
  ),
  qr: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none w-full"
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20 18V20H18M20 14H19L17 16M16 18H14V20M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14V15H15V14H14Z" />
      <path d="M17 7H17.001" />
      <path d="M7 7H7.001" />
      <path d="M7 17H7.001" />
    </svg>
  ),
  scan: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="M3 3h1V1H2.5A1.5 1.5 0 001 2.5V4h2V3zM17 3v1h2V2.5A1.5 1.5 0 0017.5 1H16v2h1zM16 17h1v-1h2v1.5a1.5 1.5 0 01-1.5 1.5H16v-2zM3 17v-1H1v1.5A1.5 1.5 0 002.5 19H4v-2H3zM2 14h3V6H2v8zM14 14h-3V6h3v8zM7 14h2V6H7v8zM16 14h2V6h-2v8z" />
    </svg>
  ),
  logo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      className="pointer-events-none h-full"
      strokeWidth="1"
      stroke="currentColor"
      fill="#9bface"
      aria-hidden="true">
      <path d="M43.1,29.5c-0.1,0-0.2,0-0.2,0c-1.6-0.2-2.9-0.6-4.1-1.5c-0.1-0.1-0.1-0.1-0.2-0.1 c-0.6-0.5-1.1-0.2-1.4-0.1l-0.1,0.1c-1.5,1.1-3.2,1.7-5.2,1.7c-2.1,0-3.8-0.6-5.4-1.8c-0.6-0.4-1,0-1,0c-1.6,1.3-3.4,1.9-5.5,1.9 c-2,0-3.8-0.6-5.3-1.8c-0.1-0.1-0.2-0.1-0.2-0.2c-0.5-0.4-1,0-1,0c-1.5,1.2-3.2,1.8-5.1,1.9c0,0-0.6,0-0.6,0.7v12c0,1,0,2.1,0,2.9 c0,0.3,0.2,1,1.1,1.2h18.5c1-0.2,1.1-0.9,1.1-1.2c0-0.8,0-1.8,0-2.9c0-2.6,0-5.1,0-7.7c0.1-0.3,0.2-0.6,1-0.6c2.8,0,5.6,0,8.4,0 c0.2,0,0.3,0,0.5,0c0.3,0.1,0.6,0.3,0.6,1c0,2.5,0,4.9,0,7.3c0,1,0,1.9,0,2.7c0,1.1,0.8,1.3,1,1.3h2.8c0.2,0,1-0.2,1-1.3 c0-0.8,0-1.7,0-2.7V30.6C43.9,29.8,43.5,29.6,43.1,29.5z M23.2,41c0,0.1,0,0.2,0,0.3c0,0.4-0.2,1-1.2,1c-2.7,0-5.4,0-8.1,0 c-0.9,0-1.1-0.4-1.2-0.8c0-0.1,0-0.2,0-0.4c0-1.8,0-3.8,0-5.7c0-1.4,0.8-1.5,1.1-1.5c2.8,0,5.7,0,8.5,0c0.3,0,1,0.2,1,1.3 C23.2,37.2,23.2,39.1,23.2,41z" />
      <path d="M42.3,25.5c2.2,0.6,4.1,0.2,5.7-1.4c1-1,1.7-2.2,1.9-3.5c0-0.1,0-0.2,0-0.2c-0.2-0.5-0.4-1-0.6-1.4 c-2.4-4.3-4.7-8.6-7-12.9c-0.3-0.6-1-0.6-1.2-0.6H10.6c0,0-0.9,0-1.2,0.6c-2.4,4.3-4.7,8.7-7,12.9C2.2,19.4,2,20,2,20.6 c0,0.1,0,0.1,0,0.2c0.2,1.4,0.8,2.6,1.8,3.5c1.8,1.6,3.8,2,6.2,1.2c1.3-0.5,2.2-1.3,3-2.5c0.1-0.1,0.2-0.2,0.3-0.3 c0.5-0.3,1.1-0.2,1.5,0.3c0.4,0.6,0.9,1.2,1.5,1.6c1.7,1.3,3.6,1.5,5.6,0.9c1.3-0.4,2.3-1.3,3-2.5c0.4-0.6,1.4-0.7,1.8,0 c0.2,0.2,0.3,0.5,0.5,0.7c1,1.2,2.3,1.9,3.8,2.1c1.4,0.2,2.8-0.2,4.1-1c0.7-0.5,1.3-1.1,1.7-1.8c0.5-0.6,1.4-0.6,1.8,0 c0.8,1.3,1.8,2.1,3.3,2.5L42.3,25.5z" />
    </svg>
  ),
  foodDeliverBike: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 85.22"
      className="pointer-events-none h-full"
      fill="currentColor"
      aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.08,7.33h35.4c1.35,0,2.46,1.11,2.46,2.46V30.4h0.24c1.49,0,2.7,1.22,2.7,2.7v3.01 c0,1.51-1.24,2.74-2.74,2.74h-19c14.12,1.26,22.19,14.39,21.31,31.46h-12.56c-0.01,8.23-6.69,14.89-14.92,14.89 c-8.23,0-14.91-6.67-14.92-14.89H41.68c-0.01-0.27-0.02-0.53-0.03-0.8c0.03,1.81-0.08,3.73-0.34,5.78L7.87,59.54L0,55.82 c6.32-7.19,13.94-10.21,23.16-8.13c1.42,0.36,2.76,0.78,4.03,1.26c-1.3-0.5-2.67-0.92-4.11-1.28l10.52-34.65l-4.75-0.09l0,0 c-0.98-0.02-2.04,0.25-2.71-0.23c-1.16-0.03-2.17-0.73-2.87-1.83c-0.63-0.98-1.01-2.32-1.01-3.78c0-1.46,0.39-2.8,1.01-3.78 c0.52-0.81,1.2-1.4,1.98-1.67c0.01-0.16,0.02-0.27,0.04-0.3c1.12-1.79,3.3-1.25,5.24-1.25l1.89,0.12c1.37,0.17,2.71,0.62,4,1.36 l2.16,1.21h1.75l5.88,1.14c1.92,0.37,2.2,0.21,1.75,2.58c-0.06,0.3-0.13,0.6-0.23,0.89c-0.58,1.73-1.04,1.09-2.83,0.72l-5.51-1.14 c0.21,2.22-0.49,4.94-1.48,8.12c3.17,2.68,4.59,6.5,2.43,11.53l-5.26,16.21C43.9,49.08,49.2,54.74,49.5,64.03h11.67 c7.19-5.45,6-15.15-1.89-21.35v-3.82h0v-5.84c0.01-1.85,1-2.68,2.84-2.63h17.5V9.79C79.62,8.44,80.73,7.33,82.08,7.33L82.08,7.33z M90.68,26.67h18.21c0.14,0,0.26,0.12,0.26,0.26v0.52c0,0.14-0.12,0.26-0.26,0.26H90.68c-0.14,0-0.26-0.12-0.26-0.26v-0.52 C90.42,26.79,90.53,26.67,90.68,26.67L90.68,26.67z M100.54,15.35c5.33,0.43,9.19,4.44,8.52,9.72H90.5 c-0.65-5.31,3.22-9.33,8.59-9.72v-1.49h-1.48c-0.15,0-0.27-0.12-0.27-0.27v-0.97c0-0.15,0.12-0.27,0.27-0.27h4.37 c0.15,0,0.27,0.12,0.27,0.27v0.97c0,0.15-0.12,0.27-0.27,0.27h-1.45V15.35L100.54,15.35L100.54,15.35z M7.91,59.56l13.3,6.3 l-4.32-1.98c-2.97,0.63-5.19,3.27-5.19,6.42c0,3.63,2.94,6.57,6.57,6.57c3.63,0,6.57-2.94,6.57-6.57c0-1.12-0.28-2.17-0.77-3.1 l9.08,4.3c-0.61,7.68-7.04,13.72-14.87,13.72c-8.24,0-14.92-6.68-14.92-14.92C3.34,66.08,5.09,62.27,7.91,59.56L7.91,59.56 L7.91,59.56z M25.27,4.2c0.06,1.92,0.19,4.39,0.28,6.05c-0.16-0.14-0.32-0.32-0.46-0.55c-0.42-0.65-0.67-1.58-0.67-2.62 s0.26-1.97,0.67-2.62C25.15,4.37,25.21,4.28,25.27,4.2L25.27,4.2z M88.4,70.32h13.14c-0.01,3.62-2.95,6.54-6.57,6.54 C91.35,76.87,88.41,73.94,88.4,70.32L88.4,70.32L88.4,70.32z"
      />
    </svg>
  ),
  personPushingCart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 517 517"
      className="pointer-events-none h-full"
      fill="currentColor"
      aria-hidden="true">
      <circle cx="91.208" cy="487.324" r="28.252"></circle>
      <circle cx="224.394" cy="487.324" r="28.252"></circle>
      <path d="M8.358,278.201l58.044,167.383c0.229,1.328,1.506,3.834,2.859,3.85h178.154c1.348,0.008,2.543-1.072,2.663-2.416 c0,0,0.125-194.075,0.125-195.323c0-1.243,1.095-2.443,2.443-2.443h21.526c1.353,0,2.442-1.095,2.442-2.443v-13.885 c0-1.353-1.095-2.443-2.442-2.443h-42.64c-1.353,0-2.443,1.095-2.443,2.443v40.004c0,1.354-1.095,2.449-2.443,2.449H10.39 C9.042,275.371,8.129,276.873,8.358,278.201z M230.165,416.619c0,1.348-1.095,2.443-2.443,2.443H78.624 c-1.353,0-2.443-1.096-2.443-2.443v-12.227c0-1.352,1.095-2.443,2.443-2.443h149.099c1.348,0,2.443,1.096,2.443,2.443V416.619z M230.165,384.049c0,1.35-1.095,2.443-2.443,2.443H65.398c-1.353,0-2.443-1.094-2.443-2.443v-12.225 c0-1.354,1.095-2.443,2.443-2.443h162.319c1.348,0,2.443,1.094,2.443,2.443v12.225H230.165z M230.165,351.775 c0,1.35-1.095,2.443-2.443,2.443H54.12c-1.353,0-2.443-1.094-2.443-2.443v-12.225c0-1.354,1.095-2.443,2.443-2.443h173.603 c1.348,0,2.443,1.094,2.443,2.443V351.775z M40.694,307.922c0-1.348,1.095-2.443,2.443-2.443h184.58 c1.348,0,2.443,1.096,2.443,2.443v12.227c0,1.348-1.095,2.443-2.443,2.443H43.137c-1.353,0-2.443-1.096-2.443-2.443V307.922z" />
      <circle cx="365.202" cy="42.003" r="42.003"></circle>
      <path d="M468.066,501.83c2.376,9.543,10.939,15.918,20.349,15.918c1.684,0,3.391-0.201,5.093-0.627 c11.245-2.803,18.092-14.191,15.29-25.436l-52.67-211.322c5.546-1.826,15.366-8.311,12.556-28.563L439.991,94.521 c-0.909-4.972-5.427-8.31-10.099-7.458l-64.8,12.45c-0.521,0.072-1.033,0.172-1.549,0.282l-0.914,0.167 c-0.649,0.12-1.262,0.33-1.841,0.588c-5.297,1.898-9.858,5.833-12.35,11.375l-25.422,57.49c0,0-29.858,7.019-35.343,8.329 l-11.633,2.715c-11.289,2.635-18.308,13.918-15.668,25.202c2.257,9.687,10.887,16.223,20.42,16.223 c1.578,0,3.18-0.182,4.781-0.554l37.652-8.783c1.023-0.239,1.971-0.622,2.917-1l17.213-4.059 c6.449-1.563,11.81-6.015,14.534-12.073l9.549-21.167l17.246,97.188l-58.159,81.631c-2.247,3.15-3.577,6.865-3.845,10.729 l-9.094,131.514c-0.799,11.561,7.928,21.582,19.488,22.387c0.492,0.033,0.98,0.047,1.468,0.047 c10.931,0,20.148-8.467,20.918-19.541l8.688-125.607l53.125-74.555L468.066,501.83z" />
    </svg>
  ),
  cash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none h-full"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
      />
    </svg>
  ),
  bank: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none h-full"
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true">
      <path
        d="M3 19H21M12 12V19M18 12V19M6 12V19M12.4472 3.22361L20.59 7.29502C21.4395 7.71974 21.1372 9 20.1875 9H3.81246C2.86276 9 2.56053 7.71974 3.40997 7.29502L11.5528 3.22361C11.8343 3.08284 12.1657 3.08284 12.4472 3.22361Z"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  ),
  creditCard: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="pointer-events-none h-full"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
      />
    </svg>
  ),
  boxes: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      className="pointer-events-none w-full"
      fill="currentColor"
      aria-hidden="true">
      <path d="m 12.666667,7.666665 -1.666667,0 0,2 -0.666667,-0.44375 -0.6666663,0.44375 0,-2 -1.6666667,0 c -0.1833333,0 -0.3333333,0.15 -0.3333333,0.33334 l 0,4 c 0,0.18333 0.15,0.33333 0.3333333,0.33333 l 4.666667,0 C 12.85,12.333335 13,12.183335 13,12.000005 l 0,-4 c 0,-0.18334 -0.15,-0.33334 -0.333333,-0.33334 z m -8.0000003,-1.33333 4.6666666,0 c 0.1833334,0 0.3333334,-0.15 0.3333334,-0.33333 l 0,-4 c 0,-0.18334 -0.15,-0.33334 -0.3333334,-0.33334 l -1.6666666,0 0,2 L 7,3.222915 l -0.6666667,0.44375 0,-2 -1.6666666,0 c -0.1833334,0 -0.3333334,0.15 -0.3333334,0.33334 l 0,4 c 0,0.18333 0.15,0.33333 0.3333334,0.33333 z M 6,7.666665 l -1.6666667,0 0,2 L 3.6666667,9.222915 3,9.666665 l 0,-2 -1.6666667,0 C 1.15,7.666665 1,7.816665 1,8.000005 l 0,4 c 0,0.18333 0.15,0.33333 0.3333333,0.33333 l 4.6666667,0 c 0.1833333,0 0.3333333,-0.15 0.3333333,-0.33333 l 0,-4 c 0,-0.18334 -0.15,-0.33334 -0.3333333,-0.33334 z" />
    </svg>
  ),
};
