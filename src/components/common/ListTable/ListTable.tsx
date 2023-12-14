import React, {
  ChangeEvent,
  FC,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  RefreshCw,
  Search,
  List,
} from "react-feather";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Spinner,
  Badge,
} from "reactstrap";
import { RippleButton } from "../ripple-button";
import InfiniteScroll from "react-infinite-scroll-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { ComponentSpinner } from "../spinner/Loading-spinner";
import classNames from "classnames";
import { LoadingData } from "../LoadingData/LoadingData";

interface IListTableProp {
  data: any;
  headerTitle?: string | JSX.Element;
  columns: any;
  addBtnText?: string;
  onAddBtn?: () => void;
  noSearch?: boolean;
  noHeader?: boolean;
  noReload?: boolean;
  rounded?: boolean;
  customStyle?: TableStyles;
  isLoading?: boolean;
  onReload?: () => void;
  loadFunc?: any;
  hasMore?: boolean;
  handleFilter?: (val: string) => void;
  handleFullFilter?: any;
  selectebaleRows?: boolean;
  noShadow?: boolean;
  fullSearch?: boolean;
  fullSearchComponent?: any;
  onDoubleClick?: (data: any) => void;
  filterListShow?: boolean;
  noInfinite?: boolean;
  paginationCustomItem?: JSX.Element;
  setSearchvalueData?: any;
  limit?: number;
  setLimit?: any;
  activeFullSearch?: boolean;
  expandableRows?: boolean;
  ExpandedComponent?: any;
  yayShowHide?: boolean;
  handleShowMore?: () => void;
  showMore?: boolean;
  showMoreLoading?: boolean;
  totalCount?: number;
}

