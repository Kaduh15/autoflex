package dev.kadu.autoflex.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import dev.kadu.autoflex.dto.common.ApiResult;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiResult<Void>> handleNotFound(NotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(new ApiResult<>(ex.getMessage(), null));
  }

  @ExceptionHandler(BusinessException.class)
  public ResponseEntity<ApiResult<Void>> handleBusiness(BusinessException ex) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(new ApiResult<>(ex.getMessage(), null));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResult<Void>> handleInvalidBody(MethodArgumentNotValidException ex) {
    String msg = ex.getBindingResult().getFieldErrors().stream()
        .findFirst()
        .map(err -> err.getDefaultMessage())
        .orElse("Dados inválidos");

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(new ApiResult<>(msg, null));
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiResult<Void>> handleConstraintViolation(ConstraintViolationException ex) {
    String msg = ex.getConstraintViolations().stream()
        .findFirst()
        .map(v -> v.getMessage())
        .orElse("Dados inválidos");

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(new ApiResult<>(msg, null));
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<ApiResult<Void>> handleDataIntegrity(DataIntegrityViolationException ex) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(new ApiResult<>("Conflito de dados (provável duplicidade ou restrição no banco).", null));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResult<Void>> handleGeneric(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ApiResult<>("Erro interno", null));
  }
}
