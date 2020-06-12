import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'kc-react-widgets';

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
        <Button
        type = "default"
        size = "large"
        depth = "tall"
        shape = "square"
        >
        <Link to="/write/">Compose</Link>
        </Button>
      </header>
    </div>
  );
}

export default LandingPage;
