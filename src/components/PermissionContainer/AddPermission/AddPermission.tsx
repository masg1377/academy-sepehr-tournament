// ** React Imports
import { FC, useRef, useState } from "react";

import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { PermissionsList } from "./ExtraDataList/ExtraDataList";
import { useAddPermission } from "@src/core/services/api/btt/btt.api";

const AddPermission: FC = (): JSX.Element => {
  const ref = useRef(null);
  const [permissions, setPermissions] = useState([]);
  const [initialValues, setInitialValues] = useState<any>({
    roleName: "",
    permissions: null,
  });

  // const { id } = useParams();

  const navigate = useNavigate();

  const addPermission = useAddPermission();

  const onSubmit = async (values: any) => {
    // console.log(values);

    // return;
    addPermission.mutate(
      values.permissions.map((m: any) => ({
        name: m.key,
        type: m.type.value,
        is_boolean: m.is_boolean.value === 1 ? true : false,
      })),
      {
        onSuccess: (res: any) => {
          if (res.data.is_success || res.data.success) {
            navigate("/permissions");
          }
        },
      }
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom pt-2 pb-2">
        <CardTitle tag="h4" className="d-flex">
          Add Permission
        </CardTitle>
      </CardHeader>
      <CardBody>
        <FormWrapper
          initialValues={{
            permissions: [
              {
                key: "",
                type: { value: "staff", label: "Staff" },
                is_boolean: { value: 1, label: "True" },
              },
            ],
          }}
          onSubmit={onSubmit}
          // validationSchema={addRoleValidation}
          enableReinitialize
        >
          {({ values, setFieldValue }: FormikProps<any>) => (
            <>
              <PermissionsList />

              <SubmitButton
                color="info"
                type="submit"
                className="ms-auto me-0 d-block"
                isLoading={addPermission.isLoading}
                // schema={addRoleValidation}
              >
                Save
              </SubmitButton>
            </>
          )}
        </FormWrapper>
      </CardBody>
    </Card>
  );
};

export { AddPermission };
