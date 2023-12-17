import React, { FC, useEffect, useState } from "react";
import { Edit3 } from "react-feather";
import { CardWrapper } from "@src/components/common/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { Col } from "reactstrap";
import { AddConfigModal } from "@src/components/MLSListContainer/AddMlsWizard/AddMlsConfig/AddConfigModal/AddConfigModal";

interface IMlsAccessConfigProp {
  mlsConfigId?: number;
  isLoading?: boolean;
}

const MlsAccessConfig: FC<IMlsAccessConfigProp> = ({
  mlsConfigId,
  isLoading,
}): JSX.Element => {
  const [data, setData] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getDetail = useGetMlsServer();

  useEffect(() => {
    if (mlsConfigId)
      getDetail.mutate(
        { entity: "mls_config", data: { id: mlsConfigId } },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              setData(res.data.result);
            }
          },
        }
      );
    else if (mlsConfigId === 0) {
    }
  }, [mlsConfigId]);

  const headerChild = (): JSX.Element => {
    return (
      <>
        {isOpen && (
          <AddConfigModal
            isOpen={isOpen}
            onToggle={() => setIsOpen((old) => !old)}
            //   onAddData={(d: any) => setData((old: any) => [...old, d])}
            editCellData={data}
            setEditCellData={() => {}}
          />
        )}
        <RippleButton
          // style={{ minWidth: 130 }}
          // className="p-1"
          color="light"
          size="sm"
          // color="secondary"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Edit3 size={18} color="#4d4d4d" />
        </RippleButton>
      </>
    );
  };

  return (
    <CardWrapper title="MLS Config" headerChild={headerChild()} borderBottom>
      {isLoading || getDetail.isLoading ? (
        <LoadingData wrapperStyle="py-5" />
      ) : (
        <>
          <Col sm={12}>
            <div className="d-flex align-items-center mb-1 mt-1 d-flex">
              <span className="fs-6 fw-bolder d-block" style={{ width: "50%" }}>
                MLS Config
              </span>

              <span className="fs-6">
                {data && data.name ? data.name : "Not Set"}
              </span>
            </div>
          </Col>

          <Col sm={12}>
            <div className="d-flex align-items-center mb-1 mt-1 d-flex">
              <span className="fs-6 fw-bolder d-block" style={{ width: "50%" }}>
                Resource
              </span>

              <span className="fs-6 text-primary">
                {data && data.resource ? data.resource : "Not Set"}
              </span>
            </div>
          </Col>
        </>
      )}
    </CardWrapper>
  );
};

export { MlsAccessConfig };
