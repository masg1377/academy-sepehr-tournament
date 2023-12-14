export type TCreateDiscount = {
  name: string;
  description: string;
  // currency: string;
  percent_off: number;
  // amount_off?: number;
  // duration: "forever" | "once" | "repeating";
  max_redemptions?: number;
  valid: boolean;
  expiry_date?: string | null;
  covered_packages_id?: number[];
  covered_btt_item_type_ids?: number[];
  is_global?: boolean;
  locations?: any;
};

export type TEditDiscount = {
  id: number;
  name?: string;
  description?: string;
  // currency?: string;
  // duration?: string;
  percent_off?: number;
  max_redemptions?: number;
  valid?: boolean;
  expiry_date?: string | null;
  relations: {
    add: { object_type: string; object_id: number }[];
    remove: { object_type: string; object_id: number }[];
  };
  is_global?: boolean;
};

export type TGetDiscountList = {
  offset: number;
  limit: number;
};

export type TDeleteDiscount = {
  id: number;
  confirm_delete_covered_items: boolean;
};
