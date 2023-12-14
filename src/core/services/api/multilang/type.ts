export type TMultiLang = {
  action: "GET_ITEM" | "GET_LIST";
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

export type TAddMultiLang = {
  locale: string;
  usecase: string;
  // status?: "draft" | "published";
  translations?: any;
  version?: number;
};

export type TEditMultiLang = {
  locale?: string;
  usecase?: string;
  id: number;
  // status?: "draft" | "published";
  translations?: any;
};

export type TEditPublishMultiLang = {
  id: number;
  is_published?: boolean;
  // status?: "draft" | "published";
  translations?: any;
};

export type TDeleteMultiLang = {
  action: "delete_draft" | "delete_published";
  id?: number;
};
