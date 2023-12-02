/* eslint no-undef: 0 */
import React from "react";

function About() {
  return (
    <div className="container mt-4">
      <h2>About This Web App</h2>
      <p>
        Welcome to our web application! This application is designed to [ここにアプリの目的や機能を簡単に説明]
      </p>

      <h3>How to Use</h3>
      <p>
        To utilize this app, follow these simple steps:
        <ul>
          <li>[操作方法のステップ1]</li>
          <li>[操作方法のステップ2]</li>
          <li>[操作方法のステップ3]</li>
        </ul>
      </p>

      <h3>Contact Us</h3>
      <p>
        If you have any questions, feedback, or suggestions, feel free to contact us at [お問い合わせ先のメールアドレスやリンク等]!
      </p>
    </div>
  );
}

export default About;