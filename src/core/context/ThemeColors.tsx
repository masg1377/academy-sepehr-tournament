// ** React Imports
import { useEffect, useState, createContext, FC } from "react";

// ** Create Context
const ThemeColors = createContext<any>(undefined);

const ThemeContext: FC<any> = ({ children }): JSX.Element => {
  // ** State
  const [colors, setColors] = useState({});

  //** ComponentDidMount
  useEffect(() => {
    //@ts-ignore
    if (window !== "undefined") {
      //** Get variable value
      const getHex = (color: string) =>
        window.getComputedStyle(document.body).getPropertyValue(color).trim();

      //** Colors obj
      const obj = {
        primary: {
          light: getHex("--bs-primary").concat("1a"),
          main: getHex("--bs-primary"),
        },
        secondary: {
          light: getHex("--bs-secondary").concat("1a"),
          main: getHex("--bs-secondary"),
        },
        success: {
          light: getHex("--bs-success").concat("1a"),
          main: getHex("--bs-success"),
        },
        danger: {
          light: getHex("--bs-danger").concat("1a"),
          main: getHex("--bs-danger"),
        },
        warning: {
          light: getHex("--bs-warning").concat("1a"),
          main: getHex("--bs-warning"),
        },
        info: {
          light: getHex("--bs-info").concat("1a"),
          main: getHex("--bs-info"),
        },
        dark: {
          light: getHex("--bs-dark").concat("1a"),
          main: getHex("--bs-dark"),
        },
      };

      setColors({ ...obj });
    }
  }, []);

  return (
    <ThemeColors.Provider value={{ colors }}>{children}</ThemeColors.Provider>
  );
};

export { ThemeColors, ThemeContext };
