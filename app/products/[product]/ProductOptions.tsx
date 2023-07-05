import React, { FC } from "react";

type selectedOptions = {
  id: string;
  title: string;
  handle: string | undefined;
  options: any;
  variantTitle: string;
  variantPrice: string;
  variantQty: number;
};

type Props = {
  name: string;
  values: string[];
  setOptions: (name: string, value: any) => void;

  selectedOptions: selectedOptions;
};

const ProductOptions: FC<Props> = ({
  name,
  selectedOptions,
  values,
  setOptions,
}) => {
  return (
    <fieldset>
      <legend className="text-xl font-semibold">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {values.map((value) => {
          const id = `option-${name}-${value}`;
          //   @ts-ignore
          const checked = selectedOptions[name] === value;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option-${name}`}
                checked={checked}
                onChange={() => {
                  setOptions(name, value);
                }}
              />
              <div>
                <div
                  className={`p-2 my-3 text-lg rounded-full block cursor-pointer mr-3 ${
                    checked
                      ? "text-white bg-gray-900 "
                      : "text-gray-900 bg-gray-200"
                  }`}
                >
                  <span className="px-2">{value}</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ProductOptions;
