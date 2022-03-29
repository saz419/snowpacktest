import React, { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { fetchAgents } from "../../helpers/fetch-agents";
import { Dispatch, RootState } from "../../store";
import TableSelection from "../common/TableSelection";

interface Props {
  loading: (e: boolean) => {};
}

const ClientsTable: FC<Props> = ({ ...props }) => {
  const { data, status } = useQuery("agents", fetchAgents);
  if (status === "loading") {
    props.loading(true);
  } else {
    setTimeout(() => {
      props.loading(false);
    }, 2000);
  }
  useEffect(() => {
    // console.log(data);
  }, [data]);
  return (
    <>
      <div className="mt-3">
        {status === "success" && <TableSelection data={data} />}
      </div>
    </>
  );
};

const mapState = (state: RootState) => ({});
const mapProps = (dispatch: Dispatch) => ({
  loading: (e: boolean) => dispatch.global.loading(e),
});

export default connect(mapState, mapProps)(ClientsTable);
