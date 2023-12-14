// ** Dropdowns Imports
import { FC } from "react";
import { Bell, Mail } from "react-feather";
import { NavbarSearch } from "../NavbarSearch/NavbarSearch";
import { UserDropdown } from "../UserDropdown";

const NavbarUser: FC = (): JSX.Element => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto ">
      <NavbarSearch />

      {/* <Bell className=" me-1 mt-auto mb-auto cursor-pointer" color="white" /> */}
      <Mail
        className="me-1 ms-1 mt-auto mb-auto cursor-pointer"
        color="white"
      />
      <UserDropdown />
    </ul>
  );
};
export { NavbarUser };
