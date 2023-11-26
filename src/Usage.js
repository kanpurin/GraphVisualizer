/* eslint no-undef: 0 */
import React from "react";

function Usage({content}) {
  return (
    <div className="container">
      <ul className="list-unstyled">
        <li className="list-group-item">頂点追加 : 何もないところを<strong>ダブルクリック</strong></li>
        <li className="list-group-item">頂点削除 : 削除したい頂点を<strong>ダブルクリック</strong></li>
        <li className="list-group-item">辺追加 : ある頂点を選んだ状態で もう一つの頂点を<strong>Ctrl+クリック</strong></li>
        <li className="list-group-item">辺削除 : 削除したい辺を<strong>ダブルクリック</strong></li>
      </ul>
    </div>
  );
}

export default Usage