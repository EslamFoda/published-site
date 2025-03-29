interface QuoteIconProps extends React.SVGProps<SVGSVGElement> {
  height?: number;
  width?: number;
}
export const QuoteIcon = ({ height = 24, width = 24 }: QuoteIconProps) => {
  return (
    <svg
      height={height}
      width={width}
      data-v-54642f74=""
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-54642f74=""
        d="m18.187 18.893c2.6255 0 4.8133-2.1878 4.8133-4.8133 0-2.6254-2.1878-4.8132-4.8133-4.8132h-0.6563c0.2188-1.3127 0.4376-1.7503 2.2972-3.6099-2.7348 0.21878-7.548 3.5006-6.5635 8.7514 0.547 2.8442 2.2972 4.4851 4.9226 4.4851z"
        className="fill-primary"
      ></path>
      <path
        data-v-54642f74=""
        d="m1.1307 14.626c0.43757 2.6254 2.2972 4.2663 4.9226 4.2663s4.8133-2.1878 4.8133-4.8133c0-2.6254-2.1879-4.8132-4.8133-4.8132h-0.65635c0.21878-1.3127 0.43757-1.7503 2.2972-3.6099-2.7348 0.32818-7.5481 3.6099-6.5635 8.9702z"
        className="fill-primary"
      ></path>
    </svg>
  );
};
