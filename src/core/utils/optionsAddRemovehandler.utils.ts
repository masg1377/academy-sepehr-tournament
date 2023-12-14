// ** Function for hanlding current/removed/added items of multiSelect ** //

export const handleAddRemoveOptions = (
  currentData: {
    value: number;
    label: string;
    count?: number;
  }[],
  submitData: {
    value: number;
    label: string;
    count?: number;
  }[],
  keyName: string
) => {
  let addedItem: any[] = [];
  let removedItem: any[] = [];

  let addData: any[] = [];
  let firstAddData = submitData
    ? submitData.filter((items: any) =>
        currentData
          ? !items.isServer
          : true && currentData
          ? //@ts-ignore
            currentData.some((item: any) => item.value !== items.value)
          : true
      )
    : [];

  firstAddData.forEach((itm: any) => {
    let flag = currentData.some((item: any) => item.value === itm.value);
    if (!flag) {
      addData.push(itm);
    } else {
      return null;
    }
  });

  let removeData: any[] = [];
  currentData &&
    currentData.forEach((item: any, index: number) => {
      let res = submitData.some((items: any) => items.value === item.value);
      if (res) {
        return null;
      } else {
        removeData.push(item);
      }
    });

  addData[0] &&
    addData.forEach((item: any) => {
      if (keyName === "btt_item") {
        addedItem.push({
          object_type: keyName,
          object_id: item.value,
          count: item.count,
        });
      } else if (keyName === "location") {
        addedItem.push({
          object_type: keyName,
          country_id: item?.value,
        });
      } else {
        addedItem.push({
          object_type: keyName,
          object_id: item.value,
        });
      }
    });

  removeData[0] &&
    removeData.forEach((item: any) => {
      removedItem.push({
        object_type: keyName,
        object_id: item.value,
      });
    });

  return { addData, removeData, addedItem, removedItem };
};

// ** Function for hanlding language description of package (add/remove/update) ** //

export const handleAddRemoveOptionsForLanguageDescription = (
  currentData: any,
  submitData: any,
  keyName: string
) => {
  let addedItem: any[] = [];
  let removedItem: any[] = [];
  let updatedItem: any[] = [];

  let addData: any[] = [];
  let firstAddData = submitData
    ? submitData.filter((items: any) =>
        currentData
          ? !items.isServer
          : true && currentData
          ? //@ts-ignore
            currentData.some((item: any) => item.label !== items.label)
          : true
      )
    : [];

  firstAddData.forEach((itm: any) => {
    let flag = currentData.some((item: any) => item.value === itm.value);
    if (!flag) {
      addData.push(itm);
    } else {
      return null;
    }
  });

  let removeData: any[] = [];
  currentData &&
    currentData.forEach((item: any, index: number) => {
      let res = submitData.some((items: any) => items.label === item.label);
      if (res) {
        return null;
      } else {
        removeData.push(item);
      }
    });

  let updateData: any[] = [];
  currentData &&
    currentData.forEach((item: any, index: number) => {
      let res = submitData.some((items: any) => items.label === item.label);
      if (res) {
        let it = submitData.find(
          (i: any) => i.desPackageId === item.desPackageId
        );
        if (it) {
          let curStr = JSON.stringify(item);
          delete it.isServer;
          let subStr = JSON.stringify(it);

          if (curStr !== subStr) {
            updateData.push(it);
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
    });

  addData[0] &&
    addData.forEach((item: any) => {
      let descriptionData: any[] = [];
      descriptionData =
        item.description &&
        item?.description.map((it: any, index: number) => ({
          key: it?.key,
          value:
            it.type.value === "boolean"
              ? it.value
                ? it.value?.value
                : true
              : it.type.value === "number"
              ? it.value
                ? it.value
                : 1
              : it.type.value === "text"
              ? it.value
                ? it.value
                : "-"
              : "",
          value_type: it?.type?.value,
        }));
      descriptionData.push({
        key: "longDesc",
        value: item.longDescription ? item.longDescription : "",
        value_type: "text",
      });
      addedItem.push({
        object_type: keyName,
        package_descriptions_data: {
          language_code: item?.label,
          short_description: item?.shortDescription
            ? item?.shortDescription
            : "",
          notice_description: item.noticeDescription
            ? item.noticeDescription
            : "",
          description: descriptionData,
          condition_description: item.conditionDescription
            ? item.conditionDescription
            : "",
        },
      });
    });

  removeData[0] &&
    submitData.length > 0 &&
    removeData.forEach((item: any) => {
      removedItem.push({
        object_type: keyName,
        object_id: item.desPackageId,
      });
    });

  updateData[0] &&
    updateData.forEach((item: any) => {
      let descriptionData: any[] = [];
      descriptionData =
        item.description &&
        item?.description.map((it: any, index: number) => ({
          key: it?.key,
          value:
            it.type.value === "boolean"
              ? it.value
                ? it.value?.value
                : true
              : it.type.value === "number"
              ? it.value
                ? it.value
                : 1
              : it.type.value === "text"
              ? it.value
                ? it.value
                : "-"
              : "",
          value_type: it?.type?.value,
        }));
      descriptionData.push({
        key: "longDesc",
        value: item.longDescription ? item.longDescription : "",
        value_type: "text",
      });
      updatedItem.push({
        object_type: keyName,
        package_descriptions_data: {
          id: item?.desPackageId,
          language_code: item?.label,
          short_description: item?.shortDescription
            ? item?.shortDescription
            : "",
          notice_description: item.noticeDescription
            ? item.noticeDescription
            : "",
          description: descriptionData,
          condition_description: item.conditionDescription
            ? item.conditionDescription
            : "",
        },
      });
    });

  return { addData, removeData, addedItem, removedItem, updatedItem };
};
