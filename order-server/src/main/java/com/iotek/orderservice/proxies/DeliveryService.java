package com.iotek.orderservice.proxies;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class DeliveryService {
  public Mono<DeliveryInfo> findDeliveryByOrderId(String orderId) {
    return Mono.error(new UnsupportedOperationException());
  }
}
