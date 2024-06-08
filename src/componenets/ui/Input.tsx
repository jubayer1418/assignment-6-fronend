import { Input } from "@material-tailwind/react";

export function InputDefault({
  label,
  disabled,
  name,
  type,
  register,
  defaultValue,
}: {
  label: string;
  disabled: boolean;
  name: string;
  type: string;
  register: any;
  defaultValue?: any;
}) {
  return (
    <Input
      {...register(name)}
      type={type}
      id={name}
      placeholder=""
      crossOrigin={""}
      defaultValue={defaultValue}
      label={label}
      disabled={disabled}
    />
  );
}
