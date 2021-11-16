package net.com.iotek.apiagateway.contract;
import  net.com.iotek.apiagateway.proxies.OrderInfo;
import net.chrisrichardson.ftgo.apiagateway.orders.OrderDestinations;
import net.com.iotek.apiagateway.proxies.OrderNotFoundException;
import net.com.iotek.apiagateway.proxies.OrderServiceProxy;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.stubrunner.spring.AutoConfigureStubRunner;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.reactive.function.client.WebClient;
import static org.junit.Assert.assertEquals;
@RunWith(SpringRunner.class)
@SpringBootTest(classes= net.com.iotek.apiagateway.contract.TestConfiguration.class,
        webEnvironment= SpringBootTest.WebEnvironment.NONE)
@AutoConfigureStubRunner(ids = {"net.com.iotek.orderservice.contract:order-server"})
@DirtiesContext
public class OrderServiceProxyIntegrationTest {
  private int port=9000;
  private OrderDestinations orderDestinations;
  private OrderServiceProxy orderService;
  @Before
  public void setUp() throws Exception {
    orderDestinations = new OrderDestinations();
    String orderServiceUrl = "http://localhost:" + port;
    orderDestinations.setOrderServiceUrl(orderServiceUrl);
    orderService = new OrderServiceProxy(orderDestinations, WebClient.create());
  }
  @Test
  public void verifyExistingOrder() {
    OrderInfo result = orderService.findOrderById("123456").block();
    assertEquals("123456", result.getOrderId());
    assertEquals("APPROVAL_PENDING", result.getState());
  }
  @Test(expected = OrderNotFoundException.class)
  public void missingOrder() {
    orderService.findOrderById("555").block();
  }
}
