import * as yup from "yup";

const addPackStep1Validation = yup.object().shape({
  mobile_icon: yup.string().optional().nullable(),
  web_icon: yup.string().optional().nullable(),
  banner: yup.string().optional().nullable(),
  type: yup.object().required("Enter type").typeError("Enter type"),
  name: yup.string().required("Enter name").typeError("Enter name"),
  source: yup.object().required("Enter source").typeError("Enter source"),
  sourceRelatedTo: yup
    .object()
    .required("Enter related to")
    .typeError("Enter related to"),
  taxCode: yup.string().notRequired().optional().nullable(),
  multiple: yup.object().required("Enter multiple").typeError("Enter multiple"),
  //   languageCode: yup
  //     .object()
  //     .required("Enter multiple")
  //     .typeError("Enter multiple"),
  language: yup
    .array()
    .of(
      yup.object().shape({
        description: yup
          .array()
          .of(
            yup
              .object()
              .shape({
                key: yup.string().required("Enter description"),
                type: yup.object().required(),
                //value: yup.string().required(),
              })
              .required()
          )
          .required(),
        conditionDescription: yup.string().optional().nullable(),
        noticeDescription: yup.string().optional().nullable(),
        label: yup.string().required(),
        shortDescription: yup.string().optional().nullable(),
        longDescription: yup
          .string()
          .required("Enter long description")
          .typeError("Enter valid long description"),

        // yup
        //   .array()
        //   .of(
        //     yup.object().shape({
        //       key: yup.string().required(""),
        //       type: yup.object().required(""),
        //       value: yup.string().required(""),
        //     })
        //   )
        //   .optional(),
      })
    )
    .required("Enter a language from list")
    .typeError("Enter a valid language from list"),
});

const addPackStep3Validation = yup.object().shape({
  usagePlanId: yup.object().when("source", {
    is: (obj: any) => {
      return obj && obj.value === "reso";
    },
    then: yup
      .object()
      .required("Enter usage plan")
      .typeError("Enter usage plan"),
    otherwise: yup.object().optional().nullable(),
  }),
});

const addPackStep4Validation = yup.object().shape({
  bttItems: yup.array().when("source", {
    is: (obj: any) => {
      return obj && obj.value === "reso";
    },
    then: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            value: yup
              .number()
              .required("Invalid value")
              .typeError("Invalid value"),
            label: yup
              .string()
              .required("Invalid label")
              .typeError("Invalid label"),
            count: yup
              .number()
              .required("Enter count")
              .typeError("Invalid count"),
          })
          .required("Enter detail")
      )
      .required("Enter btt itmes")
      .typeError("Enter valid btt itmes"),
    otherwise: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            value: yup
              .number()
              .required("Invalid value")
              .typeError("Invalid value"),
            label: yup
              .string()
              .required("Invalid label")
              .typeError("Invalid label"),
            count: yup
              .number()
              .required("Enter count")
              .typeError("Invalid count"),
          })
          .optional()
      )
      .optional()
      .nullable(),
  }),

  preRegBttItems: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          value: yup
            .number()
            .required("Invalid value")
            .typeError("Invalid value"),
          label: yup
            .string()
            .required("Invalid label")
            .typeError("Invalid label"),
          count: yup
            .number()
            .required("Enter count")
            .typeError("Invalid count"),
        })
        .optional()
    )
    .optional()
    .nullable(),
});

const addPackageValidation = yup.object().shape({
  mobile_icon: yup.string().optional().nullable(),
  web_icon: yup.string().optional().nullable(),
  banner: yup.string().optional().nullable(),
  type: yup.object().required("Enter type").typeError("Enter type"),
  name: yup.string().required("Enter name").typeError("Enter name"),
  source: yup.object().required("Enter source").typeError("Enter source"),
  sourceRelatedTo: yup
    .object()
    .required("Enter related to")
    .typeError("Enter related to"),
  taxCode: yup.string().notRequired().optional().nullable(),
  multiple: yup.object().required("Enter multiple").typeError("Enter multiple"),
  //   languageCode: yup
  //     .object()
  //     .required("Enter multiple")
  //     .typeError("Enter multiple"),
  language: yup
    .array()
    .of(
      yup.object().shape({
        description: yup
          .array()
          .of(
            yup
              .object()
              .shape({
                key: yup.string().required("Enter description"),
                type: yup.object().required(),
                //value: yup.string().required(),
              })
              .required()
          )
          .required(),
        conditionDescription: yup.string().optional().nullable(),
        noticeDescription: yup.string().optional().nullable(),
        label: yup.string().required(),
        shortDescription: yup.string().optional().nullable(),
        longDescription: yup
          .string()
          .required("Enter long description")
          .typeError("Enter valid long description"),
        //   .array()
        //   .of(
        //     yup.object().shape({
        //       key: yup.string().required(""),
        //       type: yup.object().required(""),
        //       value: yup.string().required(""),
        //     })
        //   )
        //   .optional(),
      })
    )
    .required("Enter a language from list")
    .typeError("Enter a valid language from list"),
  bttItems: yup.array().when("source", {
    is: (obj: any) => {
      return obj && obj.value === "reso";
    },
    then: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            value: yup
              .number()
              .required("Invalid value")
              .typeError("Invalid value"),
            label: yup
              .string()
              .required("Invalid label")
              .typeError("Invalid label"),
            count: yup
              .number()
              .required("Enter count")
              .typeError("Invalid count"),
          })
          .required("Enter detail")
      )
      .required("Enter btt itmes")
      .typeError("Enter valid btt itmes"),
    otherwise: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            value: yup
              .number()
              .required("Invalid value")
              .typeError("Invalid value"),
            label: yup
              .string()
              .required("Invalid label")
              .typeError("Invalid label"),
            count: yup
              .number()
              .required("Enter count")
              .typeError("Invalid count"),
          })
          .optional()
      )
      .optional()
      .nullable(),
  }),

  preRegBttItems: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          value: yup
            .number()
            .required("Invalid value")
            .typeError("Invalid value"),
          label: yup
            .string()
            .required("Invalid label")
            .typeError("Invalid label"),
          count: yup
            .number()
            .required("Enter count")
            .typeError("Invalid count"),
        })
        .optional()
    )
    .optional()
    .nullable(),
  userProfession: yup.object().optional().nullable(),
  feedType: yup.object().when("type", {
    is: (obj: any) => {
      return obj && obj.value === 6;
    },
    then: yup.object().required("Enter feed type").typeError("Enter feed type"),
    otherwise: yup.object().optional().nullable(),
  }),
  mlsContractType: yup.object().when("type", {
    is: (obj: any) => {
      return obj && obj.value === 6;
    },
    then: yup
      .object()
      .required("Enter mls contract type")
      .typeError("Enter mls contract type"),
    otherwise: yup.object().optional().nullable(),
  }),
  usagePlanId: yup.object().when("source", {
    is: (obj: any) => {
      return obj && obj.value === "reso";
    },
    then: yup
      .object()
      .required("Enter usage plan")
      .typeError("Enter usage plan"),
    otherwise: yup.object().optional().nullable(),
  }),

  mlsId: yup.object().when("type", {
    is: (obj: any) => {
      return (
        obj && obj.value === 6 //(obj.value === "realtyfeed app" || obj.value === "data feed")
      );
    },
    then: yup.object().required("Enter mls id").typeError("Enter mls id"),
    otherwise: yup.object().optional().nullable(),
  }),
});

