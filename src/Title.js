/* eslint no-undef: 0 */
import React from "react";
import HowTo from "./HowTo";

function Title({title, howtotext}) {
	return (
    <div className="my-3">
      <h2 className='d-inline'>{title}</h2>
      <HowTo content={howtotext} />
    </div>
	)
}

export default Title;