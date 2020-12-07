package config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RefreshScope
@RestController
public class TestController {


    @Value("${from}")
    private String from;


    @GetMapping("/from")
    public String test() {

        System.out.println(from);
        return  this.from;
    }





}