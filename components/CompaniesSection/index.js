import React from "react";
import Image from "next/image";
//Todo: improve svg logo for companies
const CompaniesSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      <Image src="/assets/cowmanagerbv.svg" alt="cowmanager Logo" width={350} height={150} />
      <Image src="/assets/factor-blue.svg" alt="Nuxt Logo" width={150} height={150} />
 
    </div>
  );
};

export default CompaniesSection;
