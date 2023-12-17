import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import {
  useAddReferee,
  useAddTournamentCheckListCommand,
  useAddTournamentGroup,
  useGetCheckLists,
  useGetListOfReferesUser,
} from "@src/core/services/api/tournament";
import { FormikProps } from "formik";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

interface IAddConfigModalProp {
  isOpen: boolean;
  onToggle: () => void;
  onAddData: (data: any) => void;
  editCellData: any;
  setEditCellData: any;
  tournamentId?: any;
}
const AddDocModal: FC<IAddConfigModalProp> = ({
  isOpen,
  onToggle,
  onAddData,
  editCellData,
  setEditCellData,
  tournamentId,
}): JSX.Element => {
  const [initialValues, setInitialValues] = useState<any>({
    groupName: "",
    describe: "",
  });

  const { id } = useParams();
  const getCheckList = useGetListOfReferesUser();

  // useEffect(() => {
  //   (async () => {
  //     if (editCellData) {
  //       // const file = await urlToObject(editCellData.url);
  //       // console.log(file);
  //       setInitialValues((old: any) => ({
  //         ...old,
  //         documentName: editCellData.name,
  //         documentType: mlsDocumentType.find(
  //           (o) => o.value === editCellData.document_type
  //         ),
  //         file: editCellData.url,
  //       }));
  //     } else
  //       setInitialValues({
  //         documentType: null,
  //         documentName: "",
  //         file: null,
  //       });
  //   })();
  // }, [editCellData]);

  const addCheckList = useAddTournamentGroup();

  const onSubmit = (val: any) => {
    const values = { ...val };
    const obj = {
      groupName: values?.groupName,
      tournamentId,
      describe: values?.describe,
    };

    addCheckList.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.success) {
          toast.success("Successfully added!!");
          onToggle();
        } else toast.error("Something went wrong!!");
      },
    });
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      // validationSchema={
      //   editCellData ? editMlsDocValidation : addMlsDocValidation
      // }
    >
      {({ submitForm }: FormikProps<any>) => (
        <Modal
          // size="sm"
          isOpen={isOpen}
          onToggle={() => {
            setInitialValues({
              documentType: null,
              documentName: "",
              file: null,
            });
            onToggle();
          }}
          unmountOnClose
          modalTitle="Add Check List"
          bodyClassName="overflow-visible pb-2"
        >
          {{
            main: (
              <>
                <InputText
                  name="groupName"
                  placeholder="Please enter..."
                  label="Group Name"
                  wrapperClassName="mb-1"
                />
                <InputText
                  name="describe"
                  placeholder="Please enter..."
                  label="Describe"
                  type="textarea"
                />
              </>
            ),
            footer: (
              <SubmitButton
                type={"submit"}
                color="primary"
                outline
                isLoading={addCheckList.isLoading}
                className="btn-next w-25"
                // schema={
                //   editCellData ? editMlsDocValidation : addMlsDocValidation
                // }
                // values={}
                onClick={submitForm}
              >
                <span className={"align-middle d-sm-inline-block"}>Save</span>
              </SubmitButton>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { AddDocModal };
