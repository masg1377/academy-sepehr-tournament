import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { RippleButton } from "@src/components/common/ripple-button";
import {
  useGetGroupMembers,
  useRemoveMemberFromGroup,
} from "@src/core/services/api/group/group.api";
import React, { FC, Fragment, useEffect, useState } from "react";
import { Edit3, MoreVertical, Plus } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import UserProf from "@assets/images/pages/group/userProf.png";
import { DropdownItem, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";
import { MemberChangeRole } from "../MemberChangeRole";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { GroupMemberInviteModal } from "../GroupMemberInviteModal";

export type TUser = {
  first_name: string;
  group_id: number;
  id: number;
  last_name: string;
  role: string;
  team_tag: string | null;
  username: string;
  avatar_url: string;
  member_type: string;
};

const GroupMembers: FC = (): JSX.Element => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [users, setUsers] = useState<TUser[]>([]);
  const [changeRoleModal, setChangeRoleModal] = useState<boolean>(false);
  const [addMemberModal, setAddMemberModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [refresh, setRefresh] = useState<boolean>(false);

  const getMembers = useGetGroupMembers();
  // const remove = useRemoveMemberFromGroup();

  // const onRemove = (whiteListId: number) => {
  //   showQuestionAlert(
  //     "Are you sure?",
  //     "Remove the member?",
  //     (val) => {},
  //     "Yes",
  //     true,
  //     true,
  //     async (val) => {
  //       try {
  //         const result: any = await remove.mutateAsync({
  //           whitelist_id: id ? +id : 0,
  //           group_id: whiteListId,
  //         });
  //         if (result.data.is_success || result.data.success) {
  //           showSuccessAlert(
  //             "Success!",
  //             "Member removed!",
  //             () => {
  //               // dispatch(handleRefresh("btt"));
  //               setRefresh((old) => !old);
  //             },
  //             "Ok"
  //           );
  //           return result.data.is_success || result.data.success;
  //         } else {
  //           showErrorAlert("Error!", "Something went wrong!", undefined, "Ok");
  //         }
  //       } catch (error) {
  //         showErrorAlert("Error!", "Something went wrong!", undefined, "Ok");
  //       }
  //     }
  //   );
  // };

  useEffect(() => {
    if (id) {
      getMembers.mutate(
        { group_id: +id, limit: 1000, skip: 0 },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data.result?.result_members;
              // console.log(result);
              if (result?.length) setUsers(result);
              else setUsers([]);
            }
          },
          onError: () => {
            setUsers([]);
          },
        }
      );
    }
  }, [id, refresh]);

  const headerChild = (): JSX.Element => (
    <div className="d-flex align-items-center">
      <RippleButton
        className="d-flex justify-content-center"
        color="light"
        size="sm"
        onClick={() => setAddMemberModal(true)}
      >
        <Plus size={20} color="#92969a" />
      </RippleButton>
    </div>
  );

  const userItem = (user: TUser) => (
    <div className="d-flex justify-content-between mt-1 align-items-center">
      <div className="flex-1 d-flex gap-1">
        <img
          src={user?.avatar_url || UserProf}
          alt="user image"
          style={{ width: 71, height: 71 }}
        />

        <div className="d-flex flex-column justify-content-around">
          <span className="d-block fs-4 text-darker">
            {user?.first_name
              ? user?.first_name + " " + user?.last_name
              : "Not Set"}
          </span>
          <span className="d-block fs-7 text-darker fw-light">
            {user.member_type || "Not Set"}
            {/* Real Estate Agent */}
          </span>
        </div>
      </div>

      <div className="d-flex gap-1 align-items-center">
        <span className="fs-7 fw-bold" style={{ color: "#006bff" }}>
          {user?.role}
        </span>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={20} />
          </DropdownToggle>
          <DropdownMenuPortal>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                navigate("/users/detail/" + user.id);
              }}
            >
              <span className="align-middle ">Profile</span>
            </DropdownItem>

            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                //onRemove();
                setSelectedUser(user);
                setChangeRoleModal(true);
              }}
            >
              <span className="align-middle ">Role change</span>
            </DropdownItem>
            {/* <DropdownItem
              tag="a"
              href="/invite-member"
              className="w-100 text-danger"
              // onClick={(e) => {
              // }}
              onClick={(e) => {
                e.preventDefault();
                onRemove(user.id);
              }}
            >
              <span className="align-middle ">Delete</span>
            </DropdownItem> */}
          </DropdownMenuPortal>
        </UncontrolledDropdown>
      </div>
    </div>
  );

  return (
    <CardWrapper title="Members" headerChild={headerChild()} borderBottom>
      {changeRoleModal && (
        <MemberChangeRole
          isOpen={changeRoleModal}
          onToggle={(refresh?: boolean) => {
            setChangeRoleModal(false);
            setSelectedUser(undefined);
            if (refresh) setRefresh((old) => !old);
          }}
          user={selectedUser}
        />
      )}

      {addMemberModal && (
        <GroupMemberInviteModal
          isOpen={addMemberModal}
          onToggle={() => setAddMemberModal(false)}
        />
      )}

      {getMembers.isLoading ? (
        <LoadingData />
      ) : users.length ? (
        users?.map((user, index) => (
          <Fragment key={index}>{userItem(user)}</Fragment>
        ))
      ) : (
        <span className="d-block bg-light-purple py-1 px-6 fs-3 fw-bold text-purple-lighter text-center my-2 rounded-2">
          There is no information Please add
        </span>
      )}
    </CardWrapper>
  );
};

export { GroupMembers };
