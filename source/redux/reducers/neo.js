import { GET_NEO_SUCCESS, GET_NEO_ERROR, GET_NEO_PENDING } from '../actions/neo';

const initialState = {
  data: [],
  pending: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case GET_NEO_SUCCESS:
      const data = action.payload.data;
      const previousHazard = state.data.map((item: object) => {
        const dataItem = item.data.filter((element: object) => {
          return element.is_potentially_hazardous_asteroid;
        });
        return {data: dataItem, day: item.day};
      });
      return Object.assign({}, state, {data: data.concat(previousHazard), pending: false});

    case GET_NEO_ERROR:
      return Object.assign({}, state, {pending: false});

    case GET_NEO_PENDING:
      return Object.assign({}, state, {pending: true});

    default:
      return state;
  }
};
