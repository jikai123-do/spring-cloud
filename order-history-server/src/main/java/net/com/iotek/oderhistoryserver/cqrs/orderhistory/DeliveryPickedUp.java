package net.com.iotek.oderhistoryserver.cqrs.orderhistory;

import io.eventuate.tram.events.common.DomainEvent;

public class DeliveryPickedUp implements DomainEvent {
  private String orderId;

  public String getOrderId() {
    return orderId;
  }
}
