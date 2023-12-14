export type TAddMlsServer = {
  entity: "mls_server";
  data: {
    group_id?: number;
    name: string;
    short_name: string;
    country_id?: number;
    image?: string;
    status: boolean;
    contract_type?: string;
    report_required?: boolean;
    report_interval?: string;
    report_day_of_month?: number;
    address?: string;
    contact_email?: string;
    website?: string;
    contact_details?: { [key: string]: string };
  };
};

export type TEditMlsServer = {
  entity: "mls_server";
  data: {
    group_id?: number;
    name?: string;
    short_name?: string;
    country_id?: number;
    image?: string;
    status?: boolean;
    contract_type?: string;
    report_required?: boolean;
    report_interval?: string;
    report_day_of_month?: number;
    id: number;
    address?: string;
    contact_email?: string;
    website?: string;
    contact_details?: { [key: string]: string };
  };
};

export type TAddRequest = {
  entity: "mls_access_customer_request";
  data: {
    mls_id?: number;
    ticket_number?: string;
    status: string;
    mls_access_id?: number;
    platform_id?: number;
    agent_website?: string;
    agent_mls_id?: string;
    agent_name?: string;
    broker_mls_id?: string;
    broker_name?: string;
    broker_email?: string;
    office_name?: string;
    office_mls_id?: string;
    aggrement_start_date?: string;
    agent_email?: string;
    agent_type: string;
    client_source?: string;
    extra_data?: any;
    comments?: string;
  };
};

export type TEditRequest = {
  entity: "mls_access_customer_request";
  data: {
    id: number;
    ticket_number?: string;
    status?: string;
    mls_access_id?: number;
    platform_id?: number;
    handler_id?: number;
    agent_website?: string;
    agent_mls_id?: string;
    agent_name?: string;
    broker_mls_id?: string;
    broker_name?: string;
    broker_email?: string;
    office_name?: string;
    office_mls_id?: string;
    aggrement_start_date?: string;
    agent_email?: string;
    agent_type?: string;
    client_source?: string;
    extra_data?: { [key: string]: string };
    comments?: string;
  };
};

