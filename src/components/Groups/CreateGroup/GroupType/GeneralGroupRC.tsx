import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { Typography } from "@src/components/common/Typography";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { FC, useEffect, useRef, useState } from "react";
import { GroupAdvantageItem } from "./GroupTypeItem/GroupAdvantageItem";

interface IGeneralGroupRCProp {
  hasMls?: boolean;
}

const GeneralGroupRC: FC<IGeneralGroupRCProp> = ({ hasMls }) => {
  const [users, setUsers] = useState<any>([]);
  const [userInput, setUserInput] = useState<string>("");

  const getList = useGetMlsServer();

  const getListOfUser = (user?: string) => {
    getList.mutate(
      {
        entity: "mls_server",
        data: {
          list_filter: {
            order_by: "creation_date DESC",
            limit: 40,
            offset: 0,
            filters: [{ field: "name", operator: "like", value: user || "" }],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            console.log(result);
            setUsers(
              result?.map((user: any) => ({
                value: user?.id,
                label: user?.name,
              }))
            );
          }
        },
      }
    );
  };

  useEffect(() => {
    getListOfUser();
  }, []);

  const ref = useRef<any>();

  const loadUserByFilter = (user: string) => {
    clearTimeout(ref.current);
    setUserInput(user);
    if (userInput !== user) {
      const timeOut = setTimeout(() => {
        getListOfUser(user);
      }, 500);

      ref.current = timeOut;
    }
  };

  return (
    <div className="d-flex flex-column">
      {hasMls && (
        <RowWrappers xl={8} xxl={6} sm={12}>
          <SelectOption
            name="mls"
            options={users}
            isLoading={getList.isLoading}
            placeholder="Please Select"
            label="Select MLS"
            isClearable
            noFilter
            onInputChange={loadUserByFilter}
          />
        </RowWrappers>
      )}

      <Typography size={20} className="text-primary mt-2">
        Pre-requirement:
      </Typography>
      <Typography size={18} className="text-secondary mt-2">
        I. In order to appear in the search results, the group should have
        minimum 5 members, amongst which there should be users with type Real
        Estate Agent / Broker.
      </Typography>
      <Typography size={20} className="text-primary my-1">
        Advantage
      </Typography>
      <div className="d-flex flex-column justify-content-center align-items-start">
        <GroupAdvantageItem text="Lorem ipsum dolor sit amet" />
        <GroupAdvantageItem text="consectetur adipiscing elit" />
      </div>
    </div>
  );
};

export default GeneralGroupRC;
