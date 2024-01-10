package online.unihub.backend.logging;

import online.unihub.backend.logging.service.LoggingService;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    private final LoggingService loggingService;


    public FilterConfig(LoggingService loggingService) {
        this.loggingService = loggingService;
    }


    @Bean
    public FilterRegistrationBean<LoggingFilter> myFilter() {
        FilterRegistrationBean<LoggingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new LoggingFilter(loggingService));
        return registrationBean;
    }
}
