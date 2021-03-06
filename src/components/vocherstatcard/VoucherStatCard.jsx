import React from 'react';

const VoucherStatCard = (props) => {
  return (
    <div className="VoucherStatCard">
      <div className="VoucherStatCard-body u-padTall-2 u-padSide-1">
        <div className="Grid">
          <div className="Grid-cell">
            <div className="VoucherStatCard-number u-marBot-1">
              <h4 className="mini u-textWeightNormal">Voucher Code</h4>
              <span className="u-textWeightBold">{props.code}</span>
            </div>
          </div>
          <div className="Grid-cell">
            <div className="VoucherStatCard-saldo u-marBot-1">
              <h4 className="mini u-textWeightNormal">Saldo Balance</h4>
              <span className="u-textWeightBold">Rp. {props.saldo}</span>
              <span><a className="mini u-marBot-1 u-inlineBlock u-sm-marLeft-half" href="#">show history</a></span>
            </div>
          </div>
          <div className="Grid-cell u-size1of2">
            <div className="VoucherStatCard-expire">
              <h4 className="mini u-textWeightNormal">Expired date</h4>
              <span className="u-textWeightBold">{props.expdate}</span>
            </div>
          </div>
          <div className="Grid-cell u-size1of2">
            <div className="VoucherStatCard-active">
              <h4 className="mini u-textWeightNormal">Card Status</h4>
              <span className="u-textWeightBold">{props.active}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="VoucherStatCard-shadow" />
    </div>
  );
};

VoucherStatCard.propTypes = {
  code: React.PropTypes.number,
  saldo: React.PropTypes.number,
  expdate: React.PropTypes.string,
  active: React.PropTypes.string,
};

VoucherStatCard.defaultProps = {
  code: '9876123456789',
  saldo: '1000000',
  expdate: '31/08/2016',
  active: 'active',
};

export default VoucherStatCard;
