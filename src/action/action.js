import axios from 'axios';
import { USER_DETAILS, DETAILS_VIEW } from '../constants/index';


export function showDetails() {
    return dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        return axios
            .get('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json', { headers })
            .then(response => response.data)
            .then(json => {
                dispatch({ type: USER_DETAILS, payload: json });
            });
    };
}

export function userDetailsView(personData) {
    return dispatch => {
      dispatch({ type: DETAILS_VIEW, personData });
    };
  }

