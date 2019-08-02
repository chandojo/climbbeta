import React, {Component} from 'react';

class AboutCity extends Component {
  render(){
      const { cityInfo } = this.props;
      return (
        <>
        <table className="table table-striped">
          <tbody>
              <tr>
                <th className="text-capitalize" scope="row">Longitude (city)</th>
                <td>{ cityInfo.longitude }</td>
              </tr>
              <tr>
                <th className="text-capitalize" scope="row">Latitude (city)</th>
                <td>{ cityInfo.latitude }</td>
              </tr>
              <tr>
                <th className="text-capitalize" scope="row">Timezone</th>
                <td>{ cityInfo.timezone }</td>
              </tr>
              <tr>
                <th className="text-capitalize" scope="row">Permit required?</th>
                { cityInfo.permit_required == true ?
                  <>
                    <td>Yes - <span className="font-italic">{ cityInfo.permit_name }</span></td>
                  </>
                    :  cityInfo.permit_required == false ? <td> No </td> : <td> Unknown </td>
                }
              </tr>
              <tr>
                <th className="text-capitalize" scope="row">Camping</th>
                { cityInfo.camping == true ? <td>Yes</td>
                  : cityInfo.camping == false ? <td>No</td> : <td>Unknown</td>
                }
              </tr>
              <tr>
                <th className="text-capitalize" scope="row">Nearby Food</th>
                { cityInfo.nearby_food == true ? <td>Yes</td>
                  : cityInfo.nearby_food == false ? <td>No</td> : <td>Unknown</td>
                }
              </tr>
              <tr>
                <th className="text-capitalize" scope="row">Busted</th>
                { cityInfo.busted !== null ?
                  <td>{ cityInfo.busted }</td>
                  : <td> No available notes </td>
                }
              </tr>

          </tbody>
        </table>
      </>
    )
  }
}


export default AboutCity;
