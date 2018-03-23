import http from './http';

class NeoAPI {
  getNeo = (startDate: string, endDate: string) => {
    return http.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=SPboJP8XCDF9nlUzSqcqzh0Mq9sJuy6Hf27FuTFl`,
      {},
      true
    );
  };
}

export default new NeoAPI();
