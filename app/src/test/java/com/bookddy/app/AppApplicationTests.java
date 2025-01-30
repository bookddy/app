package com.bookddy.app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.bookddy.app.configuration.TestDatabaseConfig;

@SpringBootTest
class AppApplicationTests extends TestDatabaseConfig {
	@Test
	void contextLoads() {
	}
}