export type TCreateGroup = {
  basic_info: {
    user_id: number;
    name: string;
    short_name: string;
    logo_url: URL;
    mention_name: string;
    contact_number: string;
    contact_email: string;
    terms: any;
    description: any;
  };
  address?: any;
  group_type?: {
    group_type_id: number;
    mls_id?: number;
  };
  expertise?: number | object;
  area_activity?: any[];
};

export type TGroupAddress = any;

export type TGroupType = {
  id: number;
  mls_id: number;
  group_id?: number;
};

export type TApproveInviteMemberGroup = {
  request_id: number;
  approve: boolean;
};

export type TChangeRoleGroupMember = {
  role: string;
  member_id: number;
};

export type TGroupExpertise = any;

export type TGroupAreaOfActivity = any;

export type TEditGroupBasicInfo = {
  basic_info: {
    user_id?: number;
    logo_url?: string;
    name?: string;
    short_name?: string;
    mention_name?: string;
    contact_number?: string;
    contact_email?: string;
    description?: any;
    terms?: any;
  };
  address: any;
};

export type TInviteMemberList = {
  invitation_list: { role: string; email: string }[];
};

export type TEditGroupType = {
  group_type_id: number;
  mls_id?: number;
};

export type TEditGroupExpertiseActivity = {
  area_of_activity: {
    lat: number;
    long: number;
  }[][];
  expertise: (number | { name: string; language_id: number })[];
};

export type TEditGroupBttList = {
  assign_btt?: { btt_id: number }[];
  dismiss_btt?: { btt_group_relation_id: number }[];
};

export type TAddEditLinkGroup = {
  title: string;
  category: string;
  url: string;
};

export type TAddEditDocumentGroup = {
  file_name: string;
  category: string;
  doc_url: string;
};

// export type TEditGroup =
//   | TGroupBasicInfo
//   | TGroupAddress
//   | TGroupType
//   | TGroupExpertise
//   | TGroupAreaOfActivity;

export type TGetGroupList = {
  creation_date_lte?: string;
  creation_date_gte?: string;
  total_members_gte?: number;
  total_members_lte?: number;
  group_type?: ("mls" | "brokerage")[];
  group_name?: string;
  is_published?: boolean;

  orderby_field?:
    | "total_members"
    | "group_name"
    | "group_type"
    | "status"
    | "is_published";
  orderby_direction?: "desc" | "asc";
  skip: number;
  limit: number;
};

export type TGetGroupListBtt = {
  skip: number;
  limit: number;
};

export type TGetGroupListBttAssigned = {
  skip: number;
  limit: number;
  group_id: number;
};

export type TGetGroupJoinList = {
  skip: number;
  limit: number;
  group_id: number;
};

export type TGetGroupMembers = {
  group_id: number;
  skip: number;
  limit: number;
  name?: string;
  role?: "owner" | "member" | "admin" | "moderator";
  start_date?: string;
  end_date?: string;
  join_reason?: "direct" | "brokerage_group" | "invoice";
};
