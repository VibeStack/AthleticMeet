export default function SelectField({
  label,
  id,
  options = [],
  register,
  rules,
  errors,
  disabled = false,
  ...rest // collect extra props like onChange, onClick
}) {
  return (
    <div className="mb-6 relative">
      <label
        htmlFor={id}
        className={`text-gray-700 text-[16px] font-bold mb-1 ml-1}`}
      >
        {label}
      </label>

      <select
        id={id}
        disabled={disabled}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          disabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 focus:ring-blue-500"
        } py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[14px] text-[14px] placeholder:text-gray-600 transition duration-200 `}
        {...register(id, rules)}
        {...rest}
      >
        {options.length == 1 ? (
          <option value={options[0]}>{options[0]}</option>
        ) : (
          <>
            <option value="" hidden>
              Select {label}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </>
        )}
      </select>

      {errors?.message && !disabled && (
        <p className="text-red-600 text-[10px] md:text-[12px] absolute -bottom-5 pl-1">
          {errors.message}
        </p>
      )}
    </div>
  );
}
