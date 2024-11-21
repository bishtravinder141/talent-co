import { Link } from "react-router-dom";
import { USER_ROLE } from "../../constants/Constent";

const ProfilePageTopSection = ({
  role,
  subTitle = "Fill in company details to speed up talent search",
  profileDetails
}) => {
  return (
    <div className="container">
      <div className="border-bottom pb-3">
        <div className="row align-items-center">
          <div className="col-md-6 col-12">
            <div className="complete-profile-heading font-weight-bold">
              <h3>Contact Details</h3>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="complete-profile-right text-end">
              <Link
                to={`${
                  role === USER_ROLE.seeker
                    ? "/view-user-profile"
                    : "/view-company-profile"
                }`}
                className="btn-design btn-small"
              >
                View Public Profile
              </Link>

              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width:`${profileDetails?.profile_percentage}%` }}
                  aria-valuenow={profileDetails?.profile_percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <p className="text-grey">
                <span>{profileDetails?.profile_percentage}%</span>{" "}
                {`${role !== USER_ROLE.seeker ? "" : "Your"}`}{" "}
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageTopSection;
