import { cn } from "@/lib/utils";

export const ImagePlaceHolder = ({
  fillColor,
  width = 50,
  height = 45,
}: {
  fillColor?: string;
  width?: number;
  height?: number;
}) => {
  const iconClassName = cn("", fillColor ? fillColor : "fill-background");
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={iconClassName}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 3H22V21H2V3ZM17.9724 9C17.9724 8.11765 17.2665 7.5 16.4724 7.5C15.6783 7.5 14.9724 8.20588 14.9724 9C14.9724 9.88235 15.6783 10.5 16.4724 10.5C17.3548 10.5 17.9724 9.79412 17.9724 9ZM10.2 10.5L6 16.5H18L15.6 13.5L13.8 15.3L10.2 10.5Z"
      />
    </svg>
  );
};

export const VideoPlaceHolder = ({
  fillColor,
  width = 60,
  height = 55,
}: {
  fillColor?: string;
  width?: number;
  height?: number;
}) => {
  const iconClassName = cn("", fillColor ? fillColor : "fill-background");
  return (
    <svg
      width={width}
      height={height}
      data-v-549a1164=""
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={iconClassName}
        data-v-549a1164=""
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M2 3H22V21H2V3ZM4 5H6V7H4V5ZM4 13H6V15H4V13ZM6 9H4V11H6V9ZM4 16.9995H6V18.9995H4V16.9995ZM20 5H18V7H20V5ZM18 13H20V15H18V13ZM20 9H18V11H20V9ZM18 16.9995H20V18.9995H18V16.9995ZM16 5H8V11H16V5ZM8 13H16V19H8V13Z"
      ></path>
    </svg>
  );
};

export const MenuIcon1 = ({ className }: { className?: string }) => {
  return (
    <svg
      data-v-90cc7c96=""
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 7h20v2h-20v-2zm0 7h20v2h-20v-2z"
        clipRule="evenodd"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const MenuIcon2 = ({ className }: { className?: string }) => {
  return (
    <svg
      data-v-90cc7c96=""
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 7h12v2h-12v-2zm0 7h20v2h-20v-2z"
        clipRule="evenodd"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const MenuIcon3 = ({ className }: { className?: string }) => {
  return (
    <svg
      width={16}
      height={16}
      data-v-90cc7c96=""
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 14h20v2h-20v-2z"
        clipRule="evenodd"
        fill="currentColor"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const MenuIcon4 = ({ className }: { className?: string }) => (
  <svg
    data-v-6f66631d=""
    className={className}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-6f66631d=""
      d="M10.75 13.25V22H13.25V13.25H22V10.75H13.25V2H10.75V10.75H2V13.25H10.75Z"
      fill="currentColor"
    ></path>
  </svg>
);
export const MenuIcon5 = ({ className }: { className?: string }) => (
  <svg
    data-v-6f66631d=""
    className={className}
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-6f66631d=""
      d="M4.60026 7.99996C4.60026 8.73634 4.00331 9.33329 3.26693 9.33329C2.53055 9.33329 1.93359 8.73634 1.93359 7.99996C1.93359 7.26358 2.53055 6.66663 3.26693 6.66663C4.00331 6.66663 4.60026 7.26358 4.60026 7.99996Z"
      fill="currentColor"
    ></path>
    <path
      data-v-6f66631d=""
      d="M9.93359 7.99996C9.93359 8.73634 9.33664 9.33329 8.60026 9.33329C7.86388 9.33329 7.26693 8.73634 7.26693 7.99996C7.26693 7.26358 7.86388 6.66663 8.60026 6.66663C9.33664 6.66663 9.93359 7.26358 9.93359 7.99996Z"
      fill="currentColor"
    ></path>
    <path
      data-v-6f66631d=""
      d="M13.9336 9.33329C14.67 9.33329 15.2669 8.73634 15.2669 7.99996C15.2669 7.26358 14.67 6.66663 13.9336 6.66663C13.1972 6.66663 12.6003 7.26358 12.6003 7.99996C12.6003 8.73634 13.1972 9.33329 13.9336 9.33329Z"
      fill="currentColor"
    ></path>
  </svg>
);
