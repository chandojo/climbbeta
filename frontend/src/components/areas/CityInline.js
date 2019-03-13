import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CityInline extends Component {
  render() {
    const {city} = this.props;
    const {cityClass} = this.props;

    return(
      <div className={cityClass}>
        {city !== undefined ?
          {city}
//          <>
//          <Link to={{ pathname:`/react/${city}`}}>
//          <div className="card-body">
//            <h5>{city}</h5>
//          </div>
//          </Link>
//        </>
        : ""
        }
      </div>
    );
  }
}

export default CityInline;
