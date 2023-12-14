import React, {
  FC,
  useEffect,
  useState,
  useDeferredValue,
  useRef,
} from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { RippleButton } from "@src/components/common/ripple-button";

import Styled from "./ButtonSelect.module.scss";
import { Input } from "reactstrap";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { useFormikContext } from "formik";
import { useOutsideSelector } from "@src/core/utils/Utils";

interface IButtonSelectProp {
  name: string;
}

const ButtonSelect: FC<IButtonSelectProp> = ({ name }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  //   const [selectedVal, setSelectedVal] = useState<any>();
  const [data, setData] = useState<any>([]);

  const { values, setFieldValue } = useFormikContext<any>();

  const selectedVal = values[name];

  const wrapperRef = useRef<any>();

  useOutsideSelector(wrapperRef, () => setIsOpen(false));

  const getList = useGetListOfEntity();

  const loadData = (user: string) => {
    getList.mutate(
      {
        entity: "staffs",
        data: {
          list_filter: {
            order_by: "creation_date DESC",
            limit: 20,
            offset: 0,
            filters: [
              { field: "first_name", operator: "like", value: user },
              "or",
              { field: "last_name", operator: "like", value: user },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];

            setData(result);
            // res.data.result_count && setTotalCount(res.data.result_count);
          } else setData([]);
        },
        onError: (err: any) => {
          setData([]);
          //   setHasMore(false);
        },
      }
    );
  };

  useEffect(() => {
    // if (isOpen) {
    loadData(searchValue);
    // }
  }, []);

  const searchRef = useRef<any>();

  const onSearchVal = (val: string) => {
    clearTimeout(searchRef.current);
    setSearchValue(val);
    const timeOut = setTimeout(() => {
      loadData(val);
    }, 500);

    searchRef.current = timeOut;
  };

  return (
    <div ref={wrapperRef}>
      <RippleButton
        color="light"
        size="sm"
        className="text-secondary me-1"
        onClick={() => setIsOpen((old) => !old)}
      >
        {selectedVal && (selectedVal?.first_name || selectedVal?.last_name)
          ? selectedVal?.first_name + " " + selectedVal?.last_name
          : "Not Set"}
        {isOpen ? (
          <ChevronUp size={15} color="#68686b" className="ms-1" />
        ) : (
          <ChevronDown size={15} color="#68686b" className="ms-1" />
        )}
      </RippleButton>

      {isOpen && (
        <div
          className={`position-absolute bottom-0 ${Styled["select-wrapper"]}`}
        >
          <Input
            type="text"
            //@ts-ignore
            bsSize="md"
            placeholder="Search"
            id="search-input"
            // style={{ height: 40 }}
            value={searchValue}
            onChange={(e) => onSearchVal(e.target.value)}
          />

          <div className={`overflow-auto ${Styled["select-item-wrapper"]}`}>
            {getList.isLoading ? (
              <LoadingData wrapperStyle="py-2 my-2" />
            ) : data?.length ? (
              data?.map((item: any) => (
                <div
                  key={item.id}
                  className={`text-truncate ${Styled["select-item"]} ${
                    selectedVal?.id === item?.id
                      ? Styled["select-item-selected"]
                      : ""
                  }`}
                  onClick={() => {
                    if (selectedVal?.id !== item?.id) setFieldValue(name, item);
                    else setFieldValue(name, null);
                    setIsOpen(false);
                  }}
                >
                  {item?.first_name} {item?.last_name}
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>
                <b className="mt-3 pt-1 d-block">No data to show!</b>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { ButtonSelect };
