import { Order, OrderStore } from '../../models/order'

const store = new OrderStore()

describe('Order Store', () => {

    it('should have a show method', () => {
        expect(store.show).toBeDefined()
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined()
    })
})