package com.bookddy.app.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

  @Value("${server.servlet.context-path:/}")
  private String contextPath;

  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
        .info(new Info()
            .title("Bookddy API")
            .version("0.0.1")
            .description("Bookddy is your personal digital library and"
                + "reading community where book lovers unite to"
                + "discover, share, and discuss their literary adventures.")
            .contact(new Contact()
                .name("Bookddy team")
                .email("contact@bookddy.com")
                .url("https://bookddy-tw.pages.dev"))
            .license(new License()
                .name("Apache 2.0")
                .url("http://www.apache.org/licenses/LICENSE-2.0.html")))
        .servers(List.of(
            new Server()
                .url(contextPath)
                .description("Server URL")
        ));
  }
}