const addPackStep5Validation = yup.object().shape({
  nickname: yup.string().nullable().optional(),
  unitAmount: yup
    .number()
    .required("Enter the unitAmount")
    .typeError("Enter the unitAmount"),
  billingSchema: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .nullable()
    .optional()
    .typeError("Enter the billingSchema"),
  // tiresMods: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required(),
  //     label: yup.string().required(),
  //   })
  //   .nullable()
  //   .optional()
  //   .typeError("Enter the tiresMods"),
  tiresMods: yup
    .object()
    .typeError("Enter the tiresMods")
    .when("billingSchema", {
      is: (obj: any) => {
        return obj && obj.value === "tiered";
      },
      then: yup
        .object()
        .optional()
        .nullable()
        .required("Select the tiresMods")
        .typeError("Select the tiresMods")
        .shape({
          value: yup.string().required(),
          label: yup.string().required(),
        }),
      otherwise: yup.object().optional().nullable(),
    }),
  taxBehavior: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .nullable()
    .optional()
    .typeError("Enter the taxBehavior"),
  trialPeriodDays: yup
    .number()
    .integer("please enter integer")
    .typeError("Enter the terialPeriodDays")
    .nullable()
    .optional(),
  oneTimeValidDays: yup
    .number()
    .integer("please enter integer")
    .typeError("Enter the validDays")
    .nullable()
    .optional(),
});

const addPayModalStep5Validation = yup.object().shape({
  nickname: yup.string().nullable().optional(),
  unitAmount: yup
    .number()
    .required("Enter the unitAmount")
    .typeError("Enter the unitAmount"),
  nterval: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .typeError("Select the interval")
    .required(),
  intervalCount: yup
    .number()
    .integer("please enter integer")
    .nullable()
    .optional(),
  //.typeError("Enter the intervalCount"),
  //.required(),
  usageType: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .typeError("Select the type")
    .nullable()
    .optional(),
  billingSchema: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .nullable()
    .optional()
    .typeError("Enter the billingSchema"),
  tiresMods: yup
    .object()
    .typeError("Enter the tiresMods")
    .when("billingSchema", {
      is: (obj: any) => {
        return obj && obj.value === "tiered";
      },
      then: yup
        .object()
        .required("Select the tiresMods")
        .typeError("Select the tiresMods")
        .shape({
          value: yup.string().required(),
          label: yup.string().required(),
        }),
      otherwise: yup.object().optional().nullable(),
    }),
  taxBehavior: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .nullable()
    .optional()
    .typeError("Enter the taxBehavior"),
  trialPeriodDays: yup
    .number()
    .integer("please enter integer")
    .typeError("Enter the terialPeriodDays")
    .nullable()
    .optional(),
  oneTimeValidDays: yup
    .number()
    .integer("please enter integer")
    .typeError("Enter the validDays")
    .nullable()
    .optional(),
  recurring_aggregate_usage: yup
    .object()
    .typeError("Select the type")
    .when("usageType", {
      is: (obj: any) => {
        return obj && obj.value === "metered";
      },
      then: yup
        .object()
        .required("Select the type")
        .typeError("Select the type")
        .shape({
          value: yup.string().required(),
          label: yup.string().required(),
        }),
      otherwise: yup.object().optional().nullable(),
    }),
});

export {
  addPackageValidation,
  addPackStep1Validation,
  addPackStep3Validation,
  addPackStep4Validation,
  addPackStep5Validation,
  addPayModalStep5Validation,
};
