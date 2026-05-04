import clsx from 'clsx';
import {InputHTMLAttributes} from 'react'; 
type Props = InputHTMLAttributes<HTMLInputElement>;

export default function FormInput(props: Props) {
    const { className} = props;
  return (
    <input {...props} className={clsx("border border-slate-400 p-2 w-full rounded-md", className)}/>
  )
}
