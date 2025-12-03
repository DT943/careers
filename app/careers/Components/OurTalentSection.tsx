
const OurTalentSection = () => {
  return (
    <section
      className="bg-primary-1 flex justify-center items-center text-center mt-4"
      dir={"ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-0 max-w-7xl w-full mt-4 mb-4">
        <div className="p-4 order-2 lg:order-1 px-6 max-w-7xl mt-1">
          <h1 className="text-3xl font-bold text-white sm:text-2xl">
            Join Our Talent Community
          </h1>
          <p className="lg:text-base font-medium text-sm pt-6 leading-relaxed text-white">
            If you haven’t found the right opportunity yet, you can join our
            Talent Community here
          </p>
          <div className="py-8">
            <button className="text-sm font-semibold mt-4 bg-white hover:bg-[#F5F5F4] text-primary-1 py-2 px-6 rounded-lg p-1">
              Join Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTalentSection;
