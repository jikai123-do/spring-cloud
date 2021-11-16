package com.iotek.orderservice.domain;

import io.eventuate.tram.events.common.DomainEvent;

public class OrderLineItemChangeQueued implements DomainEvent {
  public OrderLineItemChangeQueued(String lineItemId, int newQuantity) {

  }
}
