// ** React Imports
import { FC, useEffect, useRef, useState } from "react";
import Lang from "@src/assets/images/icons/lang-d.png";
import LangL from "@src/assets/images/icons/lang-l.png";
import { Wizard } from "@src/components/common/wizard";
import { CornerUpLeft, FileText, Star } from "react-feather";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BasicDetails } from "./BasicDetails/BasicDetails";
import { BttTypePermission } from "./BttTypePermission/BttTypePermission";
import { PreRequirement } from "./PreRequirement/PreRequirement";
import LanguageHashtag from "./LanguageHashtag/LanguageHashtag";
import { FormikProps } from "formik";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { addBttValidation } from "@src/core/validations/btt.validation";
import { useCreateBtt } from "@src/core/services/api/btt/btt.api";
import { TAddBtt } from "@src/core/services/api/btt/type";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";

const AddBtt: FC = (): JSX.Element => {
  const ref = useRef(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [bttDetail, setBttDetail] = useState<any>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");

  // ** State
  const [stepper, setStepper] = useState<any>(null);

  const getBtt = useGetListOfEntity();

  useEffect(() => {
    if (id) {
      getBtt.mutate(
        { entity: "btt_type_items", data: { id: +id } },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              setBttDetail(res.data.result);
            }
          },
        }
      );
    }
  }, [refetch]);

  const steps = [
    {
      id: "btt-basic-details",
      title: "Basic details",
      // subtitle: "Enter Plaform Data.",
      icon: <FileText size={18} />,
      content: (
        <BasicDetails
          stepper={stepper}
          // setActiveStep={setActiveStep}
          bttDetail={bttDetail}
          isLoading={getBtt.isLoading}
          setRefetch={setRefetch}
          // schema={activeStep === 0 ? addBttValidation : addBttValidation}
        />
      ),
    },
    {
      id: "btt_type_permissions",
      title: "BTT type & permissions",
      // subtitle: "Enter Platform Credentials data.",
      icon: <Star size={18} />,
      content: (
        <BttTypePermission
          stepper={stepper}
          bttDetail={bttDetail}
          isLoading={getBtt.isLoading}
          activeStep={activeStep}
          // schema={activeStep === 0 ? addBttValidation : addBttValidation}
        />
      ),
    },
    {
      id: "btt-pre-required",
      title: "Pre-requirement BTT",
      // subtitle: "Enter Platform Credentials data.",
      icon: <CornerUpLeft size={18} />,
      content: (
        <PreRequirement
          stepper={stepper}
          // schema={addBttValidation}
          bttDetail={bttDetail}
          activeStep={activeStep}
          isLoading={getBtt.isLoading}
          refetch={() => setRefetch((old) => !old)}
        />
      ),
    },

    {
      id: "language_hashtag",
      title: "Language & Hashtag",
      // subtitle: "Enter Platform Credentials data.",
      icon: (
        <img
          src={activeStep === 3 ? LangL : Lang}
          alt="lang"
          style={{ width: 20 }}
        />
      ),
      content: (
        <LanguageHashtag
          stepper={stepper}
          bttDetail={bttDetail}
          isLoading={getBtt.isLoading}
          activeStep={activeStep}
          refetch={() => setRefetch((old) => !old)}
          // schema={activeStep === 0 ? addBttValidation : addBttValidation}
        />
      ),
    },
  ];

  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        setActiveStep={setActiveStep}
        options={{
          linear: !id ? true : false,
        }}
        instance={(el: any) => {
          if (!!id && !isEdit) {
            el.to(2);
            setActiveStep(1);
            // console.log({ ...el });
          }
          setStepper(el);
        }}
      />
    </div>
  );
};

export { AddBtt };
