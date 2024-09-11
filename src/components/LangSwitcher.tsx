import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../features/languageSlice";
import { RootState } from "../store/store";
import { getCookie, setCookie } from 'cookies-next';

const LangSwitcher: React.FC = () => {
  interface Option {
    country: string;
    code: string;
  }

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.language);

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);

  const options: Option[] = [
    { country: "English", code: "en" },
    { country: "Turkish", code: "tr" }
  ];

  const getCountryName = (code: string) => {
    const selectedOption = options.find(option => option.code === code);
    return selectedOption ? selectedOption.code : "Select Language";
  };

  useEffect(() => {
    const cookieLanguage = getCookie('NEXT_LOCALE');
    if (cookieLanguage && typeof cookieLanguage === 'string') {
      dispatch(setLanguage(cookieLanguage));
    }
  }, [dispatch]);

  const setOption = (option: Option) => {
    setCookie('NEXT_LOCALE', option.code, { maxAge: 30 * 24 * 60 * 60 });
    setIsOptionsExpanded(false);
    dispatch(setLanguage(option.code));
    
    const newPath = pathname.replace(`/${currentLanguage}`, `/${option.code}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative text-lg sm:text-sm">
        <button
          className="justify-between w-full border border-gray-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          {getCountryName(currentLanguage)}
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-2 w-2 transform transition-transform duration-200 ease-in-out ${
              isOptionsExpanded ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={`absolute mt-2 w-48 bg-white divide-y divide-gray-200 rounded-lg shadow-lg transition-transform duration-500 ease-custom ${
            !isOptionsExpanded ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
          }`}
        >
          <ul className="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 flex items-center cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOption(option);
                }}
              >
                &nbsp;&nbsp;{option.country}
                {currentLanguage === option.code && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7 text-green-500 ml-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LangSwitcher
