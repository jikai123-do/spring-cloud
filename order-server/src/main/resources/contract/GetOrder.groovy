package http;

org.springframework.cloud.contract.spec.Contract.make {
    request {
        method 'GET'
        url '/orders/123456'
    }
    response {
        status 200
        headers {
            header('Content-Type': 'application/json')
        }
        body('''{"orderId" : "123456", "state" : "APPROVAL_PENDING"}''')
    }
}