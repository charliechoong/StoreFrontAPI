import { User, UserStore } from '../../models/user'

const store = new UserStore()

describe('User Store', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(store.show).toBeDefined()
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined()
    })
})