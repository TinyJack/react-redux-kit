export default class http {
    constructor(gateway = '/', options = {}) {
        this.gateway = gateway
        this.options = options
    }

    get(path = '/') {}

    delete(path = '/') {}

    post(path = '/', data = {}) {}

    put(path = '/', data = {}) {}
    
    patch(path = '/', data = {}) {}
}
