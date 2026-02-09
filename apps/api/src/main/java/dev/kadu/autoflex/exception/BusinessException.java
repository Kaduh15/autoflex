package dev.kadu.autoflex.exception;

public class BusinessException extends RuntimeException {
  public BusinessException(String message) {
    super(message);
  }

  public BusinessException() {
    super("Erro de negócio");
  }
}