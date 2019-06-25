import React from 'react';
import { Link } from 'react-router-dom';

const About = () =>(
  <div className="row">
    <div className="col-6 mx-auto p-3" data-testid="aboutSection">
      <p>Climb Beta is an opensource project built by climbers for climbers. It's beginnings started with the need to conveniently watch climbing videos across platforms and now strives to be a "one stop shop" for climbers when it comes to the crag.</p>
      <p>Originally, we were built by one climber. Now we are looking for more climbers who are stoked to contribute to the cause. Please visit our <Link to='/contribute' className="text-warning">Contribute</Link> page to see how you can help.</p>
    </div>
  </div>
);

export default About;
