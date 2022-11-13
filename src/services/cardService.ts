import { ListEnum, TKanbanCard } from "pages/Home/useHome";
import CardMapper from "./mappers/cardMapper";
import HttpClient from "./utils/httpClient";

export type TCardServices = {
  id: string;
  titulo: string;
  conteudo: string;
  lista: ListEnum;
};

class CardService {
  httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(
      process.env.REACT_APP_API_URL ?? "localhost:4000"
    );
  }
  async listCards() {
    const cards: TCardServices[] = await this.httpClient.get("/cards");

    return cards.map((card) => CardMapper.toDomain(card));
  }
  createCard(card: TKanbanCard) {
    const body = CardMapper.toPersistence(card);
    return this.httpClient.post("/cards", {
      body,
    });
  }
  editCard(card: TKanbanCard) {
    const body = CardMapper.toPersistence(card);
    return this.httpClient.put(`/cards/${card.id}`, {
      body,
    });
  }
  deleteCard(id: string) {
    return this.httpClient.delete(`/cards/${id}`);
  }
}

export default new CardService();
