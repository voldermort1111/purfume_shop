import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { useSelector } from "react-redux";
import { SessionStoreKey } from "./constants/app.constants";

export default function App() {
  const auth = useSelector((state) => state.auth);
  const [hasAuth, setHasAuth] = useState(
    !!sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
  );

  useEffect(() => {
    setHasAuth(!!sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN));
  }, [auth]);
  return (
    <Switch>
      {hasAuth ? (
        <>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/product" />
        </>
      ) : (
        <>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="*" to="/auth" />
        </>
      )}
    </Switch>
  );
}
