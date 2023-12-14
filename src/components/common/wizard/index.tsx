// ** React Imports
import { useEffect, useState, Fragment, forwardRef, FC } from "react";

// ** Third Party Components
import Stepper from "bs-stepper";
import classnames from "classnames";
import { ChevronRight } from "react-feather";

// ** Styles
import "bs-stepper/dist/css/bs-stepper.min.css";
import "../../../assets/scss/base/plugins/forms/form-wizard.scss";

const Wizard: FC<any> = forwardRef((props, ref: any) => {
  // ** Props
  const {
    type = "horizontal",
    steps,
    options = {},
    instance,
    separator = <ChevronRight size={17} />,
    className,
    headerClassName,
    contentClassName,
    contentWrapperClassName,
    setActiveStep,
  } = props;

  // ** State
  const [activeIndex, setActiveIndex] = useState(0);

  // ** Vars
  let stepper = null;

  // ** Step change listener on mount
  useEffect(() => {
    stepper = new Stepper(ref.current, options);

    ref.current.addEventListener(
      "shown.bs-stepper",
      function (event: any) {
        setActiveIndex(event.detail.indexStep);
        setActiveStep && setActiveStep(event.detail.indexStep);
      },
      { passive: true }
    );

    if (instance) {
      instance(stepper);
    }
  }, []);

  // ** Renders Wizard Header
  const renderHeader = (): JSX.Element[] => {
    return steps.map((step: any, index: number) => {
      return (
        <Fragment key={step.id}>
          {index !== 0 && index !== steps.length ? (
            <div className="line">{separator}</div>
          ) : null}
          <div
            className={classnames("step", {
              crossed: activeIndex > index,
              active: index === activeIndex,
            })}
            data-target={`#${step.id}`}
          >
            <button type="button" className="step-trigger">
              <span className="bs-stepper-box">
                {step.icon ? step.icon : index + 1}
              </span>
              <span
                className="bs-stepper-label"
                style={step.subtitle ? {} : { marginTop: 0 }}
              >
                <span className="bs-stepper-title">{step.title}</span>
                {step.subtitle ? (
                  <span className="bs-stepper-subtitle">{step.subtitle}</span>
                ) : null}
              </span>
            </button>
          </div>
        </Fragment>
      );
    });
  };

  // ** Renders Wizard Content
  const renderContent = (): JSX.Element[] => {
    return steps.map((step: any, index: number) => {
      return (
        <div
          className={classnames("content", {
            [contentClassName]: contentClassName,
            "active dstepper-block": activeIndex === index,
          })}
          id={step.id}
          key={step.id}
        >
          {step.content}
        </div>
      );
    });
  };

  return (
    <div
      ref={ref}
      className={classnames(`bs-stepper ${props.classes} `, {
        [className]: className,
        vertical: type === "vertical",
        "vertical wizard-modern": type === "modern-vertical",
        "wizard-modern": type === "modern-horizontal",
      })}
    >
      <div
        className={classnames("bs-stepper-header", "ps-0 pe-0", {
          [headerClassName]: headerClassName,
        })}
      >
        {renderHeader()}
      </div>
      <div
        className={classnames("bs-stepper-content", {
          [contentWrapperClassName]: contentWrapperClassName,
        })}
      >
        {renderContent()}
      </div>
    </div>
  );
});

export { Wizard };
