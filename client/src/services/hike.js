import http from "../http-common";

class HikeDataService {
    getAll() {
        return http.get();
      }
    
      // get(id) {
      //   return http.get(`/id/${id}`);
      // }
    
      // find(query, by = "title", page = 0) {
      //   return http.get(`?${by}=${query}&page=${page}`);
      // } 
    
      createHike(data) {
        return http.post("/new", data);
      }
}
    
export default new HikeDataService();