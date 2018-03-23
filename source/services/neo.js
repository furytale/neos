import http from './http';
import config from 'configs/app.config';

class NeoAPI {
  getNeo = (startDate: string, endDate: string) => {
    return http.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${config.apiKey}`,
      {},
      true
    );
  };
}

export default new NeoAPI();
