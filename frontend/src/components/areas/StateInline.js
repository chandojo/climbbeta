import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../design/stateCard.css';

class StateInline extends Component {
  render() {
    const {state} = this.props;
    const {stateClass} = this.props;

    return(
      <div className={stateClass}>
        {state !== undefined ? <>
          <Link to={{ pathname:`/${state.id}`}}>
          <img className="card-img-top state-img" src={state.img} />

          <div className="card-body">
            <h5>{state.name}</h5>
          </div>
          </Link>
        </>
        : ""
        }
      </div>
    );
  }
}

export default StateInline;
