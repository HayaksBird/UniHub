package online.unihub.backend.exception;

import online.unihub.backend.logging.service.LoggingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.sql.Timestamp;

/**
 * Global exception handling class for all controllers.
 */
/*
NOTE: This class can process exceptions thrown only from the methods,
that are executed because some method in a controller class has been triggered.
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    private final LoggingService loggingService;


    public GlobalExceptionHandler(LoggingService loggingService) {
        this.loggingService = loggingService;
    }


    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(Exception exc) throws LoggingException {
        ErrorResponse response = ErrorResponse
                .builder()
                .message(exc.getMessage())
                .occured(new Timestamp(System.currentTimeMillis()))
                .build();

        loggingService.addError(response);

        return new ResponseEntity<>(
                response,
                HttpStatus.NOT_FOUND
        );
    }
}