const goalTemplate = require("./goalTemplate")
// @ponicode
describe("setColor", () => {
    let inst

    beforeEach(() => {
        inst = new goalTemplate.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.setColor({ percentage: 100.0, dueOn: "2021-07-29T17:54:41.653Z" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.setColor({ percentage: 100, dueOn: "2021-07-29T23:03:48.812Z" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.setColor({ percentage: 10000, dueOn: "2021-07-29T23:03:48.812Z" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.setColor({ percentage: 100, dueOn: "2021-07-30T00:05:36.818Z" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.setColor({ percentage: 100.0, dueOn: "2021-07-29T23:03:48.812Z" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.setColor(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
