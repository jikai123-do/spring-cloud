package com.iotek.orderservice.main;

import com.iotek.orderservice.grpc.GrpcConfiguration;
import com.iotek.orderservice.messaging.OrderServiceMessagingConfiguration;
import com.iotek.orderservice.service.OrderCommandHandlersConfiguration;
import com.iotek.orderservice.web.OrderWebConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@MapperScan("com.iotek.orderservice.domain")
@Import({OrderWebConfiguration.class, OrderCommandHandlersConfiguration.class,  OrderServiceMessagingConfiguration.class,
      GrpcConfiguration.class,
       })

public class OrderServiceMain {

  public static void main(String[] args) {
    SpringApplication.run(OrderServiceMain.class, args);
  }
}
