import { AxiosResponse } from "axios";
import {
  TAddEditDocumentGroup,
  TAddEditLinkGroup,
  TApproveInviteMemberGroup,
  TChangeRoleGroupMember,
  TCreateGroup,
  TEditGroupBasicInfo,
  TEditGroupBttList,
  TEditGroupExpertiseActivity,
  TEditGroupType,
  TGetGroupJoinList,
  TGetGroupList,
  TGetGroupListBtt,
  TGetGroupListBttAssigned,
  TGetGroupMembers,
  TInviteMemberList,
} from "./type";
import { IAxiosResult } from "@src/core/model/axios-result.model";
import { useMutation } from "react-query";
import Http from "../../interceptors/http.interceptor";

const getListOfGroups = (
  obj: TGetGroupList
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/group/manage/list", { params: obj });

const getListOfGroupJoinRequest = (
  obj: TGetGroupJoinList
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/group/join-approvement/join_list", { params: obj });

const getListOfGroupsBtts = (
  obj: TGetGroupListBtt
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/group/btt/btt_list", { params: obj });

const getListOfGroupsBttsAssigned = (
  obj: TGetGroupListBttAssigned
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/group/btt/group_btt_list", { params: obj });

const checkGroupUsername = (
  username: string
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get(
    "/group/manage/unique_field?mention_name=" + username + "&contact_email="
  );

const checkGroupEmail = (
  email: string
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get(
    "/group/manage/unique_field?contact_email=" + email + "&mention_name="
  );

const getGroupItem = (obj: {
  group_id: number;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/group/manage/item", { params: obj });

const getGroupMembers = (
  obj: TGetGroupMembers
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/group/member/list", { params: obj });

const getGroupWhitelistMembers = (
  obj: TGetGroupMembers
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/group/whitelist/list", { params: obj });

const createGroup = (
  obj: TCreateGroup
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/group/manage/create", obj);

const approveGroupInviteMember = (obj: {
  group_id: number;
  body: TApproveInviteMemberGroup;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post(
    "/group/join-approvement/join_approvement?group_id=" + obj.group_id,
    obj.body
  );

// const editGroup = (
//   obj: TEditGroup
// ): Promise<AxiosResponse<IAxiosResult<any>>> =>
//   Http.patch(`group/manage/group_type/?group_id=${obj.group_id}`, obj);

const editGroupBasicInfo = (obj: {
  group_id: number;
  body: TEditGroupBasicInfo;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.patch(`/group/manage/basic_info/?group_id=${obj.group_id}`, obj.body);

const modifyGroupMemberRole = (obj: {
  group_id: number;
  body: TChangeRoleGroupMember;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.patch(`/group/member/role/?group_id=${obj.group_id}`, obj.body);

const groupInviteMemberList = (obj: {
  group_id: number;
  body: TInviteMemberList;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post(`/group/whitelist/list/?group_id=${obj.group_id}`, obj.body);

const editGroupType = (obj: {
  group_id: number;
  body: TEditGroupType;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.patch(`/group/manage/group_type/?group_id=${obj.group_id}`, obj.body);

const editGroupExpertiseAreaActivity = (obj: {
  group_id: number;
  body: TEditGroupExpertiseActivity;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.patch(
    `/group/manage/expertise_area_activity/?group_id=${obj.group_id}`,
    obj.body
  );

const editGroupBttList = (obj: {
  group_id: number;
  body: TEditGroupBttList;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post(`/group/btt/manage_btt?group_id=${obj.group_id}`, obj.body);

const addEditLinkToGroup = (obj: {
  group_id: number;
  body: TAddEditLinkGroup | { title: string };
  isEdit?: boolean;
  isRemove?: boolean;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.patch(
    `/group/manage/${
      obj.isRemove ? "remove_link" : obj.isEdit ? "modify_link" : "add_link"
    }/?group_id=${obj.group_id}`,
    obj.body
  );

const addEditDocumentToGroup = (obj: {
  group_id: number;
  body: TAddEditDocumentGroup;
  isEdit?: boolean;
  isRemove?: boolean;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.patch(
    `/group/manage/${
      obj.isRemove
        ? "remove_document"
        : obj.isEdit
        ? "modify_document"
        : "add_document"
    }/?group_id=${obj.group_id}`,
    obj.body
  );

const removeMemberFromGroup = (obj: {
  group_id: number;
  whitelist_id: number;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/group/whitelist/remove", { params: obj });

export const useGetGroupWhitelistMembers = () =>
  useMutation(getGroupWhitelistMembers);

export const useRemoveMemberFromGroup = () =>
  useMutation(removeMemberFromGroup);

export const useAddEditDocumentToGroup = () =>
  useMutation(addEditDocumentToGroup);

export const useAddEditLinkToGroup = () => useMutation(addEditLinkToGroup);

export const useGetListOfGroups = () => useMutation(getListOfGroups);

export const useGetGroupItem = () => useMutation(getGroupItem);

export const useGetGroupMembers = () => useMutation(getGroupMembers);

export const useCreateGroup = () => useMutation(createGroup);

// export const useEditGroup = () => useMutation(editGroup);

export const usEeditGroupBasicInfo = () => useMutation(editGroupBasicInfo);

export const useCheckGroupUsername = () => useMutation(checkGroupUsername);
export const useCheckGroupEmail = () => useMutation(checkGroupEmail);

export const useEditGroupType = () => useMutation(editGroupType);

export const useEditGroupExpertiseAreaActivity = () =>
  useMutation(editGroupExpertiseAreaActivity);

export const useGetListOfGroupsBtts = () => useMutation(getListOfGroupsBtts);

export const useEditGroupBttList = () => useMutation(editGroupBttList);

export const useGetListOfGroupsBttsAssigned = () =>
  useMutation(getListOfGroupsBttsAssigned);

export const useGroupInviteMemberList = () =>
  useMutation(groupInviteMemberList);

export const useGetListOfGroupJoinRequest = () =>
  useMutation(getListOfGroupJoinRequest);

export const useApproveGroupInviteMember = () =>
  useMutation(approveGroupInviteMember);

export const useModifyGroupMemberRole = () =>
  useMutation(modifyGroupMemberRole);
