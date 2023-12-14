import { Edit3, Grid, MoreVertical } from "react-feather";
import VariableNotifEditButton from "./VariableNotifEditButton";
import { useState } from "react";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { Modal } from "@src/components/common/Modal/Modal";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";

export const notificationVariablesData = [
  {
    id: 1,
    name: "Initiator_Username",
    objectType: "Initiator",
    objectField: "Username",
    desc: "The bustling city streets were alive with people going...",
    createDate: "2022-01-06",
  },
  {
    id: 2,
    name: "Initiator_email",
    objectType: "Initiator",
    objectField: "Email",
    desc: "The tranquil lake shimmered in  surface....",
    createDate: "2022-03-04",
  },
  {
    id: 3,
    name: "Initiator_firstname",
    objectType: "Initiator",
    objectField: "First name",
    desc: "The dusty desert landscapethe eye could see, with... ",
    createDate: "2022-03-04",
  },
  {
    id: 4,
    name: "Receiver_user",
    objectType: "Receiver",
    objectField: "User",
    desc: "The lush green forest was  of chirping birds and...",
    createDate: "2022-03-04",
  },
  {
    id: 5,
    name: "Group_name",
    objectType: "Group",
    objectField: "Name",
    desc: "The old abandoned mansion, its crumbling....",
    createDate: "2022-03-04",
  },
];

export const notificationVariablesColumns = [
  {
    name: "#",
    width: "50px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.id,
  },
  {
    name: "Name",
    minWidth: "120px",
    // sortable: (row: any) => row.usageId,
    selector: (row: any) => row.name,
  },
  {
    name: "Object type",
    minWidth: "120px",
    // sortable: (row: any) => row.usageId,
    selector: (row: any) => row.objectType,
  },
  {
    name: "Email",
    minWidth: "200px",
    selector: (row: any) => row.desc,
    // cell: (row: any) => {
    //   return <EmailNotifRC />;
    // },
  },
  {
    name: "Creation Date",
    minWidth: "150px",
    selector: (row: any) => row.createDate,
  },
  {
    name: <Edit3 size={15} />,
    minWidth: "50px",
    // selector: (row: any) => row.id,
    cell: (row: any) => {
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const onToggle = () => {
        setIsOpen((prevState) => !prevState);
      };
      return (
        <>
          {isOpen && (
            <FormWrapper initialValues={{}} onSubmit={() => {}}>
              {({ submitForm }) => (
                <Modal
                  isOpen={isOpen}
                  modalTitle="Add variable"
                  onToggle={onToggle}
                >
                  {{
                    main: (
                      <>
                        <InputText
                          name="item1"
                          placeholder="Please write name ..."
                          label="Item 1"
                          wrapperClassName="my-1"
                        />
                        <SelectOption
                          name="item2"
                          options={[]}
                          placeholder="Please select"
                          label="Item 2"
                          wrapperClassName="mb-1"
                        />
                      </>
                    ),
                  }}
                </Modal>
              )}
            </FormWrapper>
          )}
          <VariableNotifEditButton onToggle={onToggle} />
        </>
      );
    },
  },
  {
    name: <Grid size={15} />,
    minWidth: "50px",
    // selector: (row: any) => row.id,
    cell: (row: any) => {
      return <MoreVertical size={17} />;
    },
  },
];
