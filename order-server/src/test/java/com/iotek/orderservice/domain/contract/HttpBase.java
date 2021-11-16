package com.iotek.orderservice.domain.contract;
import com.iotek.orderservice.OrderDetailsMother;
import com.iotek.orderservice.domain.CommonJsonMapperInitializer;
import com.iotek.orderservice.domain.OrderRepository;
import com.iotek.orderservice.domain.OrderService;
import com.iotek.orderservice.web.OrderController;
import io.eventuate.common.json.mapper.JSonMapper;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.Before;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.setup.StandaloneMockMvcBuilder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public abstract class HttpBase {

  private StandaloneMockMvcBuilder controllers(Object... controllers) {
    CommonJsonMapperInitializer.registerMoneyModule();
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(JSonMapper.objectMapper);
    return MockMvcBuilders.standaloneSetup(controllers).setMessageConverters(converter);
  }

  @Before
  public void setup()  {
    OrderService orderService = mock(OrderService.class);
    OrderRepository orderRepository = mock(OrderRepository.class);
    OrderController orderController = new OrderController(orderService, orderRepository);

    when(orderRepository.findById(123456L)).
          thenReturn(OrderDetailsMother.CHICKEN_VINDALOO_ORDER);
    when(orderRepository.findById(555L)).thenReturn(null);
    RestAssuredMockMvc.standaloneSetup(controllers(orderController));

  }
}