const ListTable: FC<IListTableProp> = ({
  data,
  headerTitle,
  columns,
  addBtnText,
  onAddBtn,
  noHeader,
  noSearch,
  noReload,
  rounded = true,
  customStyle,
  isLoading,
  onReload,
  loadFunc,
  hasMore = false,
  handleFilter,
  handleFullFilter,
  selectebaleRows,
  noShadow,
  fullSearch,
  fullSearchComponent: FullSearchComponent,
  onDoubleClick,
  filterListShow,
  noInfinite,
  paginationCustomItem,
  setSearchvalueData,
  limit,
  setLimit,
  activeFullSearch,
  expandableRows,
  ExpandedComponent,
  yayShowHide,
  handleShowMore,
  showMore,
  showMoreLoading,
  totalCount,
}): JSX.Element => {
  // const [row, setRow] = useState([]);
  const [entryInput, setEntryInput] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [paginationPerPage, setPaginationPerPage] = useState<number>(10);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [searchItemCounter, setSearchItemCounter] = useState<number>(0);
  const [filterShowFlag, setFilterShowFlag] = useState<boolean>(false);
  const [filterIconFlag, setFilterIconFlag] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpen((old) => !old);
  };

  // useEffect(() => {
  //   setRow(data);
  //   //console.log(data);
  // }, [data]);
  //console.log(row);

  const row = useMemo(() => [...data], [data]);

  // ** Function to handle Modal toggle

  // ** Function to handle filter
  // const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   let updatedData = [];
  //   setSearchValue(value);

  //   const status: any = {
  //     1: { title: "Current", color: "light-primary" },
  //     2: { title: "Professional", color: "light-success" },
  //     3: { title: "Rejected", color: "light-danger" },
  //     4: { title: "Resigned", color: "light-warning" },
  //     5: { title: "Applied", color: "light-info" },
  //   };

  //   if (value.length) {
  //     updatedData = data.filter((item: any) => {
  //       const startsWith =
  //         (item.full_name &&
  //           item.full_name.toLowerCase().startsWith(value.toLowerCase())) ||
  //         (item.post &&
  //           item.post.toLowerCase().startsWith(value.toLowerCase())) ||
  //         (item.email &&
  //           item.email.toLowerCase().startsWith(value.toLowerCase())) ||
  //         (item.age &&
  //           item.age.toLowerCase().startsWith(value.toLowerCase())) ||
  //         (item.salary &&
  //           item.salary.toLowerCase().startsWith(value.toLowerCase())) ||
  //         (item.start_date &&
  //           item.start_date.toLowerCase().startsWith(value.toLowerCase())) ||
  //         (item.status &&
  //           status[item.status].title
  //             .toLowerCase()
  //             .startsWith(value.toLowerCase()));

  //       const includes =
  //         (item.full_name &&
  //           item.full_name.toLowerCase().includes(value.toLowerCase())) ||
  //         (item.post &&
  //           item.post.toLowerCase().includes(value.toLowerCase())) ||
  //         (item.email &&
  //           item.email.toLowerCase().includes(value.toLowerCase())) ||
  //         (item.age && item.age.toLowerCase().includes(value.toLowerCase())) ||
  //         (item.salary &&
  //           item.salary.toLowerCase().includes(value.toLowerCase())) ||
  //         (item.start_date &&
  //           item.start_date.toLowerCase().includes(value.toLowerCase())) ||
  //         (item.status &&
  //           status[item.status].title
  //             .toLowerCase()
  //             .includes(value.toLowerCase()));

  //       if (startsWith) {
  //         return startsWith;
  //       } else if (!startsWith && includes) {
  //         return includes;
  //       } else return null;
  //     });
  //     setFilteredData(updatedData);
  //     setSearchValue(value);
  //   }
  // };

  // ** Function to handle Pagination
  const handlePagination = (page: any) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination: FC<any> = (props) => (
    <div
      className={
        "d-flex justify-content-between align-items-center" +
        (props.noPagination ? " mt-1" : "")
      }
    >
      {paginationCustomItem}
      {!props.noPagination && (
        <ReactPaginate
          previousLabel=""
          nextLabel=""
          forcePage={currentPage}
          onPageChange={(page) => handlePagination(page)}
          pageCount={
            searchValue.length
              ? Math.ceil(filteredData.length / paginationPerPage)
              : Math.ceil(row.length / paginationPerPage) || 1
          }
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName="active"
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          previousClassName="page-item prev-item"
          containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        />
      )}
    </div>
  );

  // ** Downloads CSV

  const conditionalRowStyles = [
    {
      when: (row: any) => row.toggleSelected,
      style: {
        backgroundColor: "rgba(49, 75, 201, 0.1)",
        userSelect: "none",
      },
    },
  ];

  const onRowDoubleClicked = (values: any) => {
    onDoubleClick && onDoubleClick(values);

    const updateRow: any = row.map((o: any) => {
      if (o.id !== values.id) {
        return o;
      }
      return {
        ...values,
        toggleSelected: !values.toggleSelected,
      };
    });
    // row = updateRow;
  };

  const entryRef = useRef<any>(null);

  const onEntryChange = (e: any) => {
    clearTimeout(entryRef.current);
    setEntryInput(e.target.value);
    if (e.target.value >= 5) {
      const timeOut = setTimeout(() => {
        setLimit(+e.target.value);
      }, 1000);
      entryRef.current = timeOut;
    } else if (e.target.value < 5) {
      const timeOut = setTimeout(() => {
        if (e.target.value >= 5) {
          setLimit(e.target.value);
        } else if (e.target.value < 5) {
          setLimit(5);
          setEntryInput(5);
        }
      }, 1500);
      entryRef.current = timeOut;
    }
  };

  return (
    <Card
      className={classNames(
        !rounded ? "" : "overflow-hidden",
        noShadow ? "shadow-none" : ""
      )}
    >
      {!noHeader && (
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom pt-1 pb-1">
          {headerTitle && (
            <CardTitle tag="h4" className="d-flex">
              {headerTitle} ({totalCount ? totalCount : row.length})
            </CardTitle>
          )}
          <div className="d-flex mt-md-0 mt-1">
            {!noReload && (
              <RippleButton
                color="light"
                className="ps-1 pe-1"
                onClick={onReload}
              >
                <RefreshCw size={16} color="#68686b" />
              </RippleButton>
            )}
            {addBtnText && (
              <RippleButton className="ms-2" color="primary" onClick={onAddBtn}>
                <Plus size={15} />
                <span className="align-middle ms-50">{addBtnText}</span>
              </RippleButton>
            )}
          </div>
        </CardHeader>
      )}
      {!fullSearch && !noSearch && (
        <Row className="justify-content-between mx-0 align-items-center ">
          <Col
            className="d-flex align-items-center justify-content-start "
            sm="6"
          >
            {/* <div className="d-flex align-items-center">
              <span className="fs-6 text-black d-block me-1">Show </span>
              <Input
                type="number"
                bsSize="sm"
                style={{ width: 50 }}
                value={paginationPerPage}
                onChange={(e) => setPaginationPerPage(+e.target.value)}
              />
              <span className="fs-6 text-black d-block ms-1">enteries</span>
            </div> */}
          </Col>
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="3"
            sm="3"
          >
            <InputGroup className="input-group-merge mb-2">
              <Input
                type="text"
                bsSize="sm"
                placeholder="Search ..."
                id="search-input"
                value={searchValue}
                onChange={
                  handleFilter
                    ? (val) => {
                        setSearchValue(val.target.value);
                        handleFilter(val.target.value);
                      }
                    : (val) => {
                        setSearchValue(val.target.value);
                      }
                }
              />
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
            </InputGroup>
          </Col>
        </Row>
      )}
      {fullSearch && !noSearch && (
        <Row className="justify-content-between mx-0 align-items-center ">
          <Col
            className="d-flex align-items-center justify-content-start my-1"
            md="3"
            sm="3"
          >
            <RippleButton
              color="primary"
              className="px-1 d-flex general-size-ripple-button"
              onClick={() => {
                setFilterIconFlag(!filterIconFlag);
                setFilterShowFlag(!filterShowFlag);
              }}
            >
              Filters
              <Badge
                color="light"
                className="text-primary rounded-circle fs-99 padding-badge-small ms-badge-small me-1 badge-custome-size"
              >
                {searchItemCounter}
              </Badge>
              {!filterIconFlag ? (
                <ChevronUp className="ms-auto" size={16} />
              ) : (
                <ChevronDown className="ms-auto" size={16} />
              )}
            </RippleButton>
            {filterListShow && filterShowFlag && (
              <RippleButton
                color="light"
                className="ps-1 pe-1 ms-1"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <List size={16} color="#68686b" />
              </RippleButton>
            )}
          </Col>
          <Col
            className="d-flex align-items-center justify-content-end "
            sm="6"
          >
            <div className="d-flex align-items-center">
              <span className="fs-6 text-black d-block me-1">Show </span>
              {/* <Input
                type="number"
                bsSize="sm"
                style={{ width: 50 }}
                value={paginationPerPage}
                onChange={(e) => setPaginationPerPage(+e.target.value)}
              />*/}
              <Input
                type="number"
                bsSize="sm"
                style={{ width: 50 }}
                value={entryInput}
                onChange={(e) => onEntryChange(e)}
              />
              <span className="fs-6 text-black d-block ms-1">enteries</span>
            </div>
          </Col>
        </Row>
      )}
      {activeFullSearch && (
        <div
          className="p-0 m-0"
          style={{
            height: `${!filterIconFlag ? "0" : "unset"}`,
            overflow: `${!filterIconFlag ? "hidden" : "unset"}`,
            opacity: `${!filterIconFlag ? "0" : "unset"}`,
            visibility: `${!filterIconFlag ? "hidden" : "unset"}`,
          }}
        >
          <FullSearchComponent
            setSearchItemCounter={setSearchItemCounter}
            handleModalShow={isOpen}
            setModalToggle={handleModal}
            setSearchvalueData={setSearchvalueData}
            handleFullFilter={handleFullFilter}
            setFilterIconFlag={setFilterIconFlag}
            setFilterShowFlag={setFilterShowFlag}
            filterShowFlag={filterShowFlag}
          />
        </div>
      )}

      <div
        className={classNames(
          "react-dataTable",
          selectebaleRows && "react-dataTable-selectable-rows"
        )}
      >
        {isLoading ? (
          <LoadingData />
        ) : noInfinite ? (
          <>
            <DataTable
              noHeader
              pagination={data && data.length > paginationPerPage}
              responsive
              columns={columns}
              paginationPerPage={paginationPerPage}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              paginationDefaultPage={currentPage + 1}
              selectableRows={selectebaleRows}
              {...(selectebaleRows
                ? { selectableRowsComponent: BootstrapCheckbox }
                : {})}
              data={row}
              customStyles={customStyle}
              onRowDoubleClicked={
                onDoubleClick ? onRowDoubleClicked : undefined
              }
              conditionalRowStyles={conditionalRowStyles}
              expandableRows={expandableRows}
              expandableRowsComponent={ExpandedComponent}
            />
            {showMore && (
              <Row className="w-100">
                {!showMoreLoading && (
                  <Col
                    onClick={handleShowMore}
                    className="p-1 text-center cursor-pointer text-primary fs-5"
                    xs={12}
                    style={{ fontWeight: "700" }}
                  >
                    Show More
                  </Col>
                )}

                {showMoreLoading && (
                  <LoadingData hideLabel wrapperStyle="p-0 mb-2 mt-1" />
                )}
              </Row>
            )}
            {data.length <= paginationPerPage && (
              <CustomPagination noPagination />
            )}
          </>
        ) : (
          <InfiniteScroll
            dataLength={row.length} //This is important field to render the next data
            next={loadFunc}
            style={{ minHeight: 180 }}
            hasMore={hasMore}
            loader={<LoadingData />}
            endMessage={
              !yayShowHide ? (
                <p style={{ textAlign: "center" }}>
                  {row && row.length > 0 && (
                    <b className="mt-1 d-block">Yay! You have seen it all</b>
                  )}
                </p>
              ) : (
                <></>
              )
            }
          >
            <DataTable
              noHeader
              // pagination={data && data.length > paginationPerPage}

              responsive
              columns={columns}
              // paginationPerPage={paginationPerPage}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              // paginationComponent={CustomPagination}
              // paginationDefaultPage={currentPage + 1}
              selectableRows={selectebaleRows}
              {...(selectebaleRows
                ? { selectableRowsComponent: BootstrapCheckbox }
                : {})}
              data={row}
              customStyles={customStyle}
              onRowDoubleClicked={
                onDoubleClick ? onRowDoubleClicked : undefined
              }
              conditionalRowStyles={conditionalRowStyles}
              expandableRows={expandableRows}
              expandableRowsComponent={ExpandedComponent}
            />
            {showMore && (
              <Row className="w-100">
                {!showMoreLoading && (
                  <Col
                    onClick={handleShowMore}
                    className="p-1 text-center cursor-pointer text-primary fs-5"
                    xs={12}
                    style={{ fontWeight: "700" }}
                  >
                    Show More
                  </Col>
                )}

                {showMoreLoading && (
                  <LoadingData hideLabel wrapperStyle="p-0 mb-2 mt-1" />
                )}
              </Row>
            )}
          </InfiniteScroll>
        )}
      </div>
    </Card>
  );
};

const BootstrapCheckbox: any = forwardRef((props, ref: any) => (
  <div className="form-check pe-0">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

export { ListTable };
