import Http from "@/services/http-client";

class UserService {
  getAll(): Promise<any> {
    return Http.get("?results=50").then((response: any)=> {
        return response.data.results;
    });
  }
}

export default new UserService();