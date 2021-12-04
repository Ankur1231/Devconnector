import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//components
import DashboardActions from "./DashboardActions";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";

//redux
import { getCurrentProfile } from "../../store/profile-actions";
import Education from "./Education";
import { deleteAccount } from "../../store/profile-actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const deleteAccountHandler = () => {
    dispatch(deleteAccount());
  };

  return profile.loading && profile.profile === null ? (
    <Spinner />
  ) : (
    <>
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile.profile !== null ? (
          <>
            {" "}
            <DashboardActions />
            <Experience experience={profile.profile.experience} />
            <Education education={profile.profile.education} />
            <div className="my-2">
              <button className="btn btn-danger" onClick={deleteAccountHandler}>
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </>
        ) : (
          <>
            <p>You do not have a profile, Please make one</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
