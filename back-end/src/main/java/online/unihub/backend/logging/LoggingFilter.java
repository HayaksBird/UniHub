package online.unihub.backend.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import online.unihub.backend.logging.service.LoggingService;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;

public class LoggingFilter extends OncePerRequestFilter {
    private final LoggingService loggingService;


    public LoggingFilter(LoggingService loggingService) {
        this.loggingService = loggingService;
    }


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
                                    throws ServletException, IOException {

        //Log user's trace
        loggingService.add(request.getMethod(), request.getRequestURI());
        filterChain.doFilter(request, response);
    }
}
