import { setToken } from "utils/localStorage";
import HttpClient from "./utils/httpClient";

class AuthService {
  httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(
      process.env.REACT_APP_API_URL ?? "localhost:4000"
    );
  }
  async createToken() {
    const body = {
      login: process.env.REACT_APP_USER,
      senha: process.env.REACT_APP_PASSWORD,
    };
    const token = await this.httpClient.post("/login", { body });
    setToken(token);
  }
}

export default new AuthService();
