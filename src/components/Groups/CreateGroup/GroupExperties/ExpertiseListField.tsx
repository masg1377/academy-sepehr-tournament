import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { useSuggestionHashtag } from "@src/core/services/api/suggestion/suggestion.api";
import { useFormikContext } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";

interface IExpertiseListFieldProp {
  name: string;
  isLocal?: boolean;
}

const ExpertiseListField: FC<IExpertiseListFieldProp> = ({ name, isLocal }) => {
  const [suggestData, setSuggestData] = useState<any>([]);
  const [inputVal, setInputVal] = useState<string>("");

  const [selected, setSelected] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setFieldValue, values } = useFormikContext<any>();
  const getHashtags = useSuggestionHashtag();
  const inputRef = useRef<any>();

  const handleClick = (item: any) => {
    if (selected.some((it: any) => it.id === item.id)) {
      const newList = selected.filter((it: any) => it.id !== item.id);
      setSelected(newList);
      setFieldValue(name, newList);
      if (isLocal) {
        // dispath(handleProfile({ key: name, value: newList }));
      }
    } else {
      const newList = [...selected, item];
      setSelected(newList);
      setFieldValue(name, newList);
      if (isLocal) {
        // dispath(handleProfile({ key: name, value: newList }));
      }
    }
  };
  const onInputChange = (val: any) => {
    clearTimeout(inputRef.current);
    let timeOut: any;
    let value = val.target.value;
    setInputVal(value);

    setFieldValue("add_hashtag", value);
    if (isLocal) {
      // dispath(handleProfile({ key: "add_hashtag", value: value }));
    }

    if (value !== inputVal) {
      value = encodeURIComponent(value);
      timeOut = setTimeout(() => {
        getHashtags.mutate(
          { hashtag_name: value, hashtag_category_type: "user_expertise" },
          {
            onSuccess: (res) => {
              if (res.data.is_success && res.data.result) {
                const result = res.data.result;
                expertiseList(result);
              }
            },
          }
        );
      }, 500);
      inputRef.current = timeOut;
    }
  };
  const expertiseList = (suggestData: any) => {
    let data: any = [];
    // values?.expertise_list_field + suggestData;
    values[name]?.forEach((it: any) => data.push(it));
    suggestData?.forEach((it: any) => data.push(it));
    const uniquedata = data.filter(
      (value: any, index: number, self: any) =>
        index === self?.findIndex((t: any) => t.id === value.id)
    );
    setSuggestData(uniquedata || []);
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const id = Math.max(...suggestData.map((m: any) => m.id)) + 1;
      const obj = { id: id, name: event.target.value, isExternal: true };
      setSuggestData((old: any) => [...old, obj]);
      setSelected((old: any) => [...old, obj]);
      setFieldValue(name, [...values[name], obj]);
      setFieldValue("add_hashtag", "");
      onInputChange({ target: { value: "" } });

      if (isLocal) {
        // dispath(handleProfile({ key: name, value: [...values[name], obj] }));
        // dispath(handleProfile({ key: "add_hashtag", value: "" }));
      }

      setInputVal("");
    }
  };

  useEffect(() => {
    getHashtags.mutate(
      { hashtag_name: "", hashtag_category_type: "user_expertise" },
      {
        onSuccess: (res) => {
          if (res.data.is_success && res.data.result) {
            const result = res.data.result;
            // console.log("result", result);
            expertiseList(result);
            setIsLoading(false);
          }
        },
      }
    );
  }, []);

  useEffect(() => {
    setSelected(values[name] || []);
  }, [values[name]]);

  return (
    <div>
      <Row>
        <Col sm={6} xs={6} md={6} xl={7}>
          {!isLoading ? (
            <div className="d-flex flex-wrap gap-1 mb-1">
              {suggestData?.map((it: any, index: number) => (
                <span
                  key={index}
                  onClick={() => handleClick(it)}
                  className={
                    selected.some((item: any) => item.id === it.id)
                      ? `borderColor-green color-darkGreen px-12 py-7 rounded ft-14 cursor-pointer `
                      : `bg-lightGreen borderColor-Lgreen color-darkGreen px-12 py-7 rounded ft-14 cursor-pointer`
                  }
                >
                  #{it.name}
                </span>
              ))}
            </div>
          ) : (
            <div className="d-flex flex-wrap gap-1 mb-1">
              <span>is Loading</span>
            </div>
          )}
          <InputText
            name="add_hashtag"
            placeholder="Add Hashtag"
            noColor
            onChange={onInputChange}
            value={inputVal}
            onKeyDown={handleKeyDown}
          />
        </Col>
      </Row>
    </div>
  );
};

export { ExpertiseListField };
