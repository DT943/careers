import { PencilIcon } from "@phosphor-icons/react";
import React, { ReactNode, useState } from "react";

type CustomPreviewInformationContainerProps = {
  title: string;
  children: ReactNode;
};

const CustomPreviewInformationContainer: React.FC<
  CustomPreviewInformationContainerProps
> = ({ title, children }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#E5E5E3] bg-white shadow-sm overflow-hidden">
        <div className="flex justify-between bg-[#00527a] text-white shadow-sm p-4">
          <h3 className="text-base font-medium">{title}</h3>
          <button
            type="button"
            onClick={handleEdit}
            className="text-sm text-white flex gap-1 justify-center items-center"
          >
            <PencilIcon size={18} />
            Edit
          </button>
        </div>
        <>{children}</>
      </div>
    </div>
  );
};

export default CustomPreviewInformationContainer;
