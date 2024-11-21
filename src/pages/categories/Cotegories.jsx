import React from "react";
import ConstantTopSection from "../../components/job-seeker/constantTopSection";
import CategoryCard from "../../components/home/categoryCard";

const Cotegories = () => {
  return (
    <main>
      <ConstantTopSection
        heading="Category Information"
        search={true}
        placeholder="Find information about the platform categories"
      />
      <CategoryCard />
    </main>
  );
};

export default Cotegories;
