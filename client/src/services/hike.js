import http from "../http-common";

// includes functions that make API calls and return the information from API calls
class HikeDataService {
   async getAll() {
   const res = await http.get();
   return res;
  }

  createHike(data) {
    return http.post("/new", data);
  }
  
  get(id) {
    return http.get(`/id/${id}`);
  }

  // should take an integer between 0 to 5.
  createReview(data) {
    return http.post("/review", data);
  }
}
    
export default new HikeDataService();