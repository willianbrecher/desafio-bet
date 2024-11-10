import { IRegistered, IUser } from "../types/auth.types";
import { api } from "../utils/initApi";

export class AuthApi {

    public async register<T>(entity: T): Promise<IRegistered> {
		return await api.post("/register", entity);
	}

    public async login<T>(entity: T): Promise<IUser> {
		return await api.post("/login", entity);
	}
}