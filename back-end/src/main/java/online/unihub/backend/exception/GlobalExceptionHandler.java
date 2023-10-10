package online.unihub.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

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
    /**
     * Handles the exception if the student in the database does not exist.
     */
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(Exception exc) {
        return new ResponseEntity<>(
                ErrorResponse
                        .builder()
                        .message(exc.getMessage())
                        .occured(new Timestamp(System.currentTimeMillis()))
                        .build(),
                HttpStatus.NOT_FOUND
        );
    }
}