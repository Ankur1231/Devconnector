import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import Spinner from "../layout/Spinner";
import ProfilesItem from "./ProfilesItem";

//redux
import { getAllProfiles } from "../../store/profile-actions";

const Profiles = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const profiles = useSelector((state) => state.profile.profiles);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => <ProfilesItem key={profile._id} profile={profile} />)
            ) : (
              <h4>No Profile Found</h4>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Profiles;
