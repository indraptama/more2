// React Core

import React from 'react';

// components

import VoucherStatCard from './components/vocherstatcard/VoucherStatCard.jsx';

const App = () => {
  return (
    <div className="container u-padTall-4 u-padSide-1 bg-blue">
      <div className="u-marBot-6">
        <h2 className="u-textWeightNormal u-textWhite u-textCenter">
          Thank you for choosing ACC Enjoy our treat
        </h2>
      </div>
      <VoucherStatCard />
    </div>
  );
};

export default App;
