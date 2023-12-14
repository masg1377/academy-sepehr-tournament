export type TAddBtt = {
  basic_info: {
    name: string;
    btt_conditions?: string;
    main_icon?: string;
    available_period?: number;
    graph_relation: boolean;
    type: string;
    boost_type?: string;
    is_asset?: boolean;
    expiry_date?: string;
    is_global: boolean;
  };
  locations?: any;
  pre_required?: { add: number[]; remove: number[] };
  descriptions?: {
    icon: string;
    language_code: string;
    short_description: string;
    description: { [key: string]: string };
    notice_description: string;
    condition_description: string;
  }[];
  hashtags?: number[];
};

export type TEditBtt = {
  id: number;
  basic_info?: {
    name?: string;
    btt_conditions?: string;
    main_icon?: string;
    available_period?: number;
    graph_relation?: boolean;
    type?: string;
    boost_type?: string;
    is_asset?: boolean;
    expiry_date?: string;
    is_global?: boolean;
    discount_id?: number;
  };
  locations?: any;
  pre_required?: { add: number[]; remove: number[] };
  descriptions?: {
    icon: string;
    language_code: string;
    short_description: string;
    description: { [key: string]: string };
    notice_description: string;
    condition_description: string;
  }[];
  hashtags?: { add?: number[]; remove?: number[] };
};
