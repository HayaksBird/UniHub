package online.unihub.backend.exception;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Builder
@Data
public class ErrorResponse {
    String message;

    Timestamp occured;
}
