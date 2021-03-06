package config;


import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class swagger2 {

    public Docket ceratRestApi(){

    return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
            .apis(RequestHandlerSelectors.basePackage("com.iotek"))
            .paths(PathSelectors.any())
            .build();

    }

   private ApiInfo apiInfo(){



        return new ApiInfoBuilder().title("customer.service  api文档")
                                   .description("用户对外服务的接口文档")
                                   .termsOfServiceUrl("/")
                                   .version("v1")
                                   .build();

   }



}
