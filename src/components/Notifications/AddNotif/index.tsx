import { Wizard } from "@src/components/common/wizard";
import React, { FC, useRef, useState } from "react";
import { FileText, Settings } from "react-feather";
import { BasicDetails } from "./BasicDetails";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { NotifSettings } from "./NotifSettings";

const AddNotifComponent: FC = (): JSX.Element => {
  const [stepper, setStepper] = useState<any>(null);
  const [indexStep, setIndexStep] = useState<number>(0);

  const ref = useRef(null);

  const steps = [
    {
      id: "basic-details",
      title: "Basic details",
      icon: <FileText size={18} />,
      content: <BasicDetails stepper={stepper} />,
    },
    {
      id: "notification-setting",
      title: "Notification setting",
      icon: <Settings size={18} />,
      content: <NotifSettings stepper={stepper} />, //<AddMlsDoc stepper={stepper} type="wizard-modern" />,
    },
  ];

  return (
    <FormWrapper
      initialValues={{ action: [] }}
      onSubmit={() => {
        stepper.next();
      }}
      className="notif-no-bg"
    >
      <Wizard
        setActiveStep={setIndexStep}
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el: any) => {
          //   if (id && !isEdit) {
          //     el.to(6);
          //     setIndexStep(6);
          //   }
          setStepper(el);
        }}
      />
    </FormWrapper>
  );
};

export { AddNotifComponent };
