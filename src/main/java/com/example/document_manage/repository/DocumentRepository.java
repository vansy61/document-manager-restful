package com.example.document_manage.repository;

import com.example.document_manage.model.Document;
import com.example.document_manage.model.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface DocumentRepository extends PagingAndSortingRepository<Document, Long> {

    @Query("select d from Document d where (d.code like %:search% or d.name like %:search% or d.description like %:search%) AND d.type.id = :typeId")
    Page<Document> searchByMultipleColumnsAndType(@Param("search") String search, @Param("typeId") Long typeId, Pageable pageable);

    @Query("select d from Document d where (d.code like %:search% or d.name like %:search% or d.description like %:search%) ")
    Page<Document> searchByMultipleColumns(@Param("search") String search, Pageable pageable);

    Page<Document> findByTypeId(Long type_id, Pageable pageable);
}
