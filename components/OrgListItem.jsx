import React from "react";

const OrgListItem = ({ name, domain }) => {
  return (
    <div className="flex justify-between p-2 text-white border-b border-gray-200">
      <div className="flex flex-col">
        <span>{name}</span>
        <span>{domain}</span>
      </div>
      <div className="flex items-center gap-x-4">
        <span>View</span>
        <span>Edit</span>
      </div>
    </div>
  );
};

export default OrgListItem;
