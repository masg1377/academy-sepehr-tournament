import { useEffect, useState } from "react";
import { DefaultRoute } from "../../configs/router";
import { getItemGeneric } from "../services/common/storage.service";

// import i18next from "i18next";
// import { initReactI18next } from "react-i18next";
import { getItem } from "../services/common/storage.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EFonts } from "../enum/fonts.enum";

export const getFontSize = (size: number = 5) => {
  return size === 1
    ? "fs-1"
    : size === 2
    ? "fs-2"
    : size === 3
    ? "fs-3"
    : size === 4
    ? "fs-4"
    : size === 5
    ? "fs-5"
    : size === 6
    ? "fs-6"
    : size === 7
    ? "fs-7"
    : size === 8
    ? "fs-8"
    : size === 9
    ? "fs-9"
    : size === 10
    ? "fs-10"
    : size === 11
    ? "fs-11"
    : size === 12
    ? "fs-12"
    : size === 13
    ? "fs-13"
    : size === 14
    ? "fs-14"
    : size === 15
    ? "fs-15"
    : size === 16
    ? "fs-16"
    : size === 18
    ? "fs-18"
    : size === 20
    ? "fs-20"
    : size === 22
    ? "fs-22"
    : "fs-22";
};

export const getFontFamily = (font?: EFonts) => {
  return font === EFonts.MontserratBold
    ? "font-montserrat-bold"
    : font === EFonts.MontserratLight
    ? "font-montserrat-light"
    : font === EFonts.MontserratMedium
    ? "font-montserrat-medium"
    : font === EFonts.MontserratRegular
    ? "font-montserrat-regular"
    : font === EFonts.MontserratSemiBold
    ? "font-montserrat-semiBold"
    : font === EFonts.OpenSansRegular
    ? "font-opensans-regular"
    : font === EFonts.OpenSansSemibold
    ? "font-opensans-semibold"
    : font === EFonts.PoppinsMedium
    ? "font-poppin-medium"
    : font === EFonts.PoppinsRegular
    ? "font-poppin-regular"
    : font === EFonts.PoppinsSemibold
    ? "font-poppin-regular"
    : font === EFonts.PoppinsBold
    ? "font-poppin-bold"
    : font === EFonts.RobotoMedium
    ? "font-roboto-medium"
    : "font-montserrat-regular";
};

export const useOutsideSelector = (ref: any, onHandle: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onHandle();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const generateUID = () => {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart: string | number = (Math.random() * 46656) | 0;
  let secondPart: string | number = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const canRole = (roles: string[], userRoles: any) => {
  return roles && userRoles ? roles.some((role: any) => userRoles[role]) : true;
};

export const urlToObject = async (image: string) => {
  const response = await fetch(image);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: blob.type });
  return file;
};

const isSameUser = (a: any, b: any) => a.value === b.value;

// Get items that only occur in the left array,
// using the compareFunction to determine equality.
const onlyInLeft = (left: any, right: any, compareFunction: any) =>
  left.filter(
    (leftValue: any) =>
      !right.some((rightValue: any) => compareFunction(leftValue, rightValue))
  );

export const compareTwoArray = (arr1: any, arr2: any) => {
  const onlyInA = onlyInLeft(arr1 ? arr1 : [], arr2 ? arr2 : [], isSameUser);
  const onlyInB = onlyInLeft(arr2 ? arr2 : [], arr1 ? arr1 : [], isSameUser);

  return [...onlyInA, ...onlyInB];
};

const MySwal = withReactContent(Swal);

export const showSuccessAlert = (
  title: string,
  text: string,
  callBack?: (val: any) => void,
  buttonText?: string,
  showCancelButton?: boolean,
  showLoaderOnConfirm?: boolean,
  preConfirm?: (obj: any) => void
) => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: "success",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1",
    },
    confirmButtonText: buttonText,
    buttonsStyling: false,
    showCancelButton: showCancelButton,
    showLoaderOnConfirm: showLoaderOnConfirm,
    preConfirm: preConfirm,
    showCloseButton: true,
  }).then(callBack);
};

