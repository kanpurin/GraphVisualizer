/* eslint no-undef: 0 */
import React from "react";

function UsageGraph2d({content}) {
  return (
    <div className="container">
      <ul className="list-unstyled">
        <li className="list-group-item">点追加 : 点がない格子点上を<strong>クリック</strong></li>
        <li className="list-group-item">点削除 : 点がある格子点上を<strong>クリック</strong></li>
      </ul>
    </div>
  );
}

export default UsageGraph2d;