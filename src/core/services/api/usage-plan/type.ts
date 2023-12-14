export type TGetUsagePlanParams = {
  limit: number;
  offset: number;
  orderby?: string;
  asc?: boolean;
};

export type TUsagePlanItem = {
  api_gateway_id: string;
  base_fee: number;
  extra_call_fee: number;
  id: number;
  name: string;
  package_id: number;
  quota_limit: number;
};
export type TCreateUsagePlan = {
  usage_plans: [
    {
      name: string;
      package_id: number;
      api_gateway_id: string;
      gateway_usage_plan_id: string;
      quota_limit: number;
      base_fee: number;
      extra_call_fee: number;
      details:{test:string};
    }
  ];
};
export type TEditUsagePlan = {
  id: number;
  name: string;
  package_id: number;
  api_gateway_id: string;
  gateway_usage_plan_id: string;
  quota_limit: number;
  base_fee: number;
  extra_call_fee: number;
};
export type TDeleteUsagePlan = { data: { usage_plans: [{ id: number }] } };
