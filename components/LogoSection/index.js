import React from "react";
import Image from "next/image";

const LogoSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      <Image src="/assets/vue.svg" alt="Vue Logo" width={150} height={150} />
      <Image src="/assets/nuxt.svg" alt="Nuxt Logo" width={150} height={150} />
      <Image src="/assets/react.svg" alt="React Logo" width={150} height={150} />
      <Image src="/assets/nextjs.svg" alt="Next.js Logo" width={150} height={150} />
      <Image src="/assets/tailwind.svg" alt="Tailwind Logo" width={150} height={150} />
      <Image src="/assets/typescript.svg" alt="TypeScript Logo" width={150} height={150} />
      <Image src="/assets/css.svg" alt="CSS Logo" width={150} height={150} />
    </div>
  );
};

export default LogoSection;
