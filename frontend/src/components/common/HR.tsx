type Props = {
  children: React.ReactNode;
};

export default function HR({ children }: Props) {
  return (
    <div className="inline-flex items-center justify-center w-full">
      <hr className="w-64 h-1 my-8 bg-neutral-300 border-0 rounded-sm" />
      <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
        {children}
      </div>
    </div>
  );
}
