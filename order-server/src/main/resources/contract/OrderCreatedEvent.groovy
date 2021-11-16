package http;

org.springframework.cloud.contract.spec.Contract.make {
    label 'orderCreatedEvent'
    input {
        triggeredBy('orderCreated()')
    }

    outputMessage {
        sentTo('com.iotek.orderservice.domain.Order')
        body('''{"orderDetails":{"lineItems":[{"quantity":5,"menuItemId":"1",
            "price":"10.00","total":"50.00"}],"orderTotal":"50.00","restaurantId":1, "consumerId":1511300065921}, 
            "restaurantName" : "Ajanta"}''')
        headers {
            header('event-aggregate-type', 'com.iotek.orserservice.domain.Order')
            header('event-type', 'com.iotek.orderservice.api.events.OrderCreatedEvent')
            header('event-aggregate-id', '123456')
        }
    }
}

