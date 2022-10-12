import { NavLink } from "react-router-dom";
import React from "react";
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";

function Navigation() {
  return (
    <div className="flex justify-center items-center p-4 bg-blue-400">
      <div className="flex justify-around gap-10 text-white">
        <NavLink className="flex justify-center items-center gap-2" to="/">
          <AiOutlineHome />
          <span>Home</span>
        </NavLink>
        <NavLink
          className="flex justify-center items-center gap-2"
          to="/reports"
        >
          <AiOutlineLineChart />
          <span>Relatórios</span>
        </NavLink>
      </div>
    </div>
  );
}

export default React.memo(Navigation);
