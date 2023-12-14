import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import React, { FC } from "react";
import { Card } from "reactstrap";

const AddAccessForm: FC = (): JSX.Element => {
  return (
    <Card className="overflow-hidden">
      <FormWrapper initialValues={{}} onSubmit={() => {}}>
        {() => (
          <>
            <InputText
              name=""
              placeholder="Please enter ..."
              label={"Access Token"}
              id="platformAccessToken"
              // wrapperClassName="mb-1"
            />
          </>
        )}
      </FormWrapper>
    </Card>
  );
};

export { AddAccessForm };
