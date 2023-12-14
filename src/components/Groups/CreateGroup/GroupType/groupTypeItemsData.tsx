import GeneralGroupRC from "./GeneralGroupRC";

export const groupTypeItemsData = [
  {
    id: 1,
    name: "groupType.mlsGroup",
    actualName: "mlsGroup",
    title: "MLS Group",
    child: <GeneralGroupRC hasMls />,
  },
  {
    id: 2,
    name: "groupType.brokerageGroup",
    actualName: "brokerageGroup",
    title: "Re Brokerage Group",
    child: <GeneralGroupRC />,
  },
  // {
  //   id: 3,
  //   name: "groupType.builder",
  //   actualName: "builder",
  //   title: "Real Estate Developer/Builder",
  //   child: <DeveloperBuilderRC />,
  // },
];
