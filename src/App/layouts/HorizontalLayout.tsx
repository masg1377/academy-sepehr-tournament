import { FC } from "react";
// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import { HorizontalLayout as Layout } from "@src/components/common/layouts/HorizontalLayout";

// ** Menu Items Array
import navigation from "@src/configs/navigation/horizontal";

const HorizontalLayout: FC<any> = (props): JSX.Element => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  );
};

export { HorizontalLayout };
