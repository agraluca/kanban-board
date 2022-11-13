import { TKanbanCard } from "pages/Home/useHome";
import { TCardServices } from "services/cardService";

class CardMapper {
  toPersistence(domainCard: TKanbanCard) {
    return {
      id: domainCard.id,
      titulo: domainCard.title,
      conteudo: domainCard.content,
      lista: domainCard.list,
    };
  }

  toDomain(persistenceCard: TCardServices): TKanbanCard {
    return {
      id: persistenceCard.id,
      title: persistenceCard.titulo,
      content: persistenceCard.conteudo,
      list: persistenceCard.lista,
    };
  }
}

export default new CardMapper();
