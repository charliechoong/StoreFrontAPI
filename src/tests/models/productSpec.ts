import { Product, ProductStore } from '../../models/product'

const store = new ProductStore()

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(store.show).toBeDefined()
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined()
    })

    it('create method should add a product', async () => {
        const product: Product = {
            name: 'Apple',
            price: '0.7'
        }
        const result = await store.create(product)
        expect(result).toEqual({
            id: 1,
            name: 'Apple',
            price: '0.7'
        })
        expect(result.name).toEqual('Apple')
        expect(result.price).toEqual('0.7')
    })

    it('index method should return a list of products', async () => {
        const result = await store.index()
        expect(result.length).toEqual(1)
        expect(result).toEqual([{
            id: 1,
            name: 'Apple',
            price: '0.7'
        }])
    })
})

