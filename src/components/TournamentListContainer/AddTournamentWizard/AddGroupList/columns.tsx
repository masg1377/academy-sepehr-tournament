import { Download, Edit } from "react-feather";
import { Badge, Button } from "reactstrap";
import { DeleteCell } from "./DeleteCell";
import { EditCell } from "./EditCell";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { useParams } from "react-router-dom";
import {
  useGetListAvrageCheckListAdmin,
  useGetListOfReferesUser,
  useGetListOfTurnamentReferes,
} from "@src/core/services/api/tournament";
import { useEffect, useState } from "react";

const status: any = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Active", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

export const columns: any = [
  {
    name: "#",
    width: "100px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "group Name",
    sortable: false,
    minWidth: "190px",
    selector: (row: any) => row.groupName,
    // cell: (row: any) => (
    //   <div className="d-flex gap-1">
    //     <Download
    //       size={18}
    //       className="cursor-pointer"
    //       onClick={() => {
    //         let a = document.createElement("a");
    //         document.body.appendChild(a);
    //         a.download = row.name;
    //         a.href = row.url;
    //         a.target = "_blank";
    //         a.click();
    //       }}
    //     />{" "}
    //     <span>{row.name}</span>
    //   </div>
    // ),
  },
  {
    name: "final Avrage",
    // sortable: (row: any) => row.platform,
    selector: (row: any) => row.finalAvrage,
    cell: (row: any) => {
      const { id } = useParams();
      const [allScoreNum, setAllScoreNum] = useState(0);

      console.log(row);

      const getAllReferee = useGetListOfReferesUser();
      const getTournamentReferee = useGetListOfTurnamentReferes();
      const getlistAvg = useGetListAvrageCheckListAdmin();

      const loadAvg = async (allReferee: any) => {
        let allScore = 0;
        for (let index = 0; index < allReferee.length; index++) {
          let localScore = 0;
          const element = allReferee[index];
          const res = await getlistAvg.mutateAsync({
            TournamentId: id || "",
            UserId: element?.userId,
            GroupId: row?.id,
          });

          const curData = res?.data;
          curData?.forEach((cur: any) => {
            localScore = localScore + cur.setScoreNumber;
          });
          allScore += localScore;
        }
        setAllScoreNum(allScore / allReferee.length);
      };

      useEffect(() => {
        if (id && getAllReferee.isSuccess) {
          const allReferee = getAllReferee.data.data?.list;
          getTournamentReferee.mutate(
            { TournamentId: id },
            {
              onSuccess: (res) => {
                const result = res.data;
                const curReferees = allReferee?.filter((f: any) =>
                  result.some((s: any) => s.refereeName === f.fullName)
                );
                console.log("resutlsss", curReferees);
                loadAvg(curReferees);
              },
            }
          );
        }
      }, [id, getAllReferee.isSuccess]);

      return <>{allScoreNum}</>;
    },
  },
  {
    name: "mentor Count",
    // sortable: (row: any) => row.platform,
    selector: (row: any) => row.mentorCount,
  },
  {
    name: "student Count",
    width: "190px",
    // sortable: (row: any) => row.platform,
    selector: (row: any) => row.studentCount,
  },
  {
    name: "inser Date",
    width: "190px",
    // sortable: (row: any) => row.platform,
    selector: (row: any) =>
      row.inserDate ? getCustomDate(row.inserDate) : "-",
  },
  {
    name: "",
    // allowOverflow: true,
    width: "135px",
    cell: DeleteCell,
  },
  // {
  //   name: "",
  //   allowOverflow: false,
  //   width: "120px",
  //   cell: EditCell,
  // },
];
