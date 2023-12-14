import React, { FC } from "react";
import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import { Divider } from "@src/components/common/divider/Divider";
import { CardBody, Col, Table } from "reactstrap";
import { CardActions } from "@src/components/common/card-actions";
import { FieldArray, useFormikContext } from "formik";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { X } from "react-feather";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { Link, useParams } from "react-router-dom";
import { useGroupInviteMemberList } from "@src/core/services/api/group/group.api";
import { TInviteMemberList } from "@src/core/services/api/group/type";
import toast from "react-hot-toast";

interface IAddMemberComponentProp {
  fullWidth?: boolean;
  title?: string;
}

const AddMemberComponent: FC<IAddMemberComponentProp> = ({
  fullWidth,
  title,
}): JSX.Element => {
  //const { values, setFieldValue } = useFormikContext<any>();

  const { id } = useParams();

  const invite = useGroupInviteMemberList();

  const onSubmit = (values: any) => {
    const obj: { group_id: number; body: TInviteMemberList } = {
      group_id: id ? +id : 0,
      body: {
        invitation_list: values?.roles?.map((role: any) => ({
          role: role?.role?.value,
          email: role?.email,
        })),
      },
    };

    invite.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          toast.success("Successfully invited!");
        }
      },
    });
  };

  return (
    <div className="bg-white d-flex flex-column justify-content-between align-items-start rounded-1 px-2 pb-1">
      <Divider wrapperClassName="w-100" />

      <FormWrapper
        className="w-100"
        initialValues={{
          roles: [
            {
              email: "",
              role: {
                value: "member",
                label: "Member",
              },
            },
          ],
        }}
        onSubmit={onSubmit}
        // validationSchema={addRoleValidation}
        enableReinitialize
      >
        {({ values, setFieldValue, setFieldError }) => {
          return (
            <>
              <div className="d-flex flex-column justify-content-start align-items-between w-100">
                <div className="d-flex flex-row justify-content-start align-items-center py-1">
                  <span className="ft-16 text-thunder">Invite Member</span>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-start mt-2 w-100">
                  <span className="ft-18 text-thunder">
                    Please enter the members' email so that an invitation letter
                    will be sent to them
                  </span>
                  <Col
                    sm={12}
                    xs={12}
                    md={12}
                    xl={fullWidth ? 12 : 8}
                    className="ps-0 pe-0"
                  >
                    <CardActions
                      title={title ? title : "Members"}
                      actions={[]}
                      noShadow
                      endReload={(endLoading: any) => {}}
                      headerClassName="ps-0 pe-0 mt-1"
                    >
                      <CardBody className="pt-0 ps-0 pe-0">
                        <Table
                          responsive="xs"
                          bordered
                          className="overflow-visible"
                          size="sm"
                        >
                          <thead>
                            <tr>
                              <th>Emails</th>
                              <th>Role</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray
                              name="roles"
                              render={(arrayHelpers) => (
                                <>
                                  {values.roles && values.roles.length > 0
                                    ? values.roles.map(
                                        (comp: any, index: number) => (
                                          <tr key={index}>
                                            <td>
                                              <InputText
                                                name={`roles[${index}].email`}
                                                placeholder="example@example.com"
                                                noColor
                                                size={30}
                                                bsSize="sm"
                                                noErrorMessage
                                              />
                                            </td>
                                            <td>
                                              <SelectOption
                                                name={`roles[${index}].role`}
                                                placeholder="Type..."
                                                options={[
                                                  {
                                                    value: "admin",
                                                    label: "Admin",
                                                  },
                                                  {
                                                    value: "member",
                                                    label: "Member",
                                                  },
                                                  {
                                                    value: "moderator",
                                                    label: "Moderator",
                                                  },
                                                ]}
                                                defaultValue={{
                                                  value: "member",
                                                  label: "Member",
                                                }}
                                                //   customStyle={SelectCustomStyle}
                                                noErrorMessage
                                              />
                                            </td>
                                            <td
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              <X
                                                size={18}
                                                className="cursor-pointer"
                                              />
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
                            const oldArr = values.roles
                              ? [...values.roles]
                              : [];
                            oldArr.push({
                              email: "",
                              role: { value: "member", label: "Member" },
                            });
                            setFieldValue("roles", oldArr);
                          }}
                        >
                          + Add Item
                        </SubmitButton>
                      </CardBody>
                    </CardActions>
                  </Col>
                </div>
              </div>
              <div className="mt-4">
                <SubmitButton
                  color="info"
                  type="submit"
                  className="me-1"
                  isLoading={invite.isLoading}
                >
                  invite
                </SubmitButton>
              </div>
            </>
          );
        }}
      </FormWrapper>
      {/* <span className="ft-18 text-thunder">
            You can upload the Excel file of the list of members
          </span>
          <div className="mt-2">
            <SubmitButton type="file" className="me-1">
              file upload
            </SubmitButton>
            <Link style={{ textDecoration: "underline" }} to="/">
              Download the sample file
            </Link>
          </div> */}
    </div>
  );
};

export { AddMemberComponent };
