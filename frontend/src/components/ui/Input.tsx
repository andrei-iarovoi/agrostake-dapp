type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        px-4
        py-3
        text-white
        outline-none
        transition
        focus:border-green-500
      "
    />
  );
}
