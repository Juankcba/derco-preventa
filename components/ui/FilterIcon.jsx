export const FilelterIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 17}
      height={size || height || 16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.387 11.0619H3.18652"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.26074 4.60028H13.4612"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.31785 4.56417C6.31785 3.7004 5.61241 3 4.74242 3C3.87243 3 3.16699 3.7004 3.16699 4.56417C3.16699 5.42794 3.87243 6.12834 4.74242 6.12834C5.61241 6.12834 6.31785 5.42794 6.31785 4.56417Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.8335 11.0358C13.8335 10.1721 13.1286 9.47168 12.2586 9.47168C11.3881 9.47168 10.6826 10.1721 10.6826 11.0358C10.6826 11.8996 11.3881 12.6 12.2586 12.6C13.1286 12.6 13.8335 11.8996 13.8335 11.0358Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
