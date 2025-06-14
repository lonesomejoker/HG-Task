const CustomButton = ({
  bg_color,
  tracking,
  onClick,
  type = "button",
  gap,
  children,
  width,
  invert_icon = false,
  icon,
  variant = "solid",
}) => {
  const variantStyles =
    variant === "outlined"
      ? `bg-transparent py-[9px] md:py-[11px] border-2 border-neutral-700 text-neutral-700 hover:border-primary `
      : `text-white py-[10px] md:py-[12px]  ${bg_color || "bg-primary "}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-[12px] ${width}  sm:text-[14px] transition-all md:text-[14px] font-[500] font-body ${
        invert_icon === true ? "flex-row-reverse" : "flex-row"
      } ${
        tracking || "tracking-[1.2px]"
      } flex items-center justify-center transition duration-300 ${
        gap || "gap-1.5"
      } hover:brightness-95 ease-in rounded-lg font-[500] px-3 md:px-6  ${variantStyles}`}
    >
      {children}
      {icon && <span className="text-[1.2rem]">{icon}</span>}
    </button>
  );
};

export default CustomButton;
