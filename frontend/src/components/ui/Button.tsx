type ButtonVariant = 'success' | 'warning' | 'danger' | 'primary' | 'secondary';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-teal-700 hover:bg-teal-600',

    success: 'bg-emerald-600 hover:bg-emerald-500',

    warning: 'bg-amber-600 hover:bg-amber-500',

    danger: 'bg-red-600 hover:bg-red-500',

    secondary: 'bg-slate-700 hover:bg-slate-600 border border-slate-600',
  };

  return (
    <button
      className={`
        w-full
        rounded-xl
        px-4
        py-3
        font-semibold
        text-white
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
