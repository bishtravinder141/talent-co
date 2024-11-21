import { APIAxios } from "../config/APIConfig";
import { CANDIDATE_PUBLIC_PROFILE } from "../config/PublicApiUrls";

export const getCandidatePublicProfile = (id) => {
    return APIAxios.get(`${CANDIDATE_PUBLIC_PROFILE}${id}`);
  };