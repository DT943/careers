
const AboutSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-6 w-full -mt-5">
      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-primary-900">About Role</h3>
        <div className="flex justify-start items-center gap-2 mt-1">
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            We're looking for an experienced engineer to join our core platform
            team. You'll work on mission-critical systems that power our global
            aviation network, serving millions of users daily. This role offers
            the opportunity to work with cutting-edge technology while making a
            real impact on how people travel.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
