import {serverStore, ServerStore} from "./serverStore";

afterEach(() => {
	jest.restoreAllMocks();
});

describe("serverStore", () => {
	const mockedServerStore: ServerStore = {
		read(k: string) {
			return Promise.resolve("");
		},
		write(k: string, v: string) {
			return Promise.resolve(true);
		},
	};
	describe("happy path", () => {
		it("should return a ServerStore object", () => {
			expect(serverStore(mockedServerStore)).toMatchObject({
				read: expect.any(Function),
				write: expect.any(Function),
			});
		});
		it("should call the injected dependency's read method when reading", async () => {
			jest.spyOn(mockedServerStore, "read");
			expect(await serverStore(mockedServerStore).read("someKey")).toEqual(
				expect.any(String)
			);
			expect(mockedServerStore.read).toHaveBeenCalledTimes(1);
			expect(mockedServerStore.read).toHaveBeenCalledWith("someKey");
		});
		it("should call the injected dependency's write method when writing", async () => {
			jest.spyOn(mockedServerStore, "write");
			expect(await serverStore(mockedServerStore).write("someKey", "someValue")).toEqual(
				expect.any(Boolean)
			);
			expect(mockedServerStore.write).toHaveBeenCalledTimes(1);
			expect(mockedServerStore.write).toHaveBeenCalledWith("someKey", "someValue");
		});
	});
});
