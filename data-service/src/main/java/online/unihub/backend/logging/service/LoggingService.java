package online.unihub.backend.logging.service;

import jakarta.annotation.PreDestroy;
import online.unihub.backend.exception.ErrorResponse;
import online.unihub.backend.exception.LoggingException;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.sql.Timestamp;

@Service
public class LoggingService {
    private final BufferedWriter bufferedWriter;


    public LoggingService() throws LoggingException {
        try {
            FileWriter fileWriter = new FileWriter(Paths.get("back-end-log.txt").toAbsolutePath().toString(), true);
            bufferedWriter  = new BufferedWriter(fileWriter);

            bufferedWriter.write(String.format(
                    "************************************************************%n" +
                    "STARTED THE APPLICATION%n" +
                    "%s%n" +
                    "************************************************************%n%n",
                    new Timestamp(System.currentTimeMillis())
            ));
        } catch (IOException e) {
            throw new LoggingException(e.getMessage());
        }
    }


    public void add(String method, String name) throws LoggingException {
        try {
            bufferedWriter.write(String.format(
                    "*********%n" +
                    "Method: %s%n" +
                    "Endpoint: %s%n" +
                    "Timestamp: %s%n" +
                    "*********%n%n",
                    method,
                    name,
                    new Timestamp(System.currentTimeMillis())
            ));
        } catch (IOException e) {
            throw new LoggingException(e.getMessage());
        }
    }


    public void addError(ErrorResponse response) throws LoggingException {
        try {
            bufferedWriter.write(String.format(
                    "****   ERROR   ****%n" +
                    "*********%n" +
                    "Error: %s%n" +
                    "Timestamp: %s%n" +
                    "*********%n%n",
                    response.getMessage(),
                    new Timestamp(System.currentTimeMillis())
            ));
        } catch (IOException e) {
            throw new LoggingException(e.getMessage());
        }
    }


    @PreDestroy
    public void close() throws LoggingException {
        try {
            bufferedWriter.write(String.format(
                    "*********%n" +
                    "ENDED THE APPLICATION%n" +
                    "%s%n" +
                    "*********%n%n%n%n",
                    new Timestamp(System.currentTimeMillis())
            ));

            bufferedWriter.close();
        } catch (IOException e) {
            throw new LoggingException(e.getMessage());
        }
    }
}
