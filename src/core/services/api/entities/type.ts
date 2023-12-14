export type TGetEntities = {
  entity:
    | "mls_servers"
    | "feed_types_connection_types"
    | "usage_plans"
    | "user_professions"
    | "btt_type_items"
    | "payment_method"
    | "locations"
    | "discounts"
    | "promotions"
    | "packages"
    | "staffs"
    | "groups"
    | "users"
    | "customers"
    | "invoices"
    | "invoice_item_packages"
    | "btt_permission_advantages"
    | "packages_btt_items"
    | "packages_pre_req_btt_items"
    | "package_descriptions"
    | "languages";
  data: {
    id?: number;
    select_fields?: string[];
    list_filter?: {
      filters?:
        | (
            | string
            | {
                field: string;
                operator: string;
                value: string | number;
              }
          )[];
      order_by?: string;
      limit: number;
      offset: number;
    };
  };
};
