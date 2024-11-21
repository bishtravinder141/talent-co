import { toast } from "react-toastify";
import { profileIncompleteWarningType, successType } from "./allToastMessage";

export const toastMessage = (msg, type) => {
  if (type === successType) {
    toast.dismiss();
    toast.success(msg);
  } 
  else if(type === profileIncompleteWarningType)
  {
    toast.dismiss();
    toast.warning(msg,{
      autoClose:false
    })
  }
  else {
    toast.dismiss();
    toast.error(msg);
  }
};
