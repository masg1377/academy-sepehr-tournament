export type TCreatePromotion = {
  name: string;
  description?: string;
  // currency: string;
  percent_off: number;
  // amount_off: number;
  // duration: "forever" | "once" | "repeating";
  max_redemptions?: number;
  // times_redeemed: number;
  valid: boolean;
  expiry_date?: string | null;
  covering_package_id_list?: number[] | null;
  covering_btt_type_item_id_list?: number[];
  is_auto: boolean;
  code?: string;
  on_top_of_other_promotions: boolean;
  covering_location_object?: any;
  covering_group_id_list?: number[] | null;
};

export type TEditPromotion = {
  id: number;
  gateway_promotion_code_id?: string;
  is_auto?: boolean;
  code?: string;
  percent_off?: number;
  name?: string;
  description?: string;
  // currency?: string;
  // duration?: number;
  max_redemptions?: number;
  valid?: boolean;
  on_top_of_other_promotions?: boolean;
  expiry_date?: string | null;
  relations: {
    add: {
      object_type: string;
      object_id: number;
    }[];
    remove: {
      object_type: string;
      object_id: number;
    }[];
  };
};

export type TGetPromotionList = {
  offset: number;
  limit: number;
};

export type TDeletePromotion = {
  id: number;
  confirm_delete_covered_items: boolean;
};
