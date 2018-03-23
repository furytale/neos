// This is general action creator.
//
// Here we store our general actions,
// that are related not only to one module
// but for entire app.

// services
import neoAPI from '../../services/neo';

// action types
export const GET_NEO = 'GET_NEO';
export const GET_NEO_SUCCESS = 'GET_NEO_FULFILLED';
export const GET_NEO_ERROR = 'GET_NEO_REJECTED';
export const GET_NEO_PENDING = 'GET_NEO_PENDING';

// action creators
export const getNeo = (startDate: string, endDate: string) => ({
  type: GET_NEO,
  payload: neoAPI.getNeo(startDate, endDate).then((result: object) => {
    console.log(result);
    const data = (result.data && result.data.near_earth_objects) ? result.data.near_earth_objects : {};
    const output = Object.keys(data).map((key: Any) => {
      const itemObject = data[key];
      const ItemOutput = Object.keys(itemObject).map((dataItemKey: Any) => {
        const item = itemObject[dataItemKey];
        return {
          estimated_diameter: item.estimated_diameter.kilometers,
          is_potentially_hazardous_asteroid: item.is_potentially_hazardous_asteroid,
          miss_distance: item.close_approach_data[0] ? item.close_approach_data[0].miss_distance.kilometers : 0,
          relative_velocity: item.close_approach_data[0] ? item.close_approach_data[0].relative_velocity.kilometers_per_hour : 0
        };
      });
      return {day: key, data: ItemOutput};
    });
    return {data: output};
  })
});
