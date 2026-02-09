package dev.kadu.autoflex.dto.common;

public record ApiResult<T>(String message, T data) {
}
