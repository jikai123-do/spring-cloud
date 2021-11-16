package com.iotek.orderservice.domain;

import com.iotek.orderservice.OrderDetailsMother;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.support.TransactionTemplate;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = OrderJpaTestConfiguration.class)
public class OrderJpaTest {
  @Resource
  private OrderRepository orderRepository;
  @Autowired
  private TransactionTemplate transactionTemplate;
  private   static long CONSUMER_ID = 1511300065921L;
  private static final long RESTAURANT_ID = 1L;
  private static  final String  APPROVAL_PENDING="APPROVAL_PENDING";
  private List<OrderLineItem> orderLineItems=new ArrayList<>();


  @Test
  public void saveAndAssert() {
    long orderId = transactionTemplate.execute((ts) -> {
      Order order = new Order(CONSUMER_ID, RESTAURANT_ID, OrderDetailsMother.DELIVERY_INFORMATION, orderLineItems);
      orderRepository.save(order);
      return order.getId();
    });
    transactionTemplate.execute((ts) -> {
      Order order = orderRepository.findById(orderId);
      assertNotNull(order);
      assertEquals(APPROVAL_PENDING, order.getState());
      assertEquals(RESTAURANT_ID, order.getRestaurantId());
      assertEquals(CONSUMER_ID, order.getConsumerId().longValue());
      assertEquals(orderLineItems, order.getLineItems());
      return null;
    });

  }

}
