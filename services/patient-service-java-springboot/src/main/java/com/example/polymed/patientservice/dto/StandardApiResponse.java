package com.example.polymed.patientservice.dto;

public class StandardApiResponse<T> {
    private boolean success = true;
    private String message;
    private T data;
    private TechnologyTraceResponse technologyTrace;
    private String correlationId;

    public StandardApiResponse() {}

    public StandardApiResponse(String message, T data, TechnologyTraceResponse technologyTrace, String correlationId) {
        this.message = message;
        this.data = data;
        this.technologyTrace = technologyTrace;
        this.correlationId = correlationId;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
    public TechnologyTraceResponse getTechnologyTrace() { return technologyTrace; }
    public void setTechnologyTrace(TechnologyTraceResponse technologyTrace) { this.technologyTrace = technologyTrace; }
    public String getCorrelationId() { return correlationId; }
    public void setCorrelationId(String correlationId) { this.correlationId = correlationId; }
}
