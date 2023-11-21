"use client";

import useCountries from "@/hook/useCountries";
import Select from "react-select";
import Flag from "react-world-flags";

function CountrySelect({ value, onChange }) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3 bg-white">
            <Flag code={option.value} className="w-5" />
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1 bg-white">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#fff",
          },
        })}
      />
    </div>
  );
}

export default CountrySelect;
