import { Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
const { Header, Content } = Layout;
const items: MenuProps["items"] = [
  {
    key: 1,
    label: <NavLink to={"/add-product"}>Add Product</NavLink>,
  },
  {
    key: 2,
    label: <NavLink to={"/all-products"}>All-Product</NavLink>,
  },
  {
    key: 3,
    label: <NavLink to={"/sales-history"}>Sales-History</NavLink>,
  },
];

export default function MainLayout() {
  return (
    <Layout className="">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            color: "green",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          SmartPhone Management
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="h-16 p-0 z-10">
          <Navbar></Navbar>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
