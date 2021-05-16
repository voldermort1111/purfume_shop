import Login from "views/Login.js";
import Capacity from "views/capacity";
import National from "views/national";
import Provider from "views/provider";
import OdorGroup from "views/odor-group";
import OdorRange from "views/odor-range";
import OdorRetentionTime from "views/odor-retention-time";
import Order from "views/order";
import Product from "views/product";
import User from "views/user";
import Style from "views/style";

var routes = [
  // {
  //   path: "/user",
  //   name: "Quản lý tài khoản",
  //   icon: "fas fa-users text-yellow",
  //   component: User,
  //   layout: "/admin",
  // },
  {
    path: "/product",
    name: "Quản lý sản phẩm",
    icon: "fab fa-product-hunt text-success",
    component: Product,
    layout: "/admin",
  },
  {
    path: "/oder",
    name: "Quản lý đơn hàng",
    icon: "fab fa-product-hunt text-pink",
    component: Order,
    layout: "/admin",
  },
  {
    path: "/national",
    name: "Quản lý quốc gia",
    icon: "fab fa-font-awesome-flag",
    component: National,
    layout: "/admin",
  },
  {
    path: "/provider",
    name: "Quản lý thương hiệu",
    icon: "fas fa-copyright text-green",
    component: Provider,
    layout: "/admin",
  },
  {
    path: "/capacity",
    name: "Quản lý dung tích",
    icon: "fas fa-flask text-danger",
    component: Capacity,
    layout: "/admin",
  },
  {
    path: "/odor-group",
    name: "Quản lý nhóm hương",
    icon: "fas fa-layer-group text-warning",
    component: OdorGroup,
    layout: "/admin",
  },
  {
    path: "/odor-range",
    name: "Quản lý độ tỏa hương",
    icon: "fas fa-street-view text-purple",
    component: OdorRange,
    layout: "/admin",
  },
  {
    path: "/odor-retention-time",
    name: "Quản lý thời gian lưu hương",
    icon: "fas fa-clock text-info",
    component: OdorRetentionTime,
    layout: "/admin",
  },
  {
    path: "/style",
    name: "Quản lý phong cách",
    icon: "fas fa-vest-patches text-danger",
    component: Style,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
