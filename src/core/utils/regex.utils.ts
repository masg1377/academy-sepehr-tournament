export const urlPattern =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;

export const commaSeparator = (num: number): string => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const isEmail = (email: string): boolean => {
  // eslint-disable-next-line
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
};

export const isMobile = (mobile: string | number): boolean => {
  mobile = mobileE164(mobile); // Make Compatible with All Mobile Formats
  // eslint-disable-next-line
  const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return reg.test(String(mobile).toLowerCase());
};

export const mobileE164 = (mobile: string | number): string => {
  return mobile ? "+" + mobile.toString().replace(/\D/g, "") : "";
};

type TCheckPass = {
  status: boolean | RegExpMatchArray | null;
  message: string;
};

export const checkPasswordValidity = (password: string): TCheckPass => {
  let isValid: boolean | RegExpMatchArray | null = false;
  isValid = password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  return {
    status: isValid,
    message: isValid
      ? ""
      : "Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
  };
};

export const validPasswordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()])[A-Za-z\d@$!%*?&#^()]{8,}$/
);
