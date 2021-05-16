import { Input } from "reactstrap";

const FieldTextInput = ({
  field,
  placeholder,
  label,
  type,
  required,
  id,
  options,
  ...props
}) => {
  return (
    <>
      <label className="form-control-label" htmlFor={id}>
        {label}
        {required ? <span className="text-danger">*</span> : ""}
      </label>
      <Input
        className="form-control-alternative"
        id={id}
        placeholder={placeholder || ""}
        type={type || "text"}
        {...props}
        {...field}
      >
        {options && options.length
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : null}
      </Input>
    </>
  );
};
export default FieldTextInput;
