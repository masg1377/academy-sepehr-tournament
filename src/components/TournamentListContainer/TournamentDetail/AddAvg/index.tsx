import React, { FC, useEffect, useState } from "react";
import { FormStepsWrapper } from "../../AddTournamentWizard/FormStepsWrapper/FormStepsWrapper";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import {
  useGetListOfTurnamentReferes,
  useGetTournamentCheckLists,
  useGetTournamentGroupList,
  useListSetAvrageForGroupCheckList,
} from "@src/core/services/api/tournament";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { Divider } from "@src/components/common/divider/Divider";
import { ExtraDataList } from "./ExtraDataList";
import toast from "react-hot-toast";

const AddAvg: FC = (): JSX.Element => {
  const { id } = useParams();

  const { user } = useSelector((state: RootState) => state.user);

  const [refereId, setRefereId] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [fieldList, setFieldList] = useState<any>([]);

  console.log("fieldList", fieldList);

  const getGroup = useGetTournamentGroupList();
  const getListOfTournamentCheckList = useGetTournamentCheckLists();
  const getListOfTournamentRefereeList = useGetListOfTurnamentReferes();
  const setAvg = useListSetAvrageForGroupCheckList();

  const onLoadData = () => {
    if (id)
      getListOfTournamentCheckList.mutate(id, {
        onSuccess: (res) => {
          const result = res.data;
          console.log(result);
          const fields = result?.map((field: any) => ({
            title: field.checkListTitle,
            score: 0,
            totalScore: field.scoreNumber,
            id: field.id,
          }));
          setFieldList(fields);
          setData(
            result?.map((m: any, ind: number) => ({
              ...m,
              row_id: ind + 1,
            }))
          );
        },
      });
  };

  const loadGroups = () => {
    getGroup.mutate({ TournamentId: id || "" });
  };
  const onLoadRefereeData = () => {
    if (id) {
      const userId = user.id;
      getListOfTournamentRefereeList.mutate(
        { TournamentId: id, refeerUserId: userId },
        {
          onSuccess: (res) => {
            const result = res.data;
            if (result?.length > 0) setRefereId(result[0]?.refereId);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (id) {
      loadGroups();
      onLoadData();
    }
  }, [id]);

  useEffect(() => {
    if (user && id) {
      onLoadRefereeData();
    }
  }, [id, user]);

  const onSubmit = (values: any, { resetForm }: any) => {
    console.log("values", values);

    const checkLists = values.checkLists;

    const model = checkLists?.map((m: any) => ({
      groupId: values?.group?.value,
      scoreNumber: m?.score,
      tcListId: m?.id,
      referId: refereId,
    }));

    // [
    //     {
    //       "groupId": 0,
    //       "scoreNumber": 0,
    //       "tcListId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       "referId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    //     }
    //   ]

    console.log("model", model);

    setAvg.mutate(model, {
      onSuccess: (res) => {
        toast.success("Successfully updated!!");
        resetForm();
      },
    });
  };

  return (
    <Card>
      <CardBody>
        <FormWrapper
          initialValues={{ group: null, checkLists: fieldList }}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({}) => (
            <FormStepsWrapper
              stepName="Set Average"
              stepNum={1}
              stepper={null}
              nextLabel="Save"
              isLoading={setAvg.isLoading}
            >
              <RowWrappers sm={12} md={6} xl={4}>
                <SelectOption
                  name="group"
                  placeholder="Please select ..."
                  label={"Group"}
                  id="group"
                  options={getGroup?.data?.data?.map((m: any) => ({
                    value: m?.id,
                    label: m?.groupName,
                  }))}
                  wrapperClassName="mb-1"
                  isClearable
                  //   onChange={(opt) => {
                  //     setFieldValue("tournament", opt);
                  //     if (opt) {
                  //       setTournamentId(opt?.value);
                  //       getListOfTournamentCheckList.mutate(
                  //         { TournamentId: opt?.value },
                  //         {
                  //           onSuccess: (res) => {
                  //             const result = res.data;
                  //             console.log(result);
                  //             setData(
                  //               result?.map((m: any, ind: number) => ({
                  //                 ...m,
                  //                 row_id: ind + 1,
                  //               }))
                  //             );
                  //           },
                  //         }
                  //       );
                  //     }
                  //   }}
                />
              </RowWrappers>

              <Divider title="Set average" textPosition="center" />

              <ExtraDataList />
            </FormStepsWrapper>
          )}
        </FormWrapper>
      </CardBody>
    </Card>
  );
};

export { AddAvg };
