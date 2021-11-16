package com.iotek.orderservice.domain;

import com.iotek.orderservice.proxies.BillInfo;
import com.iotek.orderservice.proxies.DeliveryInfo;
import com.iotek.orderservice.proxies.OrderInfo;
import com.iotek.orderservice.proxies.TicketInfo;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import reactor.util.function.Tuple4;

import java.util.List;
import java.util.Optional;

public class OrderDetails {

  private OrderInfo orderInfo;

  public OrderDetails() {
  }

  public OrderDetails(OrderInfo orderInfo) {
    this.orderInfo = orderInfo;
  }

  public OrderDetails(OrderInfo orderInfo,
                      Optional<TicketInfo> ticketInfo,
                      Optional<DeliveryInfo> deliveryInfo,
                      Optional<BillInfo> billInfo) {
    this(orderInfo);
    System.out.println("FIXME");
  }

  public OrderDetails(long consumerId, long ajantaId, List<OrderLineItem> chickenVindalooLineItems, Money chickenVindalooOrderTotal) {
  }

  @Override
  public boolean equals(Object o) {
    return EqualsBuilder.reflectionEquals(this, o);
  }

  @Override
  public int hashCode() {
    return HashCodeBuilder.reflectionHashCode(this);
  }

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this);
  }


  public OrderInfo getOrderInfo() {
    return orderInfo;
  }

  public void setOrderInfo(OrderInfo orderInfo) {
    this.orderInfo = orderInfo;
  }


  public static OrderDetails makeOrderDetails(Tuple4<OrderInfo, Optional<TicketInfo>, Optional<DeliveryInfo>, Optional<BillInfo>> info) {
    return new OrderDetails(info.getT1(), info.getT2(), info.getT3(), info.getT4());
  }
}
