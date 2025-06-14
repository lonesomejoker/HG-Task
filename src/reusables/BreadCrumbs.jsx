import React from "react";

const BreadCrumbs = ({ title, parent, childpath }) => {
  return (
    <div>
      <div className=" flex gap-2 items-center mb-1.5">
        <p className="uppercase font-[500] caption">{parent}</p>
        <p>/</p>
        <p className="text-primary uppercase font-[500] caption">{childpath}</p>
      </div>
      <h6>{title}</h6>
    </div>
  );
};

export default BreadCrumbs;
