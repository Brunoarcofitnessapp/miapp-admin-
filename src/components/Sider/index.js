import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import logo from "../../assets/images/banner/logo.png";
import SubMenu from "antd/lib/menu/SubMenu";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./layout.css";
import { ImInsertTemplate } from "react-icons/im";
import { CgGym } from "react-icons/cg";
import { MdFastfood } from "react-icons/md";
import { FaNutritionix } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined color="#fff" />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const AppSider = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        >
          <Menu.Item
            className="cstm-menu-item"
            key="1"
            icon={<img src={logo} className="logo" />}
          >
            {/* <Link className="sub_links" to="/">
              Logo
            </Link> */}
          </Menu.Item>
          {/* <Menu.Item
            className="cstm-menu-item"
            key="1"
            icon={<PieChartOutlined />}
          >
            <Link className="sub_links" to="/">
              Dashboard
            </Link>
          </Menu.Item> */}
          <SubMenu key="sub2" icon={<UserOutlined />} title="Usuarias">
            <Menu.Item key="2">
              <Link className="submenu-links" to="/users/create">
                Crear usuario
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link className="submenu-links" to="/users/allusers">
                Toda usuaria
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            icon={
              <MdFastfood
                size={18}
                style={{ marginRight: 8, marginLeft: -2 }}
              />
            }
            title="Comidas"
          >
            <Menu.Item key="3">
              <Link className="submenu-links" to="/meal/create">
                Crear comida
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link className="submenu-links" to="/meal/allmeals">
                Todas las comidas
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="3">
              <Link className="submenu-links" to="/meal/copyallmeals">
                copy all meal
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link className="submenu-links" to="/meal/copycreatemeals">
                copy create
              </Link>
            </Menu.Item> */}
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={
              <CgGym size={18} style={{ marginRight: 8, marginLeft: -2 }} />
            }
            title="Ejercicio"
          >
            <Menu.Item key="4">
              <Link className="submenu-links" to="/exercise/create">
                Crear ejercicio
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link className="submenu-links" to="/exercise/allexercise">
                Todo el ejercicio
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub7"
            icon={
              <FaNutritionix
                size={18}
                style={{ marginRight: 8, marginLeft: -2 }}
              />
            }
            title="Macros"
          >
            <Menu.Item key="7">
              <Link className="submenu-links" to="/macros/allmacros">
                Todos los macros
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub9"
            icon={
              <CgGym size={18} style={{ marginRight: 8, marginLeft: -2 }} />
            }
            title="Sets And Reps"
          >
            <Menu.Item key="9">
              <Link className="submenu-links" to="/setsandreps/allsetsandreps">
                Todos le setsandreps
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            icon={
              <BiFoodMenu
                size={18}
                style={{ marginRight: 8, marginLeft: -2 }}
              />
            }
            title="Ingredientes"
          >
            <Menu.Item key="5">
              <Link className="submenu-links" to="/ingredient/create">
                Crear ingredientes
              </Link>
            </Menu.Item>

            <Menu.Item key="5">
              <Link className="submenu-links" to="/ingredient/allingredients">
                Todos los ingredientes
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<VideoCameraOutlined />} title="Vídeos">
            <Menu.Item key="6">
              <Link className="submenu-links" to="/video/uploadvideo">
                Subir vídeo
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link className="submenu-links" to="/video/allvideos">
                Todos los videos
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub8"
            icon={
              <ImInsertTemplate
                size={15}
                style={{ marginRight: 8, marginLeft: -2 }}
              />
            }
            title="Plantilla"
          >
            <Menu.Item key="8">
              <Link className="submenu-links" to="/template/createtemplate">
                Create Plantilla
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link className="submenu-links" to="/template/alltemplates">
                Todos los Plantilla
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link className="submenu-links" to="/template/templatedetails">
                Plantilla detalles
              </Link>
            </Menu.Item>
          </SubMenu>

          {/* <SubMenu key="sub3" icon={<DesktopOutlined />} title="Users">
            <Menu.Item key="5">
              <Link className="submenu-links" to="/admin/create">
                Create User
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link className="submenu-links" to="/users/freez">
                Users
              </Link>
            </Menu.Item>
          </SubMenu> */}
          {/* <Menu.Item
            className="cstm-menu-item"
            key="10"
            icon={<TeamOutlined />}
          >
            <Link className="sub_links" to="/emails">
              Emails
            </Link>
        </Menu.Item> */}
          <Menu.Item
            className="cstm-menu-item"
            key="11"
            // icon={<FileOutlined />}
          >
            {/* <Link className="sub_links" onClick={handleLogout}>
              Logout
            </Link> */}

            <p onClick={handleLogout} className="sub_links">
              Cerrar sesión
            </p>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default AppSider;
