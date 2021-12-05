import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//components
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";

//redux
import { getProfileByUserId } from "../../store/profile-actions";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();
  const id = useParams().id;

  useEffect(() => {
    dispatch(getProfileByUserId(id));
  }, [dispatch, id]);

  return (
    <section className="container">
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profile
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
