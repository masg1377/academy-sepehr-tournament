import { FC, useState } from "react";
import { RippleButton } from "@src/components/common/ripple-button";
import { InputText } from "../../common/InputText";
import { v4 as uuidv4 } from "uuid";
import { useFormikContext } from "formik";
import { generateUID } from "@src/core/utils/Utils";

interface IUuidFieldProp {
  name: string;
  placeholder: string;
  size?: number;
  value?: string;
  label?: string;
}

const UuidField: FC<IUuidFieldProp> = ({
  name,
  placeholder,
  size,
  value,
  label,
}): JSX.Element => {
  const [colied, setColied] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext();

  const onGenerateCode = () => {
    const code = generateUID();
    navigator.clipboard.writeText(code);
    setFieldValue(name, code);
    setColied(true);
    setTimeout(() => {
      setColied(false);
    }, 1500);
  };

  return (
    <InputText
      name={name}
      placeholder={placeholder}
      size={size}
      id={name}
      value={value}
      label={label}
      onChange={() => {}}
      customGroupButton={
        <RippleButton type="button" color="primary" onClick={onGenerateCode}>
          {colied ? "Copied!" : "Generate"}
        </RippleButton>
      }
    />
  );
};

export { UuidField };
