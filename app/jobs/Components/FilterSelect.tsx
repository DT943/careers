import { CaretDownIcon } from "@phosphor-icons/react";
interface FilterSelectProps {
  value: any;
  onChange: any;
  options: any;
}
const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative w-full sm:w-62">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full appearance-none rounded-md border border-gray-100 bg-[#F5F5F4] py-2 pl-3 pr-8 text-sm text-gray-800 outline-none focus:border-primary-1 focus:bg-white focus:ring-1 focus:ring-primary-1"
      >
        {options.map((option: any) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <CaretDownIcon
        size={16}
        weight="bold"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>

    // <div className="relative w-full sm:w-62">
    //   <input
    //     type="text"
    //     value={value || ""}
    //     onChange={(e) => onChange(e.target.value)}
    //     className="w-full border-none text-sm outline-none bg-transparent placeholder-gray-400"
    //   />

    //   <ul className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-[2000] max-h-60 overflow-y-auto text-sm">
    //     {options.map((option) => (
    //       <li
    //         key={option}
    //         className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
    //       >
    //         {option}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default FilterSelect;
