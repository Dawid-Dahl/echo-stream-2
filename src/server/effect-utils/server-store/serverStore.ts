type ServerStoreReader = {read: (k: string) => Promise<string | null>};
type ServerStoreWriter = {write: (k: string, v: string) => Promise<boolean>};

export type ServerStore = ServerStoreReader & ServerStoreWriter;

export const serverStore = (dep: ServerStore): ServerStore => ({
	async read(k: string) {
		return await dep.read(k);
	},
	async write(k: string, v: string) {
		return await dep.write(k, v);
	},
});
