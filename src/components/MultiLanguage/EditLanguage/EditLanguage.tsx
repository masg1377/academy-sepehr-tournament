// ** React Imports
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** ReactStrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

// ** General components

// React feather
import { Plus, Search, X } from "react-feather";

// ** Import Pictures
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { ListTable } from "@src/components/common/ListTable/ListTable";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RippleButton } from "@src/components/common/ripple-button";
import {
  useEditMultiLang,
  useEditMultiLangPublished,
  useGetMultiLangDetail,
} from "@src/core/services/api/multilang/multilang.api";
import {
  TAddMultiLang,
  TEditMultiLang,
  TEditPublishMultiLang,
} from "@src/core/services/api/multilang/type";
import { FieldArray, FormikProps } from "formik";
import toast from "react-hot-toast";
import { columns } from "./data";
import ReactPaginate from "react-paginate";

const EditLanguage: FC = (): JSX.Element => {
  const { id } = useParams();
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchVal, setSearchVal] = useState<string>("");
  const [finalSearchVal, setFinalSearchVal] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  // const [selectedLookUps, setSelectedLookUps] = useState<any>([]);
  const [canEditFirst, setCanEditFirst] = useState<boolean>(true);
  const [initialValuesFist, setInitialValuesFist] = useState<any>({
    useCase: "",
    language: "",
    version: "",
    status: "",
  });
  const [initialValuesSecond, setInitialValuesSecond] = useState<any>({
    items: [],
  });

  const getDetail = useGetMultiLangDetail();

  useEffect(() => {
    getDetail.mutate(
      {
        action: "GET_ITEM",
        id: id ? +id : 0,
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const result = res.data.result;
            console.log(result);
            setInitialValuesFist({
              useCase: result?.usecase,
              language: result?.locale,
              version: result?.version,
              status: !result?.is_published
                ? { value: "draft", label: "Draft" }
                : { value: "published", label: "Published" },
            });
            setCanEditFirst(!result?.is_published);

            const translations = result?.translations;

            if (translations) {
              console.log(translations);
              // return;
              let array: any = [];

              try {
                Object.keys(translations).map((row, index) => {
                  const isField = typeof translations[row] === "string";
                  let lookupArray: any = [];
                  if (!isField) {
                    const lookUp = translations[row].lookup_values;
                    Object.keys(lookUp).map((look) => {
                      lookupArray.push({
                        property: look,
                        desc: lookUp[look],
                      });
                    });
                  }

                  // array[`${index + 1}`] = {
                  //   field: isField
                  //     ? { value: 1, label: "Field" }
                  //     : { value: 2, label: "Lookup" },
                  //   translation: isField ? row : translations[row].display_name,
                  //   propertyTitle: row,
                  //   permissions: lookupArray,
                  // };
                  array.push({
                    row_id: index,
                    field: isField
                      ? { value: 1, label: "Field" }
                      : { value: 2, label: "Lookup" },
                    translation: isField
                      ? translations[row]
                      : translations[row].display_name,
                    propertyTitle: row,
                    permissions: lookupArray,
                  });
                });
              } catch (error) {
                console.log(error);
              }

              console.log(array);
              setInitialValuesSecond({ items: array });
              // setSelectedLookUps([...array.splice(0, 4)]);
            }
          }
        },
      }
    );
  }, [refetch]);

  const editFirst = useEditMultiLangPublished();
  const editSecond = useEditMultiLang();

  const onSearch = () => {
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
      setFinalSearchVal(searchVal);
    }, 500);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    if (!values.status) {
      toast.error("Please select a status!");
    } else if (values.status === "draft")
      toast.error("Please select a published status!");
    else {
      const obj: TEditPublishMultiLang = {
        id: id ? +id : 0,
        is_published: true,
        // status: "published",
      };

      editFirst.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setRefetch((old) => !old);
            setCanEditFirst(true);
          } else toast.error(res.data.error);
        },
        onError: () => {
          toast.error("Error occurred");
        },
      });
    }
  };

  const handleSelectedLookUpPage = (page: number, allLookups: any) => {
    const local = [...allLookups];
    // console.log();
    // setSelectedLookUps(local.splice(page * 4, 4));
    setCurrentPage(page);
  };

  const handleSecondSubmit = (values: any) => {
    // console.log(values);

    const translations = values.items;
    if (translations.length > 0) {
      let obj: any = {};

      translations.forEach((it: any) => {
        if (it.field?.value !== 2 && it.propertyTitle && it.translation) {
          obj[it.propertyTitle] = it.translation;
        } else if (
          it.field?.value === 2 &&
          it.propertyTitle &&
          it.translation
        ) {
          let lookup: any = {};
          it.permissions.forEach((per: any) => {
            if (per.property && per.desc) {
              lookup[per.property] = per.desc;
            }
          });
          obj[it.propertyTitle] = {
            display_name: it.translation,
            lookup_values: lookup,
          };
        }
      });

      // console.log("obj", obj);

      const mainObj: TEditMultiLang = {
        id: id ? +id : 0,
        translations: obj,
        // is_published: false,
      };
      editSecond.mutate(mainObj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setRefetch((old) => !old);
            // setCanEditFirst(true);
          } else toast.error(res.data.error);
        },
        onError: () => {
          toast.error("Error occurred");
        },
      });
    }
  };

  return (
    <>
      <Card className="">
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom pt-1 pb-1">
          <CardTitle tag="h4" className="d-flex">
            {initialValuesFist.language || "Lang Name"}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="px-1">
            <Col xs={12}>
              <FormWrapper
                className=""
                enableReinitialize={true}
                initialValues={initialValuesFist}
                //validationSchema={}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue }: FormikProps<any>) =>
                  getDetail.isLoading ? (
                    <LoadingData />
                  ) : (
                    <Row className="py-2 pb-1">
                      <Col xs={3} className="">
                        <InputText
                          disabled
                          type="text"
                          name="useCase"
                          placeholder="Enter useCase"
                          label={"UseCase"}
                          id="useCase"
                          customeLabelClass="searchFilterLabelGeneral"
                          noColor
                          //min={"0"}
                          //max={"100"}
                          //wrapperClassName="ps-0 ms-0"
                        />
                      </Col>
                      <Col xs={3} className="">
                        <InputText
                          disabled
                          type="text"
                          name="language"
                          placeholder="Enter language"
                          label={"Language"}
                          id="language"
                          customeLabelClass="searchFilterLabelGeneral"
                          noColor
                          //min={"0"}
                          //max={"100"}
                          //wrapperClassName="ps-0 ms-0"
                        />
                      </Col>
                      <Col xs={3} className="">
                        <InputText
                          type="number"
                          name="version"
                          placeholder="Enter version"
                          label={"Version"}
                          id="version"
                          customeLabelClass="searchFilterLabelGeneral"
                          noColor
                          disabled
                          //min={"0"}
                          //max={"100"}
                          //wrapperClassName="ps-0 ms-0"
                        />
                      </Col>
                      <Col xs={3} className="">
                        <SelectOption
                          name="status"
                          placeholder="Choose status"
                          label={"Status"}
                          id="status"
                          options={[
                            { value: "draft", label: "Draft" },
                            { value: "published", label: "Published" },
                          ]}
                          //isMulti
                          isClearable
                          mergeStyle
                          disabled={!canEditFirst}
                          defaultValue={values["status"]}
                          customeLabelClass="searchFilterLabelGeneral"
                          noColor
                          //isLoading={}
                          customStyle={{
                            multiValueLabel: (base) => ({
                              ...base,
                              color: "#2e2e33 !important",
                            }),
                            multiValue: (base) => ({
                              ...base,
                              backgroundColor: "#e6e5ea",
                              color: "#2e2e33 !important",
                            }),
                            multiValueRemove: (base) => ({
                              ...base,
                              color: "#2e2e33 !important",
                            }),
                          }}
                          //wrapperClassName="mt-1 mb-0"
                        />
                      </Col>
                      <Col
                        style={{ marginTop: "24px" }}
                        xs={12}
                        className="text-start"
                      >
                        {/* <SubmitButton
                          type="button"
                          color="white"
                          className="general-size-ripple-button text-primary border-primary"
                          onClick={() => {
                            console.log("cancel");
                          }}
                        >
                          Cancel
                        </SubmitButton> */}
                        <SubmitButton
                          type="submit"
                          color="primary"
                          disabled={
                            values["status"]?.value !== "published" ||
                            !canEditFirst
                          }
                          className="general-size-ripple-button"
                          isLoading={editFirst.isLoading}
                        >
                          Save
                        </SubmitButton>
                      </Col>
                    </Row>
                  )
                }
              </FormWrapper>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="px-1">
        <FormWrapper
          className=""
          enableReinitialize={true}
          initialValues={initialValuesSecond}
          //validationSchema={}
          onSubmit={handleSecondSubmit}
        >
          {({ values, setFieldValue }: FormikProps<any>) =>
            getDetail.isLoading ? (
              <LoadingData />
            ) : (
              <CardBody>
                <Row className="">
                  <Col xs={12}>
                    <Row>
                      <Col
                        xs={5}
                        className="d-flex flex-row justify-content-center align-items-center"
                      >
                        <div className="flex-grow-1">
                          <InputText
                            type="text"
                            name="search"
                            placeholder="search ..."
                            //label={""}
                            id="search"
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            customeLabelClass="searchFilterLabelGeneral"
                            noColor
                          />
                        </div>

                        <RippleButton
                          className="ms-2"
                          color="primary"
                          onClick={onSearch}
                        >
                          <Search size={15} />
                          <span className="align-middle ms-50">{"Search"}</span>
                        </RippleButton>
                      </Col>
                      <Col
                        xs={7}
                        className="d-flex flex-row justify-content-end align-items-center"
                      >
                        <SubmitButton
                          className="ms-2"
                          color="primary"
                          type="button"
                          disabled={!canEditFirst}
                          onClick={() => {
                            const oldArr = values.items
                              ? [...values.items]
                              : [];
                            oldArr.push({
                              row_id:
                                values.items && values.items.length > 0
                                  ? Math.max(
                                      ...values.items?.map((o: any) => o.row_id)
                                    ) + 1
                                  : 0,
                              field: { value: 1, label: "Field" },
                              translation: "",
                              propertyTitle: "",
                              permissions: [],
                            });
                            setFieldValue(`items`, oldArr);
                            setCurrentPage(
                              Math.floor(values.items?.length / 4)
                            );
                          }}
                        >
                          <Plus size={15} />
                          <span className="align-middle ms-50">
                            {"Add item"}
                          </span>
                        </SubmitButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="px-1 mt-3">
                  <Col xs={12}>
                    <Row style={{ borderRadius: "10px" }} className=" border">
                      <Col
                        style={{
                          backgroundColor: "#f2f2f2",
                          height: "50px",
                          width: "100%",
                          //border: "1px solid red",
                        }}
                        xs={12}
                        className=""
                      >
                        <Row
                          style={{
                            //backgroundColor: "yellow",
                            width: "100%",
                            height: "100%",
                          }}
                          className="d-flex align-items-center m-0"
                        >
                          <Col
                            className="ps-0"
                            style={{ color: "#2e2e33", fontWeight: 700 }}
                            xs={4}
                          >
                            <span className="me-1">#</span>Standard name
                          </Col>
                          <Col
                            style={{ color: "#2e2e33", fontWeight: 700 }}
                            xs={5}
                          >
                            Translation
                          </Col>
                          <Col
                            style={{ color: "#2e2e33", fontWeight: 700 }}
                            xs={3}
                          >
                            attribute type
                          </Col>
                        </Row>
                      </Col>

                      {/* <FieldArray
                        name="items"
                        render={(arrayHelpers) => } />
                     */}

                      {searchLoading ? (
                        <LoadingData wrapperStyle="mb-5 pb-2 pt-2" />
                      ) : (
                        <>
                          <FieldArray
                            name="items"
                            render={(arrayHelpers) => (
                              <>
                                {values.items?.length > 0 ? (
                                  values.items
                                    ?.filter((f: any) =>
                                      f.propertyTitle
                                        ?.toLowerCase()
                                        .includes(finalSearchVal.toLowerCase())
                                    )
                                    ?.map((item: any, index: number) => {
                                      if (
                                        index >= currentPage * 4 &&
                                        index < currentPage * 4 + 4
                                      ) {
                                        return (
                                          <Row
                                            key={index}
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              borderBottom: "1px solid #f2f2f2",
                                            }}
                                            className="d-flex align-items-center py-2 me-0 m-0"
                                          >
                                            <Col
                                              className="d-flex flex-row align-items-center justify-content-start ps-0"
                                              style={{
                                                color: "#2e2e33",
                                                fontWeight: 700,
                                              }}
                                              xs={4}
                                            >
                                              <span className="me-1">
                                                {item.row_id + 1}
                                              </span>
                                              <div className="d-inline w-100">
                                                <InputText
                                                  type="text"
                                                  name={`items[${item.row_id}].propertyTitle`}
                                                  placeholder="Property title"
                                                  id={`items[${item.row_id}].propertyTitle`}
                                                  customeLabelClass="searchFilterLabelGeneral"
                                                  noColor
                                                />
                                              </div>
                                            </Col>
                                            <Col
                                              style={{
                                                color: "#2e2e33",
                                                fontWeight: 700,
                                              }}
                                              xs={5}
                                            >
                                              <InputText
                                                type="text"
                                                name={`items[${item.row_id}].translation`}
                                                placeholder="Please write the translation"
                                                id={`items[${item.row_id}].translation`}
                                                customeLabelClass="searchFilterLabelGeneral"
                                                //noColor
                                              />
                                            </Col>
                                            <Col
                                              style={{
                                                color: "#2e2e33",
                                                // display: "flex",
                                              }}
                                              xs={3}
                                            >
                                              <SelectOption
                                                name={`items[${item.row_id}].field`}
                                                placeholder="Select Field"
                                                wrapperClassName="d-inline-block me-1"
                                                wrapperStyle={{ width: "80%" }}
                                                id={`items[${item.row_id}].field`}
                                                options={[
                                                  {
                                                    value: 1,
                                                    label: "Field",
                                                  },
                                                  {
                                                    value: 2,
                                                    label: "Lookup",
                                                  },
                                                ]}
                                                //isMulti
                                                isClearable
                                                mergeStyle
                                                customeLabelClass="searchFilterLabelGeneral"
                                                noColor
                                                //isLoading={}
                                                customStyle={{
                                                  multiValueLabel: (base) => ({
                                                    ...base,
                                                    color: "#2e2e33 !important",
                                                  }),
                                                  multiValue: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#e6e5ea",
                                                    color: "#2e2e33 !important",
                                                  }),
                                                  multiValueRemove: (base) => ({
                                                    ...base,
                                                    color: "#2e2e33 !important",
                                                  }),
                                                }}
                                                //wrapperClassName="mt-1 mb-0"
                                              />
                                              {canEditFirst && (
                                                <X
                                                  size={18}
                                                  className="cursor-pointer d-inline"
                                                  onClick={() =>
                                                    arrayHelpers.remove(index)
                                                  }
                                                />
                                              )}
                                            </Col>
                                            {item.field?.value === 2 && (
                                              <Col
                                                xs={12}
                                                className="px-2 pe-1 mt-2 rounded-md overflow-hidden"
                                              >
                                                <CardBody
                                                  style={{
                                                    borderRadius: "5px",
                                                    overflow: "hidden",
                                                  }}
                                                  className="p-0 rounded"
                                                >
                                                  <Table
                                                    responsive="xs"
                                                    bordered
                                                    className="overflow-visible"
                                                    size="sm"
                                                  >
                                                    <thead>
                                                      <tr>
                                                        <th>Value</th>
                                                        <th>Translation</th>
                                                        <th></th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <FieldArray
                                                        name={`items[${item.row_id}].permissions`}
                                                        render={(
                                                          arrayHelpers
                                                        ) => (
                                                          <>
                                                            {item.permissions &&
                                                            item.permissions
                                                              .length > 0
                                                              ? item.permissions.map(
                                                                  (
                                                                    comp: any,
                                                                    index2: number
                                                                  ) => (
                                                                    <tr
                                                                      key={
                                                                        "second-" +
                                                                        index2
                                                                      }
                                                                    >
                                                                      <td>
                                                                        <InputText
                                                                          name={`items[${item.row_id}].permissions[${index2}].property`}
                                                                          placeholder="Property title"
                                                                          noColor
                                                                          size={
                                                                            30
                                                                          }
                                                                          bsSize="sm"
                                                                          noErrorMessage
                                                                        />
                                                                      </td>
                                                                      <td>
                                                                        <InputText
                                                                          name={`items[${item.row_id}].permissions[${index2}].desc`}
                                                                          placeholder="Please write the translation"
                                                                          noColor
                                                                          size={
                                                                            30
                                                                          }
                                                                          bsSize="sm"
                                                                          noErrorMessage
                                                                        />
                                                                      </td>
                                                                      <td
                                                                        onClick={() =>
                                                                          arrayHelpers.remove(
                                                                            index2
                                                                          )
                                                                        }
                                                                      >
                                                                        {canEditFirst && (
                                                                          <X
                                                                            size={
                                                                              18
                                                                            }
                                                                            className="cursor-pointer"
                                                                          />
                                                                        )}
                                                                      </td>
                                                                    </tr>
                                                                  )
                                                                )
                                                              : null}
                                                          </>
                                                        )}
                                                      />
                                                    </tbody>
                                                  </Table>
                                                  <SubmitButton
                                                    className="rounded-0 text-gray2 fs-6"
                                                    outline
                                                    color="light"
                                                    block
                                                    type="button"
                                                    onClick={() => {
                                                      // console.log(
                                                      //   values.items[index].permissions
                                                      // );
                                                      const oldArr = values
                                                        .items[index]
                                                        ?.permissions
                                                        ? [
                                                            ...values.items[
                                                              index
                                                            ]?.permissions,
                                                          ]
                                                        : [];
                                                      oldArr.push({
                                                        property: "",
                                                        desc: "",
                                                      });
                                                      setFieldValue(
                                                        `items[${index}].permissions`,
                                                        oldArr
                                                      );
                                                    }}
                                                  >
                                                    + Add Item
                                                  </SubmitButton>
                                                </CardBody>
                                              </Col>
                                            )}
                                          </Row>
                                        );
                                      } else return null;
                                    })
                                ) : (
                                  <p style={{ textAlign: "center" }}>
                                    <b className="mt-1 d-block">
                                      No data to show!
                                    </b>
                                  </p>
                                )}
                              </>
                            )}
                          />

                          {values.items?.length > 0 && (
                            <ReactPaginate
                              previousLabel=""
                              nextLabel=""
                              forcePage={currentPage}
                              onPageChange={(page) =>
                                handleSelectedLookUpPage(
                                  page.selected,
                                  values["items"]
                                )
                              }
                              pageCount={
                                Math.ceil(
                                  values["items"]?.filter((f: any) =>
                                    f.propertyTitle
                                      ?.toLowerCase()
                                      .includes(finalSearchVal.toLowerCase())
                                  ).length / 4
                                ) || 1
                              }
                              breakLabel="..."
                              pageRangeDisplayed={2}
                              marginPagesDisplayed={2}
                              activeClassName="active"
                              pageClassName="page-item"
                              breakClassName="page-item"
                              nextLinkClassName="page-link rounded-circle"
                              pageLinkClassName="page-link"
                              breakLinkClassName="page-link"
                              previousLinkClassName="page-link rounded-circle"
                              nextClassName="page-item next-item"
                              previousClassName="page-item prev-item"
                              containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
                            />
                          )}
                        </>
                      )}
                    </Row>
                  </Col>
                  <Col
                    style={{ marginTop: "24px" }}
                    xs={12}
                    className="text-start"
                  >
                    <SubmitButton
                      type="submit"
                      color="primary"
                      isLoading={editSecond.isLoading}
                      disabled={editSecond.isLoading || !canEditFirst}
                      className="general-size-ripple-button"
                    >
                      Save
                    </SubmitButton>
                  </Col>
                </Row>
              </CardBody>
            )
          }
        </FormWrapper>
      </Card>
    </>
  );
};

export { EditLanguage };
