import React, { useState } from "react";
import { useContractCall } from "../../hooks/useContractRead";

const DisposersList = () => {
  const { data } = useContractCall("getAllDisposers", [], true);


  return (
    <div>
      <div className=' mx-auto max-w-4xl py-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {data}
          </div>
      </div>
    </div>
  );
};

export default DisposersList;
