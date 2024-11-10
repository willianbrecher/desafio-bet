import { IBetCreatedRequest, IBetPageableListQuery } from "../types/bet.types";
import { api } from "../utils/initApi";

export class BetApi {

	get ListQueryKey() {
		return `bets-list`;
	}

    public async create<IBetCreated>(request: IBetCreatedRequest): Promise<IBetCreated> {
		return await api.post("/bet", request);
	}

    public async cancel<IBetCanceled>(id: string): Promise<IBetCanceled> {
        return await api.delete(`/my-bet/${id}`);
	}

    public async list<IBetPageableList>(params: IBetPageableListQuery): Promise<IBetPageableList> {
		return await api.get("/my-bets", {params: params});
	}
}