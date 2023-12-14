// ** React Imports
import { FC, useRef, useState } from "react";

import { Wizard } from "@src/components/common/wizard";
import { FileText } from "react-feather";
import { AddBasePlatform } from "./AddBasePlatform/AddBasePlatform";
import AddPlatformCredential from "./AddPlatformCredential/AddPlatformCredential";
import { useLocation, useParams } from "react-router-dom";

const AddPlatform: FC = (): JSX.Element => {
  const ref = useRef(null);

  const { id, step } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");

  // ** State
  const [stepper, setStepper] = useState<any>(null);

  const steps = [
    {
      id: "add-mls-data",
      title: isEdit ? "Edit Platform" : "Add Platform",
      subtitle: "Enter Plaform Data.",
      icon: <FileText size={18} />,
      content: <AddBasePlatform stepper={stepper} />,
    },
    {
      id: "add-mls-document",
      title: isEdit ? "Edit Platform Credentials" : "Add Platform Credentials",
      subtitle: "Enter Platform Credentials data.",
      icon: <FileText size={18} />,
      content: <AddPlatformCredential stepper={stepper} />,
    },
  ];
  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: !!id ? false : true,
        }}
        instance={(el: any) => {
          if (!!id && !!step && +step > 1) {
            el.to(2);
            console.log({ ...el });
          }
          setStepper(el);
        }}
      />
    </div>
  );
};

export { AddPlatform };
