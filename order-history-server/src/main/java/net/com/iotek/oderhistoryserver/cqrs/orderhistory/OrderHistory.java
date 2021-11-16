package net.com.iotek.oderhistoryserver.cqrs.orderhistory;

import net.com.iotek.oderhistoryserver.cqrs.orderhistory.dynamodb.Order;

import java.util.List;
import java.util.Optional;

public class OrderHistory {
  private List<Order> orders;
  private Optional<String> startKey;

  public OrderHistory(List<Order> orders, Optional<String> startKey) {
    this.orders = orders;
    this.startKey = startKey;
  }

  public List<Order> getOrders() {
    return orders;
  }

  public Optional<String> getStartKey() {
    return startKey;
  }
}
