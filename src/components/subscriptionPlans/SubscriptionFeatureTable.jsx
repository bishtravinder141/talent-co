import React from "react";

const SubscriptionFeatureTable = ({ planFeatures, avaliablePlans }) => {
  const headers = ["Features", "Starter", "Pro+", "Business+"];
  return (
    <table className="table align-middle table-layout-fixed">
      <tbody>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        <tr>
          <td>Price</td>
          {avaliablePlans?.length > 0 &&
            avaliablePlans?.map((curPlan, index) => (
              <td key={index}>${curPlan?.plan_price}</td>
            ))}
        </tr>
        {planFeatures?.length > 0 &&
          planFeatures?.map((row, index) => (
            <tr key={index}>
              <td className="text-capitalize">{row?.feature_name}</td>
              <td>
                <img
                  src={
                    row?.starter_plan_status
                      ? "/assets/images/checkIcon.svg"
                      : "/assets/images/crossIcon.svg"
                  }
                />
              </td>
              <td>
                <img
                  src={
                    row["pro_+_plan_status"]
                      ? "/assets/images/checkIcon.svg"
                      : "/assets/images/crossIcon.svg"
                  }
                />
              </td>
              <td>
                <img
                  src={
                    row[`buisness+_plan_status`]
                      ? "/assets/images/checkIcon.svg"
                      : "/assets/images/crossIcon.svg"
                  }
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SubscriptionFeatureTable;
