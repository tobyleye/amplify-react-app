import { Menu } from "antd";
import { Link,useRouteMatch } from "react-router-dom";
import {
  HomeOutlined,
  ProfileOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";

export default function Nav() {
    let {url} =useRouteMatch()
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link to={url}>
          <HomeOutlined />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={url + "/profile"}>
          <ProfileOutlined />
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={url + "/protected"}>
          <FileProtectOutlined />
          Protected
        </Link>
      </Menu.Item>
    </Menu>
  );
}
