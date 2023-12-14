import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GroupActions: FC = (): JSX.Element => {
  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <CardWrapper>
      <SubmitButton
        className="fs-5 p-2 mb-2"
        block
        noForm
        onClick={() => navigate("/groups-list/join-requests/" + id)}
      >
        View Join Request
      </SubmitButton>

      <SubmitButton
        className="fs-5 p-2 mb-2"
        block
        noForm
        outline
        onClick={() => navigate("/groups-list/invite-member/" + id)}
      >
        Invite Memeber
      </SubmitButton>

      <SubmitButton
        className="fs-5 p-2 mb-2"
        block
        noForm
        outline
        onClick={() => navigate("/groups-list/Whitelist/" + id)}
      >
        Whitelist
      </SubmitButton>

      <SubmitButton
        className="fs-5 p-2"
        block
        noForm
        outline
        onClick={() => navigate("/groups-list/edit-group/" + id)}
      >
        Edit group
      </SubmitButton>
    </CardWrapper>
  );
};

export { GroupActions };