export const showInfoAlert = (
  title: string,
  text: string,
  callBack?: (val: any) => void,
  buttonText?: string,
  showCancelButton?: boolean,
  showLoaderOnConfirm?: boolean,
  preConfirm?: (obj: any) => void
) => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: "info",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1",
    },
    confirmButtonText: buttonText,
    buttonsStyling: false,
    showCancelButton: showCancelButton,
    showLoaderOnConfirm: showLoaderOnConfirm,
    preConfirm: preConfirm,
    showCloseButton: true,
  }).then(callBack);
};

export const showWarningInfo = (
  title: string,
  text: string,
  callBack?: (val: any) => void,
  buttonText?: string,
  showCancelButton?: boolean,
  showLoaderOnConfirm?: boolean,
  preConfirm?: (obj: any) => void
) => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: "warning",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1",
    },
    confirmButtonText: buttonText,
    buttonsStyling: false,
    showCancelButton: showCancelButton,
    showLoaderOnConfirm: showLoaderOnConfirm,
    preConfirm: preConfirm,
    showCloseButton: true,
  }).then(callBack);
};

export const showErrorAlert = (
  title: string,
  text: string,
  callBack?: (val: any) => void,
  buttonText?: string,
  showCancelButton?: boolean,
  showLoaderOnConfirm?: boolean,
  preConfirm?: (obj: any) => void
) => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: "error",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1",
    },
    confirmButtonText: buttonText,
    buttonsStyling: false,
    showCancelButton: showCancelButton,
    showLoaderOnConfirm: showLoaderOnConfirm,
    preConfirm: preConfirm,
    showCloseButton: true,
  }).then(callBack);
};

export const showQuestionAlert = (
  title: string,
  text: string,
  callBack?: (val: any) => void,
  buttonText?: string,
  showCancelButton?: boolean,
  showLoaderOnConfirm?: boolean,
  preConfirm?: (obj: any) => void
) => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: "question",
    customClass: {
      confirmButton: "btn btn-danger flex-1",
      cancelButton: "btn btn-primary ms-1 flex-1",
      actions: "w-47 mt-1",
      htmlContainer: "mb-1",
      icon: "mt-1",
    },
    confirmButtonText: buttonText,
    buttonsStyling: false,
    showCancelButton: showCancelButton,
    showLoaderOnConfirm: showLoaderOnConfirm,
    preConfirm: preConfirm,
    showCloseButton: true,
  }).then(callBack);
};

export const formatBytes = (
  bytes: number,
  decimals = 2
): { size: number; format: string } => {
  if (bytes === 0) return { size: 0, format: "Bytes" };

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return { size: size, format: sizes[i] };
};

export const IsSameUrl = (url1: string, url2: string): boolean => {
  return (
    url1.toLowerCase() === url2.toLowerCase() ||
    url1.toLowerCase() === url2.toLowerCase() + "/" ||
    url1.toLowerCase() + "/" === url2.toLowerCase()
  );
};

export const CheckIsValidNumericParam = (paramName: string, params: any) => {
  return params[paramName] && !isNaN(params[paramName]);
};

export const IsIncludes = (url1: string, url2: string): boolean => {
  return (
    url1.toLowerCase().includes(url2.toLowerCase()) ||
    url1.toLowerCase().includes(url2.toLowerCase() + "/") ||
    (url1.toLowerCase() + "/").includes(url2.toLowerCase())
  );
};

export const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

// export const loadTranslations = () => {
//   i18next
//     .use(initReactI18next) // passes i18n down to react-i18next
//     .init({
//       // the translations
//       // (tip move them in a JSON file and import them,
//       // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
//       resources: {
//         en: {
//           translation: {
//             monthly_subscription_title: "Monthly Subscription",
//             discount_msg:
//               "Prices do not include sales tax / VAT. The tax will be calculated automatically based on your local tax rates, during the checkout process.",

//           },
//         },
//       },
//       lng: "en", // if you're using a language detector, do not define the lng option
//       fallbackLng: "en",

//       interpolation: {
//         escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
//       },
//     });
// };

