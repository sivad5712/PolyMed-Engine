package com.example.polymed.patientservice.dto;

public class SuccessResponse<T> {
    private boolean success = true;
    private String message;
    private T data;
    private String correlationId;

    public SuccessResponse() {}

    public SuccessResponse(String message, T data, String correlationId) {
        this.message = message;
        this.data = data;
        this.correlationId = correlationId;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
    public String getCorrelationId() { return correlationId; }
    public void setCorrelationId(String correlationId) { this.correlationId = correlationId; }
}
