import { RunModeEnum } from "../enum/run-modes.enum";

const RUN_MODE: string | undefined = process.env.REACT_APP_RUN_MODE;

type IAwsConfig = {
  Auth: {
    identityPoolId: string;
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
  };
  aws_appsync_graphqlEndpoint: string;
  aws_appsync_region: string;
  aws_appsync_authenticationType: string;
};

const awsConfig: IAwsConfig = {
  Auth: {
    identityPoolId: "us-east-1:71527184-6f01-465a-8783-44628c5aca6b",
    region: "us-east-1",
    userPoolId: "us-east-1_YwEZzgqw9",
    userPoolWebClientId: "594git832a3pmi74bb0m3jf3k4",
  },
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_graphqlEndpoint:
    "https://i6mvieo3jfc7hgjy6x6khzilni.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
};

const awsConfigDev: IAwsConfig = {
  Auth: {
    identityPoolId: "us-east-1:76389feb-e688-4ab2-83e5-b5dc1068d507",
    region: "us-east-1",
    userPoolId: "us-east-1_92trFqjMo",
    userPoolWebClientId: "3v9u7eek40rqqkacg1a6uu6v8n",
  },
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_graphqlEndpoint:
    "https://i6mvieo3jfc7hgjy6x6khzilni.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
};

const config =
  RUN_MODE !== RunModeEnum.Prod && RUN_MODE !== RunModeEnum.Stage
    ? awsConfigDev
    : awsConfig;

export default config;
