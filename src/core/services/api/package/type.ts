export type TAddPackage = {
  mobile_icon?: string;
  web_icon?: string;
  banner?: string;
  type: string;
  name: string;
  source: string;
  related_to: string;
  tax_code: string;
  active: boolean;
  multiple: boolean;
  btt_items_id?:
    | {
        id: number;
        count: number;
      }[]
    | null;
  pre_req_btt_items?: number[] | null;
  location_object?:
    | {
        Country: string;
      }[]
    | null;
  user_professions_items?: number[] | null;
  package_descriptions: {
    language_code: string;
    short_description?: {
      key: string;
      value: string;
    }[];
    notice_description?: string;
    description: {
      key: string;
      value: string;
      value_type: string;
    }[];
    condition_description: string;
  }[];

  mls_id?: number | null;
  feed_type?: string;
  mls_contract_type?: string;
  usage_plan_id?: string;
};

export type TAddPaymentMethod = {
  item_type: string;
  item_id: number;
  zipcode_id?: number | null;
  active: boolean;
  billing_scheme: string;
  nickname?: string;
  type: number;
  currency: "usd";
  recurring_aggregate_usage?: string;
  recurring_interval?: string;
  recurring_interval_count?: number;
  recurring_usage_type?: string;
  tax_behavior?: string;
  tires_mode?: string;
  trial_period_days?: number | null;
  unit_amount?: number;
  unit_amount_decimal?: number;
  one_time_valid_days?: number | null;
};

export type TEditPaymentMethod = {
  id: number;
  item_type: string;
  item_id: number;
  zipcode_id?: number | null;
  active: boolean;
  billing_scheme?: string;
  nickname?: string;
  type: number;
  currency: "usd";
  recurring_aggregate_usage?: string;
  recurring_interval?: string;
  recurring_interval_count?: number;
  recurring_usage_type?: string;
  tax_behavior?: string;
  tires_mode?: string;
  trial_period_days?: number;
  unit_amount?: number;
  unit_amount_decimal?: number;
  one_time_valid_days?: number | null;
};
