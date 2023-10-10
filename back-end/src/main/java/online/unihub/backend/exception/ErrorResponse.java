package online.unihub.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;

import java.sql.Timestamp;

@Builder
@AllArgsConstructor
public class ErrorResponse {
    String message;

    Timestamp occured;
}
