import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import AuthProtector from "./components/AuthProtector";
import Dashboard from "./components/dashboard";
import { Dispatch, RootState } from "./store";
import { UserType } from "./store/models/user";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Progress from "./components/loading/Progress";

interface Props {
  user: UserType;
  isLoading: boolean;
  setUser: (e: UserType) => {};
}

const queryClient = new QueryClient();
const App: React.FC<Props> = ({ setUser, isLoading, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  React.useEffect(() => {
    if (user === null) localStorage.setItem("user", JSON.stringify(props.user));
  }, [props.user]);

  React.useEffect(() => {
    // console.log(props, user);
    if (user !== null) {
      setUser(JSON.parse(user));
    }
  }, []);
  React.useEffect(() => {
    if (!props.user.loggedIn) {
      navigate("/auth");
    }
  }, [props.user.loggedIn]);
  return (
    <>
      <Progress isAnimating={isLoading} key={location.key} />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<AuthProtector />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

const mapState = (state: RootState) => ({
  user: state.user,
  isLoading: state.global.isLoading,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setUser: (e: UserType) => dispatch.user.setUser(e),
});

export default connect(mapState, mapDispatch)(App);
