package net.com.iotek.oderhistoryserver.orderhistory.contracts;

import io.eventuate.tram.messaging.common.ChannelMapping;
import io.eventuate.tram.messaging.common.DefaultChannelMapping;
import io.eventuate.tram.spring.cloudcontractsupport.EventuateContractVerifierConfiguration;
import io.eventuate.tram.spring.commands.producer.TramCommandProducerConfiguration;
import io.eventuate.tram.spring.consumer.common.TramNoopDuplicateMessageDetectorConfiguration;
import io.eventuate.tram.spring.inmemory.TramInMemoryCommonConfiguration;
import net.com.iotek.oderhistoryserver.cqrs.orderhistory.OrderHistoryDao;
import net.com.iotek.oderhistoryserver.cqrs.orderhistory.dynamodb.Order;
import net.com.iotek.oderhistoryserver.cqrs.orderhistory.dynamodb.SourceEvent;
import net.com.iotek.oderhistoryserver.cqrs.orderhistory.messaging.OrderHistoryServiceMessagingConfiguration;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.stubrunner.StubFinder;
import org.springframework.cloud.contract.stubrunner.spring.AutoConfigureStubRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.Optional;
import static io.eventuate.util.test.async.Eventually.eventually;
import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OrderHistoryEventHandlersTest.TestConfiguration.class,
        webEnvironment = SpringBootTest.WebEnvironment.NONE)
@AutoConfigureStubRunner(ids = {"net.com.iotek.orderservice.contract:order-server"})
@DirtiesContext
public class OrderHistoryEventHandlersTest {
  @Configuration
  @EnableAutoConfiguration
  @Import({OrderHistoryServiceMessagingConfiguration.class,
          TramCommandProducerConfiguration.class,
          TramInMemoryCommonConfiguration.class,
          TramNoopDuplicateMessageDetectorConfiguration.class,
          EventuateContractVerifierConfiguration.class})
  public static class TestConfiguration {
    @Bean
    public ChannelMapping channelMapping() {
      return new DefaultChannelMapping.DefaultChannelMappingBuilder().build();
    }
    @Bean
    public OrderHistoryDao orderHistoryDao() {
      return mock(OrderHistoryDao.class);
    }
  }
  @Autowired
  private StubFinder stubFinder;
  @Autowired
  private OrderHistoryDao orderHistoryDao;
  @Test
  public void shouldHandleOrderCreatedEvent()  {
    stubFinder.trigger("orderCreatedEvent");
    eventually(() -> {
      verify(orderHistoryDao.addOrder(any(Order.class), any(Optional.class)));


    });
  }








}
