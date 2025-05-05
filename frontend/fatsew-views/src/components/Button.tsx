import { icons } from "../utils/icons";

type ButtonProps = {
  type: "button";
  title?: string;
  icon?: any;
  variant?: string;
  onClick?: () => void;
};

const Button = ({ type, title, icon, variant, onClick }: ButtonProps) => {
  return (
    <button
      className={`w-full flex items-center justify-center gap-2 rounded-3xl  py-3 px-6 ${variant} group`}
      type={type}
      onClick={onClick}
    >
      <span
        className={`font-semibold group text-sm text-white cursor-pointer capitalize`}
      >
        {title}
      </span>
      {icon && (
        <span className="text-2xl text-white">
          <img src={icons[icon]} className="w-4 h-4" alt="icon" />
        </span>
      )}
    </button>
  );
};

export default Button;
