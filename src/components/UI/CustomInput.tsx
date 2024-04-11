import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
const CustomInput = ({label, type, id, placeholder, validation, value}:any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const inputError = findInputError(errors, id)
  const isInvalid = isFormInvalid(inputError)
    return (
        <div className="mb-2 flex flex-col">
        <div className="flex justify-between">
          <label htmlFor={id} className="font-semibold capitalize">
            {label}
          </label>
          <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
        </div>
        <input
          id={id}
          type={type}
          defaultValue={value}
          className="w border rounded-sm p-2 border-slate-300 placeholder:opacity-60"
          placeholder={placeholder}
          {...register(id, validation)}
        />
      </div>
    )
    
}
export default CustomInput;
type InputErrorProps = {
  message: string;
};

import { MdError } from 'react-icons/md';
import { findInputError } from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormInvalid";

export const InputError = ({ message }: InputErrorProps) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}
const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
};