import * as config from "../src/config"

describe("config test",()=>{
    it("can cache config after has read", async ()=>{
        const currentConfig = await config.readAndCache()
        const nextConfig = await config.readAndCache()
        expect(currentConfig).toBe(nextConfig)
    })
})

