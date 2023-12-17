// ** React Imports
import { FC, useRef, useState } from "react";

// ** Custom Components
import { Wizard } from "@src/components/common/wizard";
import { Card, CardBody } from "reactstrap";

// ** Steps
// import Address from './steps/Address'
// import SocialLinks from './steps/SocialLinks'
// import PersonalInfo from './steps/PersonalInfo'
// import AccountDetails from './steps/AccountDetails'

// ** Icons Imports
import { FileText, User, MapPin, Link, Settings, Lock } from "react-feather";
import { AddTournamentData } from "./AddTournamentData";
import { AddMlsAccess } from "./AddMlsAccess/AddMlsAccess";
import { AddMlsConfig } from "./AddMlsConfig/AddMlsConfig";
import { AddMlsDoc } from "./AddMlsDoc/AddMlsDoc";
import { useLocation, useParams } from "react-router-dom";
import { AddCheckList } from "./AddCheckList";
import { AddReffere } from "./AddReffere";
import { AddGroupList } from "./AddGroupList";

const AddTournamentWizard: FC = () => {
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
      id: "add-tournament-data",
      title: isEdit ? "Edit tournament Data" : "Add tournament Data",
      subtitle: "Enter Your tournament Data.",
      icon: <FileText size={18} />,
      content: <AddTournamentData stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "add-check-list",
      title: isEdit ? "Edit Check List" : "Add Check List",
      subtitle: "Enter Your MLS Documents.",
      icon: <FileText size={18} />,
      content: <AddCheckList stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "add-refere-config",
      title: isEdit ? "Edit Refere" : "Add Refere",
      subtitle: "Enter Your Refere.",
      icon: <Settings size={18} />,
      content: <AddReffere stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "add-group-access",
      title: isEdit ? "Edit Group" : "Add Group",
      subtitle: "Enter Your Group.",
      icon: <Lock size={18} />,
      content: <AddGroupList stepper={stepper} type="wizard-modern" />,
    },
  ];

  return (
    <Card>
      <CardBody>
        <div className="modern-horizontal-wizard">
          <Wizard
            type="modern-horizontal"
            ref={ref}
            steps={steps}
            options={{
              linear: false,
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
      </CardBody>
    </Card>
  );
};

export { AddTournamentWizard };
