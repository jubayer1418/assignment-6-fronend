import { Option, Select } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

export function SelectDefault({
  label,
  disabled,
  name,
  control,
  data,
  defaultValue,
}: {
  label: string;
  disabled: boolean;
  name: string;
  control: any;
  data: any;
  defaultValue?: any;
}) {
  return (
    <Controller
      render={({ field }) => (
        <Select {...field} placeholder={""} label={label}>
          {data.map((item: string) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      )}
      control={control}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  );
}
export function SelectSearch({
  label,
  disabled,
  name,
  setBrand,
  data,
  brand,
}: {
  label: string;
  disabled: boolean;
  name: string;
  setBrand: any;
  data: any;
  brand: any;
}) {
  return (
    <Select
      placeholder={""}
      value={brand}
      onChange={(e) => setBrand(e)}
      disabled={disabled}
      name={name}
      label={label}
    >
      {data.map((item: string) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
}
