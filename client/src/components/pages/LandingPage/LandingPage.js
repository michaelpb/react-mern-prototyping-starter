import React from 'react';
import { Link } from 'react-router-dom'

import './LandingPage.css';

function LandingPage() {
  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <p>
          Concerned Citizens<br />
          <br />
          A tool used for making letter campaigns for expressing concerns to public officials.
        </p>
        <Link to="/write/">Write article</Link>
      </header>
    </div>
  );
}

export default LandingPage;
