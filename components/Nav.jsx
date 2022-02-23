import React, { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import NavLink from "./NavLink";

const Nav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  const logout = () => {
    userService.logout();
  };

  // Only show nav when logged in
  if (!user) return null;

  return (
    <nav className="flex justify-between navbar navbar-expand navbar-dark bg-dark">
      <div className="text-white">WetribeTV</div>
      <div className="navbar-nav">
        <NavLink href="/" exact className="nav-item nav-link">
          Home
        </NavLink>
        <NavLink href="/users" className="nav-item nav-link">
          Users
        </NavLink>
        <a onClick={logout} className="nav-item nav-link cursor-pointer">
          Logout
        </a>
      </div>
    </nav>
  );
};
export { Nav };
