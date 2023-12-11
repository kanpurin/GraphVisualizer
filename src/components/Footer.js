/* eslint no-undef: 0 */
import React from "react";

function Footer() {
  const twitterLink = "https://twitter.com/kanpurin_"; // Twitterのリンク

  return (
    <footer className="bg-primary text-white py-3">
      <div className="container">
        <ul className="nav justify-content-end pt-3">
          <li className="nav-item">
            <a href={twitterLink} className="nav-link px-2 text-white" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;