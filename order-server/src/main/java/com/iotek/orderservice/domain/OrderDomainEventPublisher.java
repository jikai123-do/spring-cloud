package com.iotek.orderservice.domain;

import io.eventuate.tram.events.aggregates.AbstractAggregateDomainEventPublisher;
import io.eventuate.tram.events.common.DomainEvent;
import io.eventuate.tram.events.publisher.DomainEventPublisher;

import java.util.List;

public class OrderDomainEventPublisher extends AbstractAggregateDomainEventPublisher<Order, OrderDomainEvent> {

  private DomainEventPublisher eventPublisher;
  public OrderDomainEventPublisher(DomainEventPublisher eventPublisher) {
    super(eventPublisher, Order.class, Order::getId);
  }

  public void publish(String aggregateType, Object aggregateId, List<DomainEvent> domainEvents) {

    eventPublisher.publish(aggregateType,aggregateId,domainEvents);
  }

}
