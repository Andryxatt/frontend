import { Controller, useFormContext } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { InputError } from "./CustomInput";
import Select from "react-select";
export const CustomSelect = ({ label, id, placeholder, options, isLoading, control, isMulti = false, onChangeValue, refSelect }: any) => {
  const {
    formState: { errors },
  } = useFormContext()
  const inputError = errors[id]; // Use the label as the field name
  const isInvalid = !!inputError;

  return (
    <div className="mb-2 flex flex-col relative w-full">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError?.message as string}
              key={inputError?.message as string}
            />
          )}
        </AnimatePresence>
      </div>
      <Controller
        name={id}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Заповніть поле!',
          }
        }}

        render={({ field }) => (
          <Select
            {...field}
            isMulti={isMulti}
            ref={refSelect}
            className="h-full font-medium placeholder:opacity-60"
            placeholder={placeholder}
            isLoading={isLoading}
            options={options?.map((value: any) => ({
              label: value.label,
              value: value.value,
            }))}
            value={field.value} // Set the value from the field
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              onChangeValue?.(selectedOption)
            }}
          />
        )}
      />

    </div>
  )

}
