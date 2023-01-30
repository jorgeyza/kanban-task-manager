const LogoMobile = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" fill="none">
      <g fill="#635FC7" clipPath="url(#a)">
        <path d="M4 .5H2a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-21a2 2 0 0 0-2-2Z" />
        <path
          d="M13 .5h-2a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-21a2 2 0 0 0-2-2Z"
          opacity=".75"
        />
        <path
          d="M22 .5h-2a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-21a2 2 0 0 0-2-2Z"
          opacity=".5"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 .5h24v25H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LogoMobile;