export const makeKeyword = (string: string): string => {
  return string.replace(/\s+/g, "_").toLowerCase();
};

export const getListOfMonthNames = (): string[] => [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const createInitialValues = (template: any): object => {
  // const { category_name, post_name, field_required } = template;
  let initialValues: any = {};
  template.forEach((value: any) => {
    const { category_name, post_name, field_required } = value;
    if (field_required) {
      if (category_name && post_name) {
        const subPostName = post_name.split(".");
        if (subPostName.length > 1) {
          initialValues[category_name] = initialValues[category_name]
            ? initialValues[category_name]
            : {};
          initialValues[category_name][subPostName[0]] = initialValues[
            category_name
          ][subPostName[0]]
            ? initialValues[category_name][subPostName[0]]
            : {};
          initialValues[category_name][subPostName[0]][subPostName[1]] = null;
        } else {
          initialValues[category_name] = initialValues[category_name]
            ? initialValues[category_name]
            : {};
          initialValues[category_name][post_name] = null;
        }
      } else initialValues[post_name] = null;
    }
  });
  return initialValues;
};

let languageKeywords: any = null;
export const __ = (keyword: string, defaultValue: any) => {
  if (languageKeywords === null) {
    const keywords: string | boolean = getItem("languageKeywords");
    if (keywords) {
      languageKeywords = JSON.parse(
        typeof keywords === "string" ? keywords : ""
      );
    } else {
      languageKeywords = [];
    }
  }

  if (typeof languageKeywords[keyword] === "string") {
    return languageKeywords[keyword];
  }

  return defaultValue;
};

/**
 * Check if page scrooled to elementbottom
 *
 * @param {el} element
 * @return true or false
 * @public
 */
export const isScrollBottom = (): boolean => {
  const scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;
  const scrollHeight =
    (document.documentElement && document.documentElement.scrollHeight) ||
    document.body.scrollHeight;
  const clientHeight =
    document.documentElement.clientHeight || window.innerHeight;
  const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

  return scrolledToBottom;
};

/**
 * Calculate input data from it's event
 *
 * @param {object} event - the event will be available when a function call on the onChange event of inuts
 * @return name and value of input
 * @public
 */
export const getInputNameAndValue = (event: any): { name: any; value: any } => {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  const name = target.name;

  return { name, value };
};

export const random14no4 = (): string => {
  let randomStr: string = Date.now().toString();
  const one2nine = [0, 1, 2, 3, 5, 6, 7, 8, 9][Math.floor(Math.random() * 9)], // Except 4
    one2nine4replace = [0, 1, 2, 3, 5, 6, 7, 8, 9][
      Math.floor(Math.random() * 9)
    ], // Except 4
    randomPosition = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][
      Math.floor(Math.random() * 12)
    ];
  randomStr =
    randomStr.slice(0, randomPosition) +
    one2nine +
    randomStr.slice(randomPosition);
  return randomStr.replace(/4/g, one2nine4replace.toString());
};

export const objIsEqual = (a: any, b: any): boolean => {
  if (!a || !b) {
    return false;
  }
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
};

export const numberFormatter = (num: number, digits: number = 1): string => {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};

export const sequentialNumber = (num: number): string => {
  if (num % 10 === 1) {
    return `${num}st`;
  } else if (num % 10 === 2) {
    return `${num}nd`;
  } else if (num % 10 === 3) {
    return `${num}rd`;
  }
  return `${num}th`;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj: object): boolean =>
  Object.keys(obj).length === 0;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

// ** Returns K format from a number
export const kFormatter = (num: number): number | string =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html: any) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value: string,
  formatting: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (
  value: string,
  toTimeForCurrentDay: boolean = true
) => {
  const date = new Date(value);
  let formatting: any = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => getItemGeneric("userData");
export const getUserData = () => {
  const user: any = getItemGeneric("userData")
    ? getItemGeneric("userData")
    : "{}";
  return JSON.parse(user);
};

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole: string): string => {
  if (userRole === "admin") return DefaultRoute;
  if (userRole === "client") return "/access-control";
  return "/login";
};

// ** React Select Theme Colors
export const selectThemeColors = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});
