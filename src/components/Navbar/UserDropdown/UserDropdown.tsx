// ** React Imports
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import { Avatar } from "@src/components/common/avatar";

// ** Third Party Components
import { User, Lock, LogOut } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { RootState } from "@src/redux/store";
import { useSelector, useDispatch } from "react-redux";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/profileDef.png";
import { handleLogout } from "@src/redux/user";
import { useGetCurrentAuthenticatedUser } from "@src/core/services/api/auth/auth.api";
import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";

const UserDropdown: FC = (): JSX.Element => {
  // const userStore = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);

  const { profile }: any = useSelector((state: RootState) => state.profile);

  // console.log(profile);

  const getCurrentUser = useGetCurrentAuthenticatedUser();

  useEffect(() => {
    getCurrentUser.mutate(undefined, {
      onSuccess: (cognitoUser) => {
        // console.log(cognitoUser);
        setUser(cognitoUser && cognitoUser.attributes);
      },
    });
  }, []);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        {/* <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">John Doe</span>
          <span className="user-status">Admin</span>
        </div> */}
        <Avatar
          //@ts-ignore
          img={
            profile &&
            profile.profile_picture &&
            profile.profile_picture.length > 0
              ? profile.profile_picture[0]?.value
              : defaultAvatar
          }
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenuPortal>
        <div
          className="px-1 my-1 d-flex justify-content-start "
          style={{ width: 310 }}
        >
          <Avatar
            //@ts-ignore
            img={
              profile &&
              profile.profile_picture &&
              profile.profile_picture.length > 0
                ? profile.profile_picture[0].value
                : defaultAvatar
            }
            imgHeight="57"
            imgWidth="57"
            // status="online"
          />
          <div className="ms-1">
            <span
              className="d-block text-gray lh-base fs-5 fw-bold"
              style={{ marginTop: 5 }}
            >
              {user && user.name
                ? user.name + " " + user.family_name
                : "Not Set"}
            </span>
            <span
              className="d-block text-secondary lh-base fs-6"
              style={{ marginTop: 5 }}
            >
              {user && user.name ? user.email : "Not Set"}
            </span>
          </div>
        </div>
        <DropdownItem
          tag={Link}
          to="/profile/1"
          // onClick={(e) => e.preventDefault()}
        >
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem
          tag={Link}
          to="/profile/2"
          // onClick={(e) => e.preventDefault()}
        >
          <Lock size={14} className="me-75" />
          <span className="align-middle">Account</span>
        </DropdownItem>
        <DropdownItem divider />
        {/* <DropdownItem
          tag={Link}
          to="/pages/"
          onClick={(e) => e.preventDefault()}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem> */}
        <DropdownItem
          tag={Link}
          // to="/emailCheck"
          onClick={() => dispatch(handleLogout())}
        >
          <LogOut size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenuPortal>
    </UncontrolledDropdown>
  );
};

export { UserDropdown };
