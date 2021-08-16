import http from "../http-common";

// includes functions that make API calls and return the information from API calls
class HikeDataService {
  getAll() {
    return http.get();
  }

  createHike(data) {
    return http.post("/new", data);
  }
  
  get(id) {
    return http.get(`/id/${id}`);
  }

  // find(query, by = "title", page = 0) {
  //   return http.get(`?${by}=${query}&page=${page}`);
  // } 
}
    
export default new HikeDataService();