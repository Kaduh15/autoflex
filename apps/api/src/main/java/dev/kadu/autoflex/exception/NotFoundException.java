package dev.kadu.autoflex.exception;

public class NotFoundException extends RuntimeException {
  public NotFoundException(String message) {
    super(message);
  }

  public NotFoundException() {
    super("Recurso não encontrado");
  }
}