export type TGetRequest = {
  entity:
    | "mls_access_customer_request"
    | "mls_access_customer_request_document";
  data: {
    id?: number;
    list_filter?: {
      filters?: (
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

export type TCreateRequestDocument = {
  entity: "mls_access_customer_request_document";
  data: {
    name: string;
    mls_access_customer_request_id: number;
    status?: string; // Just the staff user can set 'status'
    url: string; // The URL must be gotten from uploader API endpoint.
    note?: string; // Just the staff user can set 'note'
  };
};

export type TEditRequestDocument = {
  entity: "mls_access_customer_request_document";
  data: {
    name?: string;
    status?: string; // Just the staff user can set 'status'
    url?: string; // The URL must be gotten from uploader API endpoint.
    note?: string; // Just the staff user can set 'note'
    id: number;
  };
};

export type TDeleteRequestDocument = {
  entity: "mls_access_customer_request_document";
  data: {
    id: number;
  };
};

export type TGetRequestDetail = {
  entity:
    | "mls_access_customer_request"
    | "mls_access_customer_request_document";
  data: {
    id: number;
  };
};

export type TAddMlsConfig = {
  entity: "mls_config";
  data: {
    mls_id: number;
    name: string;
    resource: string;
    query: string;
    limit: number;
    unique_field: string;
    status?: boolean;
    update_interval: number;
    photo_time_stamp_field: string;
  };
};

export type TAddMlsAccessPaymentMethod = {
  entity: "mls_access_payment_method";
  data: {
    mls_access_id: number;
    data_url: string;
    setup_fee?: number;
    reactivation_fee?: number;
    lambda_arn?: string;
    payment_url?: string;
    payment_username?: string;
    payment_password?: string;
    payment_details?: any;
    is_auto_billing: boolean;
  };
};

export type TAddMlsAccessPaymentFlatRateItems = {
  entity: "mls_access_payment_method_flat_rate_item";
  data: {
    mls_access_payment_method_id?: number;
    fee: number;
    interval: string;
    start_date: string;
    payment_day_of_month: number;
    target: string;
    description?: string;
  };
};

export type TEditMlsAccessPaymentFlatRateItems = {
  entity: "mls_access_payment_method_flat_rate_item";
  data: {
    id: number;
    fee?: number;
    interval?: string;
    start_date?: string;
    payment_day_of_month?: number;
    target?: string;
    description?: string;
  };
};

export type TAddMlsAccessPaymentRangeRateItems = {
  entity: "mls_access_payment_method_range_rate_item";
  data: {
    mls_access_payment_method_id: number;
    fee: number;
    interval: string;
    start_date: string;
    payment_day_of_month: number;
    target: string;
    description?: string;
    contract_type: string;
    from_number: number;
    to_number: number;
    per_type: string;
  };
};

export type TEditMlsAccessPaymentRangeRateItems = {
  entity: "mls_access_payment_method_range_rate_item";
  data: {
    id: number;
    fee?: number;
    interval?: string;
    start_date?: string;
    payment_day_of_month?: number;
    target?: string;
    description?: string;
    contract_type?: string;
    from_number?: number;
    to_number?: number;
    per_type?: string;
  };
};

export type TEditMlsAccessPaymentMethod = {
  entity: "mls_access_payment_method";
  data: {
    id: number;
    data_url?: string;
    setup_fee?: number;
    reactivation_fee?: number;
    lambda_arn?: string;
    payment_url?: string;
    payment_username?: string;
    payment_password?: string;
    payment_details?: any;
    is_auto_billing?: boolean;
  };
};

export type TEditMlsConfig = {
  entity: "mls_config";
  data: {
    id: number;
    mls_id: number;
    name: string;
    resource: string;
    query: string;
    limit: number;
    unique_field: string;
    status?: boolean;
    update_interval: number;
    photo_time_stamp_field: string;
  };
};

export type TGetMlsList = {
  entity:
    | "mls_document"
    | "mls_config"
    | "mls_server"
    | "mls_access"
    | "mls_access_credential"
    | "mls_access_payment_method"
    | "mls_access_payment_method_flat_rate_item"
    | "mls_access_payment_method_range_rate_item";
  data: {
    id?: number;
    list_filter?: {
      filters?: (
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

export type TAddMlsDoc = {
  entity: "mls_document";
  data: {
    name: string;
    url: string;
    document_type: string;
    mls_id: number;
  };
};

export type TAddMlsAcess = {
  entity: "mls_access";
  data: {
    accounting_status: boolean;
    connection_status: boolean;
    mls_id: number;
    contract_type?: string;
    feed_type_connection_type_id: number;
    mls_config_id?: number;
    platform_id?: number;
    platform_credential_id?: number;
    limitation?: any;
  };
};

export type TEditMlsAcess = {
  entity: "mls_access";
  data: {
    id: number;
    accounting_status?: boolean;
    connection_status?: boolean;
    contract_type?: string;
    feed_type_connection_type_id?: number;
    mls_config_id?: number;
    platform_id?: number;
    platform_credential_id?: number;
    limitation?: any;
  };
};

export type TAddMlsAccessCredential = {
  entity: "mls_access_credential";
  data: {
    mls_access_id: number;
    class_name: string;
    version: string;
    is_media: boolean;
    media_resource: string;
    media_object_type: string;

    rets_user_name: string;
    rets_password: string;
    agent_user_name?: string;
    agent_password?: string;

    login_url: string;
    auth_type: string;
    request_method: string;
    options?: any;
  };
};

export type TEditMlsAccessCredential = {
  entity: "mls_access_credential";
  data: {
    id: number;
    class_name?: string;
    version?: string;
    is_media?: boolean;
    media_resource?: string;
    media_object_type?: string;

    rets_user_name?: string;
    rets_password?: string;
    agent_user_name?: string;
    agent_password?: string;

    login_url?: string;
    auth_type?: string;
    request_method?: string;
    options?: any;
  };
};

export type TEditMlsDoc = {
  entity: "mls_document";
  data: {
    id: number;
    name: string;
    // url: string;
    document_type: string;
    // mls_id: number;
  };
};

export type TRemoveMls = {
  entity:
    | "mls_document"
    | "mls_server"
    | "mls_config"
    | "mls_access_payment_method_flat_rate_item"
    | "mls_access_payment_method_range_rate_item";
  data: {
    id: number;
  };
};
