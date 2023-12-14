export type TGetAPIKey = {
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

export type TGetClientCredentials = {
  usage_type: "client_secret" | "api_key";
  user_api_key_id: number | string;
};

export type TGetAPIKeyResponse = {
  id: number;
  user_id: number;
  username: string;
  cognito_username: string;
  api_key_aws_id: string;
  name?: string;
  public_key: string;
  usage_plan_name: string;
  invoice_id: number;
  is_active: boolean;
  client_id?: string;
}[];

export type TGetAPIKeyResponseObj = {
  id: number;
  user_id: number;
  username: string;
  cognito_username: string;
  api_key_aws_id: string;
  name?: string;
  public_key: string;
  usage_plan_name: string;
  invoice_id: number;
  is_active: boolean;
  client_id?: string;
};

export type TResetApiKey = {
  user_api_key_id: number;
  quota_extension: number;
  description: string;
};

export type TRegenerateAPIKey = {
  user_api_keys_id: number;
};

export type TChangeAPIKeyStatus = {
  user_api_keys_id: number;
  is_active: boolean;
  description: string;
};
export type TDiagnosticClientCredentials = {
  user_api_key_id: number;
  diagnostic_type: string;
};
