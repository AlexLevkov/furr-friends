import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

export const orderService = {
    query,
    remove,
    getById,
    save,
}

function query() {
    // return storageService.query('order')
    return httpService.get(`order`)
}

function remove(orderId) {
    // return storageService.remove('order', orderId)
    return httpService.delete(`order/${orderId}`)
}

function getById(orderId) {
    // return storageService.get('order', orderId)
    return httpService.get(`order/${orderId}`)
}

async function save(order) {
    if (order._id) {
        // return storageService.put('order', order)
        return order = await httpService.put(`order`, order)
    } else {
        // return storageService.post('order', order)
        return order = await httpService.post(`order`, order)
    }
}

