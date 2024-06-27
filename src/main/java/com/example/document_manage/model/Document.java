package com.example.document_manage.model;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.sql.Date;

@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Mã không được để trống")
    @Size(max = 10, min = 3, message = "Mã phải từ 3 đến 10 ký tự")
    private String code;

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 255, message = "Tên không được quá 255 ký tự")
    private String name;

    @NotNull(message = "Năm không được để trống")
    @Min(value = 1900, message = "Năm phải >= 1900")
    @Max(value = 2024, message = "Năm phải <= 2025")
    private Integer year;

    @NotBlank(message = "Mô tả không được để trống")
    @Size(max = 255, message = "Mô tả không được quá 255 ký tự")
    private String description;

    @OneToOne
    @JoinColumn(name = "typeId")
    private Type type;

    public Document() {
    }

    public Document(Long id, String code, String name, Integer year, String description, Type type) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.year = year;
        this.description = description;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
