// ** React Imports
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState, useRef, FC } from "react";

// ** Third Party Components
import PropTypes from "prop-types";
import classnames from "classnames";
import { AlertCircle } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Hooks Imports
import { useOnClickOutside } from "@src/core/hooks/useOnClickOutside";

// ** Styles Imports
import "@styles/base/bootstrap-extended/_include.scss";
import "./autocomplete.scss";

interface IAutocompleteProp {
  value?: string;
  filterKey: string;
  onSuggestionClick?: (url: string | undefined | null, e: any) => void;
  onKeyDown?: (e: any, input?: string) => void;
  customRender?: any;
  suggestionLimit?: number;
  suggestions?: any[];
  filterHeaderKey?: number | string;
  grouped?: any;
  defaultSuggestions?: any;
  clearInput?: (txt: string, func: any) => void;
  onSuggestionsShown?: (txt: string) => void;
  externalClick?: () => void;
  wrapperClass?: string;
  onChange?: (e: any) => void;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onBlur?: (e: any) => void;
}

const Autocomplete: FC<IAutocompleteProp> = ({
  value,
  filterKey,
  onSuggestionClick,
  onKeyDown,
  customRender,
  suggestionLimit,
  suggestions,
  filterHeaderKey,
  grouped,
  defaultSuggestions,
  clearInput,
  onSuggestionsShown,
  externalClick,
  wrapperClass,
  onChange,
  className,
  placeholder,
  autoFocus,
  onBlur,
}): JSX.Element => {
  // ** Refs
  const container = useRef(null);
  const inputElRef = useRef(null);
  const suggestionsListRef = useRef(null);

  // ** States
  const [focused, setFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState(value ? value : "");

  // ** Vars
  const navigate = useNavigate();
  let filteredData: any = [];

  // ** Suggestion Item Click Event
  const onSuggestionItemClick = (
    url: string | undefined | null,
    e: any
  ): void => {
    setActiveSuggestion(0);
    setShowSuggestions(false);
    setUserInput(filteredData[activeSuggestion][filterKey]);
    if (url !== undefined && url !== null) {
      navigate(url);
    }

    if (onSuggestionClick) {
      onSuggestionClick(url, e);
    }
  };

  // ** Suggestion Hover Event
  const onSuggestionItemHover = (index: number): void => {
    setActiveSuggestion(index);
  };

  // ** Input On Change Event
  const onChangeFunc = (e: any): void => {
    const userInput = e.currentTarget.value;
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserInput(userInput);
    if (e.target.value < 1) {
      setShowSuggestions(false);
    }
  };

  // ** Input Click Event
  const onInputClick = (e: any): void => {
    e.stopPropagation();
  };

  // ** Input's Keydown Event
  const onKeyDownFunc = (e: any) => {
    const filterKeyLocal = filterKey;
    const suggestionList: any = ReactDOM.findDOMNode(
      suggestionsListRef.current
    );

    // ** User pressed the up arrow
    if (e.keyCode === 38 && activeSuggestion !== 0) {
      setActiveSuggestion(activeSuggestion - 1);

      if (
        e.target.value.length > -1 &&
        suggestionList !== null &&
        activeSuggestion <= filteredData.length / 2
      ) {
        suggestionList.scrollTop = 0;
      }
    } else if (e.keyCode === 40 && activeSuggestion < filteredData.length - 1) {
      // ** User pressed the down arrow
      setActiveSuggestion(activeSuggestion + 1);

      if (
        e.target.value.length > -1 &&
        suggestionList !== null &&
        activeSuggestion >= filteredData.length / 2
      ) {
        suggestionList.scrollTop = suggestionList.scrollHeight;
      }
    } else if (e.keyCode === 27) {
      // ** User Pressed ESC
      setShowSuggestions(false);
      setUserInput("");
    } else if (e.keyCode === 13 && showSuggestions) {
      // ** User Pressed ENTER
      onSuggestionItemClick(filteredData[activeSuggestion].link, e);
      setUserInput(filteredData[activeSuggestion][filterKeyLocal]);
      setShowSuggestions(false);
    } else {
      return;
    }

    // ** Custom Keydown Event
    if (onKeyDown !== undefined && onKeyDown !== null) {
      onKeyDown(e, userInput);
    }
  };

  // ** Function To Render Grouped Suggestions
  const renderGroupedSuggestion = (arr: any) => {
    const renderSuggestion = (item: any, i: number) => {
      if (!customRender) {
        const suggestionURL =
          item.link !== undefined && item.link !== null ? item.link : null;
        return (
          <li
            className={classnames("suggestion-item", {
              active: filteredData.indexOf(item) === activeSuggestion,
            })}
            key={item[filterKey]}
            onClick={(e) => onSuggestionItemClick(suggestionURL, e)}
            onMouseEnter={() => {
              onSuggestionItemHover(filteredData.indexOf(item));
            }}
          >
            {item[filterKey]}
          </li>
        );
      } else if (customRender) {
        return customRender(
          item,
          i,
          filteredData,
          activeSuggestion,
          onSuggestionItemClick,
          onSuggestionItemHover,
          userInput
        );
      } else {
        return null;
      }
    };

    return arr.map((item: any, i: number) => {
      return renderSuggestion(item, i);
    });
  };

  // ** Function To Render Ungrouped Suggestions
  const renderUngroupedSuggestions = () => {
    filteredData = [];
    const sortSingleData: any =
      suggestions &&
      suggestions
        .filter((i) => {
          const startCondition = i[filterKey]
              .toLowerCase()
              .startsWith(userInput.toLowerCase()),
            includeCondition = i[filterKey]
              .toLowerCase()
              .includes(userInput.toLowerCase());
          if (startCondition) {
            return startCondition;
          } else if (!startCondition && includeCondition) {
            return includeCondition;
          } else {
            return null;
          }
        })
        .slice(0, suggestionLimit);
    filteredData.push(...sortSingleData);
    if (sortSingleData.length) {
      return sortSingleData.map((suggestion: any, index: number) => {
        const suggestionURL =
          suggestion.link !== undefined && suggestion.link !== null
            ? suggestion.link
            : null;
        if (!customRender) {
          return (
            <li
              className={classnames("suggestion-item", {
                active: filteredData.indexOf(suggestion) === activeSuggestion,
              })}
              key={suggestion[filterKey]}
              onClick={(e) => onSuggestionItemClick(suggestionURL, e)}
              onMouseEnter={() =>
                onSuggestionItemHover(filteredData.indexOf(suggestion))
              }
            >
              {suggestion[filterKey]}
            </li>
          );
        } else if (customRender) {
          return customRender(
            suggestion,
            index,
            filteredData,
            activeSuggestion,
            onSuggestionItemClick,
            onSuggestionItemHover,
            userInput
          );
        } else {
          return null;
        }
      });
    } else {
      return (
        <li className="suggestion-item no-result">
          <AlertCircle size={15} />{" "}
          <span className="align-middle ms-50">No Result</span>
        </li>
      );
    }
  };

  // ** Function To Render Suggestions
  const renderSuggestions = () => {
    // ** Checks if suggestions are grouped or not.
    if (grouped === undefined || grouped === null || !grouped) {
      return renderUngroupedSuggestions();
    } else {
      filteredData = [];
      return (
        suggestions &&
        suggestions.map((suggestion) => {
          const sortData = suggestion.data
            .filter((i: any) => {
              const startCondition = i[filterKey]
                  .toLowerCase()
                  .startsWith(userInput.toLowerCase()),
                includeCondition = i[filterKey]
                  .toLowerCase()
                  .includes(userInput.toLowerCase());
              if (startCondition) {
                return startCondition;
              } else if (!startCondition && includeCondition) {
                return includeCondition;
              } else {
                return null;
              }
            })
            .slice(0, suggestion.searchLimit);

          filteredData.push(...sortData);
          return (
            <Fragment key={suggestion[filterHeaderKey ? filterHeaderKey : 0]}>
              <li className="suggestion-item suggestion-title-wrapper">
                <h6 className="suggestion-title">
                  {suggestion[filterHeaderKey ? filterHeaderKey : 0]}
                </h6>
              </li>
              {sortData.length ? (
                renderGroupedSuggestion(sortData)
              ) : (
                <li className="suggestion-item no-result">
                  <AlertCircle size={15} />{" "}
                  <span className="align-middle ms-50">No Result</span>
                </li>
              )}
            </Fragment>
          );
        })
      );
    }
  };

  //** ComponentDidMount
  useEffect(() => {
    if (defaultSuggestions && focused) {
      setShowSuggestions(true);
    }
  }, [focused, defaultSuggestions]);

  //** ComponentDidUpdate
  useEffect(() => {
    const textInput = ReactDOM.findDOMNode(inputElRef.current);

    // ** For searchbar focus
    if (textInput !== null && autoFocus) {
      //@ts-ignore
      inputElRef.current && inputElRef.current.focus();
    }

    // ** If user has passed default suggestions & focus then show default suggestions
    if (defaultSuggestions && focused) {
      setShowSuggestions(true);
    }

    // ** Function to run on user passed Clear Input
    if (clearInput) {
      clearInput(userInput, setUserInput);
    }

    // ** Function on Suggestions Shown
    if (onSuggestionsShown && showSuggestions) {
      onSuggestionsShown(userInput);
    }
  }, [
    setShowSuggestions,
    focused,
    userInput,
    showSuggestions,
    value,
    filterKey,
    onSuggestionClick,
    onKeyDown,
    customRender,
    suggestionLimit,
    suggestions,
    filterHeaderKey,
    grouped,
    defaultSuggestions,
    autoFocus,
    clearInput,
    onSuggestionsShown,
    externalClick,
    wrapperClass,
    onChange,
    className,
    placeholder,
    autoFocus,
    onBlur,
  ]);

  // ** On External Click Close The Search & Call Passed Function
  useOnClickOutside(container, () => {
    setShowSuggestions(false);
    if (externalClick) {
      externalClick();
    }
  });

  let suggestionsListComponent;

  if (showSuggestions) {
    suggestionsListComponent = (
      <PerfectScrollbar
        className={classnames("suggestions-list", {
          [wrapperClass ? wrapperClass : ""]: wrapperClass,
        })}
        ref={suggestionsListRef}
        component="ul"
        options={{ wheelPropagation: false }}
      >
        {renderSuggestions()}
      </PerfectScrollbar>
    );
  }

  return (
    <div className="autocomplete-container" ref={container}>
      <input
        type="text"
        onChange={(e) => {
          onChangeFunc(e);
          if (onChange) {
            onChange(e);
          }
        }}
        onKeyDown={(e) => onKeyDownFunc(e)}
        value={userInput}
        className={`autocomplete-search ${className ? className : ""}`}
        placeholder={placeholder}
        onClick={onInputClick}
        ref={inputElRef}
        onFocus={() => setFocused(true)}
        autoFocus={autoFocus}
        onBlur={(e) => {
          if (onBlur) onBlur(e);
          setFocused(false);
        }}
      />
      {suggestionsListComponent}
    </div>
  );
};

export { Autocomplete };
