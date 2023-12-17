import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import {
  useAddTournamentCheckListCommand,
  useGetCheckLists,
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
    checkList: null,
    score: "",
  });

  const { id } = useParams();
  const getCheckList = useGetCheckLists();

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

  const addCheckList = useAddTournamentCheckListCommand();

  const onSubmit = (val: any) => {
    const values = { ...val };
    const obj = {
      checkListId: values?.checkList?.value,
      tournamentId,
      scoreNumber: values?.score,
    };

    addCheckList.mutate(obj, {
      onSuccess: (res) => {
        toast.success("Successfully added!!");
        onToggle();
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
                <SelectOption
                  name="checkList"
                  placeholder="Please select ..."
                  label={"Check List"}
                  id="checkList"
                  options={getCheckList?.data?.data?.map((m: any) => ({
                    value: m?.id,
                    label: m?.title,
                  }))}
                  wrapperClassName="mb-1"
                  isClearable
                />
                <InputText
                  name="score"
                  placeholder="Please enter ..."
                  label={"Score"}
                  id="documentName"
                  type="number"
                  // wrapperClassName="mb-1"
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
