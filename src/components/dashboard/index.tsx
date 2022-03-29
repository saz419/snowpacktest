import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import DashboardContainer from "./container";
import NavbarMinimalColored from "./sidebar";

const Dashboard: FC<{}> = ({ ...props }) => {
  useEffect(() => {}, []);
  return (
    <div className="m-auto text-center flex flex-row">
      <NavbarMinimalColored />
      <DashboardContainer />
    </div>
  );
};

const mapState = (state: RootState) => ({});

export default connect(mapState, {})(Dashboard);
