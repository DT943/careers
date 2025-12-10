import BackgroundContainer from "../../../components/CustomBackgroundContainer";
import header from "../../../public/images/careers/header.png";
import { useState } from "react";
import { MagnifyingGlassIcon, MapPinIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const HeaderSection = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  const handleSearchJobs = () => {
    const params = new URLSearchParams();

    if (searchValue.trim()) {
      params.append("search", searchValue.trim());
    }
    if (cityValue.trim()) {
      params.append("city", cityValue.trim());
    }

    const queryString = params.toString();
    router.push(`/jobs${queryString ? `?${queryString}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchJobs();
    }
  };

  return (
    <div dir={"ltr"}>
      <BackgroundContainer
        imageUrl={header}
        className="min-h-[68vh]"
        careersGradient={true}
      >
        <section className="flex min-h-[68vh]">
          <div className="w-screen max-w-7xl mx-auto flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white sm:text-5xl">
                  Careers
                </h1>

                <p className="mt-4 text-base text-pretty text-white sm:text-lg/relaxed">
                  Opportunities Elevate Your Ambitions
                </p>
              </div>
            </div>

            <div className="pb-6 sm:pb-10">
              <div className="flex justify-center gap-4">
                <div className="pointer-events-auto flex flex-col sm:flex-row gap-8 items-stretch sm:items-center w-full sm:w-[700px]">
                  <div className="flex w-full items-center gap-2 bg-white rounded-sm shadow-lg px-3 sm:px-4 py-2">
                    <div className="relative w-full flex items-center">
                      <MagnifyingGlassIcon
                        size={20}
                        className="absolute left-3 text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Search for job title or keywords"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-10 border-none text-sm outline-none bg-transparent placeholder-text-600"
                      />
                    </div>

                    <span className="h-6 w-px bg-gray-200" />

                    <div className="relative w-full flex items-center">
                      <MapPinIcon
                        size={20}
                        className="absolute left-3 text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Search by city"
                        value={cityValue}
                        onChange={(e) => setCityValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-10 border-none text-sm outline-none bg-transparent placeholder-text-600"
                      />
                    </div>

                    <button
                      type="button"
                      className="w-[40%] rounded-sm py-2 px-2 text-xs bg-primary-1 font-medium text-white hover:opacity-95"
                      onClick={handleSearchJobs}
                    >
                      Search jobs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BackgroundContainer>
    </div>
  );
};

export default HeaderSection;
