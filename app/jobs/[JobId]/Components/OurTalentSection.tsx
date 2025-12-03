
const OurTalentSection = () => {
  return (
    <section
      className=" flex justify-center items-center text-center mt-4"
      dir={"ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-0 max-w-7xl w-full mt-4 mb-4">
        <div className="p-4 order-2 lg:order-1 px-6 max-w-7xl mt-1">
          <h1 className="text-3xl font-bold text-primary-1 sm:text-2xl">
            Join Our Talent Community
          </h1>
          <p className="lg:text-base font-medium text-sm text-primary-1 pt-6 leading-relaxed text-primary-1">
            If you haven’t found the right opportunity yet, you can join our
            Talent Community here
          </p>
          <div className="py-4">
            <button className="text-sm text-white font-semibold mt-4 bg-primary-1 py-3 px-7 rounded-lg p-1 hover:opacity-95">
              Join Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTalentSection;
