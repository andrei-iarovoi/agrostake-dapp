type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        w-full
        rounded-xl
        bg-green-600
        px-4
        py-3
        font-semibold
        text-white
        transition
        hover:bg-green-500
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
