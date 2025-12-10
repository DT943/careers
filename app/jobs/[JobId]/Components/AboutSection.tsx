
type AboutSectionProps = {
  aboutText: string;
};

const AboutSection = ({ aboutText }: AboutSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-6 w-full -mt-5">
      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-primary-900">About Role</h3>
        <div className="flex justify-start items-center gap-2 mt-1">
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            {aboutText || "No description available yet."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
