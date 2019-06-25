import React from 'react';
import GitHubMark from '../imgs/GitHub-Mark-64px.png';

const Contribute = () =>(
  <div className="row justify-content-center p-3">
    <div className="col-4" data-testid="contributeDiv">
      <p>Climb Beta is looking for coders and developers of all abilities to contribute to our project. Our goal is to be a resource for climbers planning to go out to the crag or simply looking for project beta. To get there, we have a wishlist of features and performance improvements. These wishes aren't limited by any means. If you have ideas on how to make this site more user-friendly, function better, or anything of the like please let us know! </p>

    </div>
    <div className="col-2">
      <a href="https://github.com/chandojo/climbbeta" target="_blank"><img src={ GitHubMark }/></a>
    </div>
  </div>
);

export default Contribute;
