package com.iotek.orderservice.domain;

public class OrderNotFoundException extends RuntimeException {
  public OrderNotFoundException(Long orderId) {
    super("Order not found" + orderId);
  }
}
