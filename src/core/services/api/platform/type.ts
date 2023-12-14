export type TCreatePlatform = {
  entity: "platform";
  data: {
    name: string;
    image?: string;
    dashboard_access_url: string;
    username: string;
    password: string;
    extra_data?: { key: string | number }[];
  };
};

export type TEditPlatform = {
  entity: "platform";
  data: {
    id: number;
    name?: string;
    image?: string;
    dashboard_access_url?: string;
    username?: string;
    password?: string;
    extra_data?: { key: string | number }[];
  };
};

export type TCreatePlatformCredential = {
  entity: "platform_credential";
  data: {
    name?: string;
    platform_id: number;
    feed_type_connection_type_id: number;
    token_url?: string;
    request_url: string;
    client_id?: string;
    client_password?: string;
    access_token?: string;
    scope?: string;
    generate_token: boolean;
    options?: any;
  };
};

export type TDeletePlatform = {
  entity: "platform_credential" | "platform";
  data: {
    id: number;
  };
};

export type TEditPlatformCredential = {
  entity: "platform_credential";
  data: {
    id: number;
    name?: string;
    platform_id: number;
    feed_type_connection_type_id: number;
    token_url?: string;
    request_url: string;
    client_id?: string;
    client_password?: string;
    access_token?: string;
    scope?: string;
    generate_token: boolean;
    options?: any;
  };
};

export type TGetPlatformList = {
  entity: "platform" | "platform_credential";
  data: {
    id?: number;
    list_filter?: {
      filters?:
        | (
            | string
            | {
                field: string;
                operator: string;
                value: string | number | string[] | number[];
              }
          )[];
      order_by?: string;
      limit: number;
      offset: number;
    };
  };
};

export type TGetPlatform = {
  entity: "platform" | "platform_credential";
  data: {
    id: number;
  };
};
