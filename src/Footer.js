/* eslint no-undef: 0 */
import React from "react";

function Footer({content}) {
  return (
		<div className="bg-primary">
      <footer className="py-3">
        <ul className="nav justify-content-end border-top pb-3 mb-3">
          <li className="nav-item"><a href="https://github.com/kanpurin/RandomGenerator" className="nav-link px-2 text-white">GitHub</a></li>
          </ul>
      </footer>
    </div>
  );
}

export default Footer