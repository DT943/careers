"use client";

import HeaderSection from "./Components/HeaderSection";
import VacanciesSection from "./Components/VaccanceSection";
import TeamTextSection from "./Components/TeamTextSection";
import CategoriesSection from "./Components/CategoiesSection";
import OurTalentSection from "./Components/OurTalentSection";

const CareersClient = () => {
  return (
    <>
      <HeaderSection />
      <TeamTextSection />
      <VacanciesSection />
      <CategoriesSection />
      <div className="pb-10">
        <OurTalentSection />
      </div>
    </>
  );
};

export default CareersClient;
