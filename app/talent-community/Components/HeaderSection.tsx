import BackgroundContainer from "../../../components/CustomBackgroundContainer";
import header from "../../../public/images/careers/talent.png";

const HeaderSection = () => {
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
                <h1 className="text-3xl font-semibold text-white sm:text-5xl max-w-2xl">
                  Welcome to the FlyCham Talent Community
                </h1>

                <p className="mt-4 text-base text-pretty text-white sm:text-lg/relaxed">
                  Join our Talent Network and get the right job for you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </BackgroundContainer>
    </div>
  );
};

export default HeaderSection;
