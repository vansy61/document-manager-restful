package com.example.document_manage.controller;

import com.example.document_manage.model.Document;
import com.example.document_manage.model.Type;
import com.example.document_manage.service.document.DocumentService;
import com.example.document_manage.service.type.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/documents")
public class DocumentRestController {
    @Autowired
    private DocumentService documentService;
    @Autowired
    private TypeService typeService;

    @ModelAttribute("types")
    public Iterable<Type> types() {
        return typeService.findAll();
    }

    @RequestMapping
    public ResponseEntity<Page<Document>> index(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String sort,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") Long typeId
    ) {
        Page<Document> documents = documentService.findAll(page, size, sort, search, typeId);
        return new ResponseEntity<>(documents, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<?> create(
            @Validated @RequestBody Document document,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasFieldErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        documentService.save(document);
        return new ResponseEntity<>(document, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @Validated @RequestBody Document document,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasFieldErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        documentService.save(document);
        return new ResponseEntity<>(document, HttpStatus.ACCEPTED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Document> delete(@PathVariable Long id) {
        Document document = documentService.findById(id);
        if(document == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        documentService.delete(id);
        return new ResponseEntity<>(document, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Document> show(@PathVariable Long id) {
        Document document = documentService.findById(id);
        if(document == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(document, HttpStatus.OK);
    }
}
