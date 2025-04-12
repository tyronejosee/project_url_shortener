type Props = {
  size: string;
};

export default function Logo({ size }: Props) {
  return (
    <svg
      className={`${size}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#8A2BE2"
        stroke="#8A2BE2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 14 14 3v7h6L10 21v-7H4z"
      />
    </svg>
  );
}
