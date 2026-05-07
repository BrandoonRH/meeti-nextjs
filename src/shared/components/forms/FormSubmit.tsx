import { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement>;

export default function FormSubmit(props: Props) {
  const { value, className } = props;
  return (
    <input
      type="submit"
      className={`bg-pink-600 hover:bg-pink-700 transition-all w-full  p-2 uppercase font-black text-white cursor-pointer ${className || ""}`}
      value={value}
    />
  );
}
