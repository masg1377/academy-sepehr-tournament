// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import { Wizard } from "@src/components/common/wizard";

// ** Steps
// import Address from './steps/Address'
// import SocialLinks from './steps/SocialLinks'
// import PersonalInfo from './steps/PersonalInfo'
// import AccountDetails from './steps/AccountDetails'

// ** Icons Imports
import { FileText, User, MapPin, Link, Settings, Lock } from "react-feather";
import { AddMlsData } from "./AddMlsData/AddMlsData";
import { AddMlsAccess } from "./AddMlsAccess/AddMlsAccess";
import { AddMlsConfig } from "./AddMlsConfig/AddMlsConfig";
import { AddMlsDoc } from "./AddMlsDoc/AddMlsDoc";
import { useLocation, useParams } from "react-router-dom";

const AddMlsWizard = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  console.log(activeStep);

  const isEdit = location.pathname.includes("edit");

  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState<any>(null);

  const steps = [
    {
      id: "add-mls-data",
      title: isEdit ? "Edit MLS Data" : "Add MLS Data",
      subtitle: "Enter Your MLS Data.",
      icon: <FileText size={18} />,
      content: <AddMlsData stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "add-mls-document",
      title: isEdit ? "Edit MLS document" : "Add MLS document",
      subtitle: "Enter Your MLS Documents.",
      icon: <FileText size={18} />,
      content: <AddMlsDoc stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "add-mls-config",
      title: isEdit ? "Edit MLS Config" : "Add MLS Config",
      subtitle: "Enter Your MLS Config.",
      icon: <Settings size={18} />,
      content: <AddMlsConfig stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "add-mls-access",
      title: isEdit ? "Edit MLS Access" : "Add MLS Access",
      subtitle: "Enter Your MLS Access.",
      icon: <Lock size={18} />,
      content: <AddMlsAccess stepper={stepper} type="wizard-modern" />,
    },
  ];

  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: id ? false : true,
        }}
        instance={(el: any) => {
          if (id && !isEdit) {
            console.log("first", el.detail);
            el.to(2);
          }
          setStepper(el);
        }}
        setActiveStep={setActiveStep}
      />
    </div>
  );
};

export { AddMlsWizard };
