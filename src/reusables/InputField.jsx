import { Form, Input } from "antd";

const InputField = ({
  name,
  label,
  type = "text",
  rules = [],
  placeholder = "",
}) => {
  return (
    <Form.Item
      name={name}
      label={<span className="font-body">{label}</span>}
      rules={rules}
    >
      <Input
        type={type}
        placeholder={placeholder}
        className="!bg-white !border-gray-300 !font-body !rounded-[2px] !px-4 !py-2 focus:!border-primary-600 focus:!shadow-none"
      />
    </Form.Item>
  );
};

export default InputField;
