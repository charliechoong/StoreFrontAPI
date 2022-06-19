import { User, UserStore } from '../../models/user'
import { OrderProduct, OrderProductStore } from '../../models/order-products'

const store = new OrderProductStore()

describe('OrderProduct Store', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined()
    })
})