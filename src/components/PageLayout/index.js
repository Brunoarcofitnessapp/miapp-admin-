import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import { GoChevronRight } from "react-icons/go";
import grid from "../../assets/icons/grid.svg";
import logo from "../../assets/icons/logo.svg";
import { CategoryCard } from "../Cards";
import styles from "./layout.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AppSider from "../Sider";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const PageLayout = ({ children }) => {
  const data = [
    {
      title: "Total Pins",
      value: 0,
      desc: `recently added 0`,
      location: true,
    },
    {
      title: "Draft Pins",
      value: 0,
      desc: `recently added 0`,
      pin: true,
    },
    {
      title: "Users",
      value: 0,
      desc: `recently added 0`,
      user: true,
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  let isCards = false;
  if (location.pathname === "/") {
    isCards = true;
  }
  const currentPaths = location.pathname.split("/").filter((i) => !!i.trim());
  const handleLogout = () => {
    navigate("/login");
  };
  // const pageTitle = currentPaths.length>=1 ? currentPaths[0]: ""
  // const activePage  = currentPaths.length>=2?
  return (
    <Layout>
      <AppSider />
      {/* <Sider className={styles.webSideBar}>
        <div className={styles.side_layout}>
          <div className={styles.logo_div}>
            <img src={logo} className={styles.logo} />
            <p>Logo</p>
          </div>
          <div className={styles.sidebar}>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item
                className="cstm-menu-item"
                key="1"
                icon={<img src={grid} className="side-icon" />}
              >
                <Link className="sub_links" to="/">
                  Dashboard
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub3"
                icon={<img src={grid} className="side-icon" />}
                title="Users"
              >
                <Menu.Item key="5">
                  <Link className="submenu-links" to="/users/active">
                    Users list
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link className="submenu-links" to="/admin/create">
                    Create Users
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                icon={<img src={grid} className="side-icon" />}
                title="Admin Users"
              >
                <Menu.Item key="8">
                  <Link className="submenu-links" to="/admin/create">
                    Create Role
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                className="cstm-menu-item"
                key="10"
                icon={<img src={grid} className="side-icon" />}
              >
                <Link className="sub_links" to="/emails">
                  Emails
                </Link>
              </Menu.Item>
              <Menu.Item
                className="cstm-menu-item"
                key="11"
                icon={<img src={grid} className="side-icon" />}
              >
                <Link className="sub_links" to="/privacy">
                  Privacy & Policy
                </Link>
              </Menu.Item>
            </Menu>
            <div className={styles.logout}>
              <img src={grid} />
              <p onClick={handleLogout} className={styles.link}>
                Logout
              </p>
            </div>
          </div>
        </div>
      </Sider> */}
      <Layout>
        {/* <div className="layout-header">
          <p className="title">Welcome Admin</p>
        </div> */}
        <Content>
          {/* {isCards && (
            <Row gutter={24} style={{ marginLeft: "0", marginRight: "0",backgroundColor:"yellow" }}>
              {data &&
                data.map((data, index) => {
                  return (
                    <Col
                      style={{ marginTop: "1rem" }}
                      sm={24}
                      xs={24}
                      md={7}
                      key={index}
                    >
                      <CategoryCard
                        title={data.title}
                        value={data.value}
                        desc={data.desc}
                        pin={data.pin}
                        location={data.location}
                        user={data.user}
                      />
                    </Col>
                  );
                })}
            </Row>
          )} */}
          <div className={styles.content}>
            <Row className={styles.row}>
              {currentPaths.map((path, ind, { length }) => {
                const isLast = ind === length - 1 && length > 1;
                if (isLast) {
                  return (
                    <div className={styles.active_div}>
                      <GoChevronRight className={styles.icon_right} />
                      <p className={styles.active}>{path}</p>
                    </div>
                  );
                } else if (ind !== 0 && length > 1) {
                  return (
                    <div className={styles.active_div}>
                      <GoChevronRight className={styles.icon_right} />
                      <p className={styles.heading}>{path}</p>
                    </div>
                  );
                }
                return <p className={styles.heading}>{path}</p>;
              })}
            </Row>
            <div>{children}</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default PageLayout;
