import { MoreVertical, Edit3, Grid } from "react-feather";
import PushNotifItemRC from "./PushNotifItemRC";
import EmailNotifRC from "./EmailNotifRC";
import SmsNotifRc from "./SmsNotifRc";
import NotifEditButton from "./NotifEditButton";
import { useState } from "react";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { Modal } from "@src/components/common/Modal/Modal";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import NotifMore from "./NotifMore";

export const notifSettingData = [
  {
    id: 1,
    notifCode: 5256,
    notifName: "Login Attempt",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
  {
    id: 2,
    notifCode: 1212,
    notifName: "Successful payment",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
  {
    id: 3,
    notifCode: 1452,
    notifName: "Lead Management",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
  {
    id: 4,
    notifCode: 6523,
    notifName: "New Connection",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
  {
    id: 5,
    notifCode: 8787,
    notifName: "New member",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
  {
    id: 6,
    notifCode: 1252,
    notifName: "   Like Posts",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
  {
    id: 7,
    notifCode: 1352,
    notifName: "New Comments",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
  {
    id: 8,
    notifCode: 4569,
    notifName: "New message",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
  {
    id: 9,
    notifCode: 2020,
    notifName: "New save",
    pushNotifStatus: "",
    email: "",
    sms: "",
  },
];

export const notifSettingColumns = [
  {
    name: "#",
    width: "50px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.id,
  },
  {
    name: "Notification code",
    minWidth: "120px",
    // sortable: (row: any) => row.usageId,
    selector: (row: any) => row.notifCode,
  },
  {
    name: "Notification Name",
    minWidth: "120px",
    // sortable: (row: any) => row.usageId,
    selector: (row: any) => row.notifName,
  },
  {
    name: "Push Notification",
    minWidth: "150px",
    // sortable: (row: any) => row.usageId,
    selector: (row: any) => row.pushNotifStatus,
    cell: (row: any) => {
      return <PushNotifItemRC />;
    },
  },
  {
    // name: <Grid size={15} />,
    name: "Email",
    minWidth: "150px",
    // selector: (row: any) => row.modificationDate
    cell: (row: any) => {
      return <EmailNotifRC />;
    },
  },
  {
    // name: <Grid size={15} />,
    name: "SMS",
    minWidth: "150px",
    // selector: (row: any) => row.modificationDate
    cell: (row: any) => {
      return <SmsNotifRc />;
    },
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
          <NotifEditButton onToggle={onToggle} />
        </>
      );
    },
  },
  {
    name: <Grid size={15} />,
    minWidth: "50px",
    // selector: (row: any) => row.id,
    cell: (row: any) => {
      return <NotifMore />;
    },
  },
];
