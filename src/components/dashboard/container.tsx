import React, { FC } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { UserType } from "../../store/models/user";
import ClientsTable from "./clients-table";

interface Props {
  user: UserType;
}

const DashboardContainer: FC<Props> = ({ user, ...props }) => {
  return (
    <>
      <div className="text-left w-full">
        <div className="header px-5 mt-3">
          <div className="flex">
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-500 relative inline-block">
              <span className="relative text-2xl font-semibold text-white">
                Dashboard
              </span>
            </span>
          </div>
          <p className="mt-3 "> Logged In as: {user.name}</p>
        </div>
        <div className="container w-auto px-1">
          <ClientsTable />
        </div>
      </div>
    </>
  );
};

const mapState = (state: RootState) => ({
  user: state.user,
});

export default connect(mapState, {})(DashboardContainer);
