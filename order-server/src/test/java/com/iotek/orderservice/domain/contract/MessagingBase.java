package com.iotek.orderservice.domain.contract;

import com.iotek.orderservice.OrderDetailsMother;

import com.iotek.orderservice.domain.CommonJsonMapperInitializer;
import com.iotek.orderservice.domain.api.OrderCreatedEvent;
import com.iotek.orderservice.domain.OrderDomainEventPublisher;
import io.eventuate.tram.events.publisher.DomainEventPublisher;
import io.eventuate.tram.spring.events.publisher.TramEventsPublisherConfiguration;
import io.eventuate.tram.spring.inmemory.TramInMemoryConfiguration;
import io.eventuate.tram.spring.cloudcontractsupport.EventuateContractVerifierConfiguration;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.verifier.messaging.boot.AutoConfigureMessageVerifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.Collections;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = MessagingBase.TestConfiguration.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
@AutoConfigureMessageVerifier
public abstract class MessagingBase {

  static {
    CommonJsonMapperInitializer.registerMoneyModule();
  }
  @Configuration
  @EnableAutoConfiguration
  @Import({EventuateContractVerifierConfiguration.class, TramEventsPublisherConfiguration.class, TramInMemoryConfiguration.class})
  public static class TestConfiguration {
    @Bean
    public OrderDomainEventPublisher orderAggregateEventPublisher(DomainEventPublisher eventPublisher) {
      return new OrderDomainEventPublisher(eventPublisher);
    }
  }
  @Autowired
  private OrderDomainEventPublisher orderAggregateEventPublisher;

  protected void orderCreated() {

    orderAggregateEventPublisher.publish("Order",OrderDetailsMother.CHICKEN_VINDALOO_ORDER,
      Collections.singletonList(new OrderCreatedEvent(OrderDetailsMother.CHICKEN_VINDALOO_ORDER_DETAILS, OrderDetailsMother.DELIVERY_ADDRESS, "Ajanta")));

  }

}
