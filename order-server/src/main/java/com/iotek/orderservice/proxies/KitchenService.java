package com.iotek.orderservice.proxies;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class KitchenService {
  public Mono<TicketInfo> findTicketById(String ticketId) {
    return Mono.error(new UnsupportedOperationException());
  }
}
