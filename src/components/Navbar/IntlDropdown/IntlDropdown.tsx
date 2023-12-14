// ** Third Party Components

import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";
import { FC } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

const IntlDropdown: FC = (): JSX.Element => {
  // ** Hooks

  const { i18n } = useTranslation();

  // ** Vars
  const langObj: any = {
    en: "English",
    de: "German",
    fr: "French",
    pt: "Portuguese",
  };

  // ** Function to switch Language
  const handleLangUpdate = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    lang?: string
  ) => {
    e.preventDefault();
  };

  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item"
    >
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link"
        onClick={(e) => e.preventDefault()}
      >
        <ReactCountryFlag
          svg
          className="country-flag flag-icon"
          countryCode={i18n.language === "en" ? "us" : i18n.language}
        />
        <span className="selected-language">{langObj[i18n.language]}</span>
      </DropdownToggle>
      <DropdownMenuPortal className="mt-0">
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "en")}
        >
          <ReactCountryFlag className="country-flag" countryCode="us" svg />
          <span className="ms-1">English</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "fr")}
        >
          <ReactCountryFlag className="country-flag" countryCode="fr" svg />
          <span className="ms-1">French</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "de")}
        >
          <ReactCountryFlag className="country-flag" countryCode="de" svg />
          <span className="ms-1">German</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "pt")}
        >
          <ReactCountryFlag className="country-flag" countryCode="pt" svg />
          <span className="ms-1">Portuguese</span>
        </DropdownItem>
      </DropdownMenuPortal>
    </UncontrolledDropdown>
  );
};

export { IntlDropdown };
