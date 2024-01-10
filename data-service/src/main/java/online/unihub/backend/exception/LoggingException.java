package online.unihub.backend.exception;

import java.io.IOException;

public class LoggingException extends IOException {
    public LoggingException(String msg) {
        super(String.format(
                "*****%n" +
                "ERROR WITH THE LOGGER%n" +
                "%s%n" +
                "*****",
                msg));
    }
}
