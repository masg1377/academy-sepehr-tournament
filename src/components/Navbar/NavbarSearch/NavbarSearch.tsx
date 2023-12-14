// ** React Imports
import { FC, useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import * as Icon from "react-feather";

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { handleSearchQuery } from "@store/navbar";

// ** Custom Components
import { Autocomplete } from "@src/components/common/autocomplete";

const NavbarSearch: FC = (): JSX.Element => {
  // ** Store Vars
  const dispatch = useDispatch();

  // ** States
  const [suggestions, setSuggestions] = useState<any>([]);
  const [navbarSearch, setNavbarSearch] = useState<boolean>(false);

  // ** ComponentDidMount
  // useEffect(() => {
  //   axios.get("/api/main-search/data").then(({ data }) => {
  //     setSuggestions(data.searchArr);
  //   });
  // }, []);

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(""));

  // ** Function to handle external Input click
  const handleExternalClick = (): void => {
    if (navbarSearch === true) {
      setNavbarSearch(false);
      handleClearQueryInStore();
    }
  };

  // ** Function to clear input value
  const handleClearInput = (setUserInput: (val: string) => void): void => {
    if (!navbarSearch) {
      setUserInput("");
      handleClearQueryInStore();
    }
  };

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = (e: any): void => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setNavbarSearch(false);
        handleClearQueryInStore();
      }, 1);
    }
  };

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = (): void => {
    setNavbarSearch(false);
    handleClearQueryInStore();
  };

  // ** Function to handle search list Click
  const handleListItemClick = (func: any, link: string, e: any): void => {
    func(link, e);
    setTimeout(() => {
      setNavbarSearch(false);
    }, 1);
    handleClearQueryInStore();
  };

  return (
    <NavItem className="nav-search" onClick={() => setNavbarSearch(true)}>
      <NavLink className="nav-link-search">
        <Icon.Search className="ficon" />
      </NavLink>
      <div
        className={classnames("search-input", {
          open: navbarSearch === true,
        })}
      >
        <div className="search-input-icon">
          <Icon.Search />
        </div>
        {navbarSearch ? (
          <Autocomplete
            className="form-control"
            suggestions={suggestions}
            filterKey="title"
            filterHeaderKey="groupTitle"
            grouped={true}
            placeholder="Search..."
            autoFocus={true}
            onSuggestionClick={handleSuggestionItemClick}
            externalClick={handleExternalClick}
            clearInput={(userInput, setUserInput) =>
              handleClearInput(setUserInput)
            }
            onKeyDown={onKeyDown}
            onChange={(e) => dispatch(handleSearchQuery(e.target.value))}
            customRender={(
              item: any,
              i: any,
              filteredData: any,
              activeSuggestion: any,
              onSuggestionItemClick: any,
              onSuggestionItemHover: any
            ) => {
              //@ts-ignore
              const IconTag = Icon[item.icon ? item.icon : "X"];
              return (
                <li
                  className={classnames("suggestion-item", {
                    active: filteredData.indexOf(item) === activeSuggestion,
                  })}
                  key={i}
                  onClick={(e) =>
                    handleListItemClick(onSuggestionItemClick, item.link, e)
                  }
                  onMouseEnter={() =>
                    onSuggestionItemHover(filteredData.indexOf(item))
                  }
                >
                  <div
                    className={classnames({
                      "d-flex justify-content-between align-items-center":
                        item.file || item.img,
                    })}
                  >
                    <div className="item-container d-flex">
                      {item.icon ? (
                        <IconTag size={17} />
                      ) : item.file ? (
                        <img
                          src={item.file}
                          height="36"
                          width="28"
                          alt={item.title}
                        />
                      ) : item.img ? (
                        <img
                          className="rounded-circle mt-25"
                          src={item.img}
                          height="28"
                          width="28"
                          alt={item.title}
                        />
                      ) : null}
                      <div className="item-info ms-1">
                        <p className="align-middle mb-0">{item.title}</p>
                        {item.by || item.email ? (
                          <small className="text-muted">
                            {item.by ? item.by : item.email ? item.email : null}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    {item.size || item.date ? (
                      <div className="meta-container">
                        <small className="text-muted">
                          {item.size ? item.size : item.date ? item.date : null}
                        </small>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            }}
          />
        ) : null}
        <div className="search-input-close">
          <Icon.X
            className="ficon"
            onClick={(e) => {
              e.stopPropagation();
              setNavbarSearch(false);
              handleClearQueryInStore();
            }}
          />
        </div>
      </div>
    </NavItem>
  );
};

export { NavbarSearch };
