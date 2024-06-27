package com.example.document_manage.repository;

import com.example.document_manage.model.DTO.ITypeWithCountDocument;
import com.example.document_manage.model.Type;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TypeRepository extends PagingAndSortingRepository<Type, Long> {
    @Query(nativeQuery = true, value = "select t.id, t.name, count(d.id) as count from type t left join document d on t.id = d.typeId group by t.id")
    Iterable<ITypeWithCountDocument> findAllWithCountDocument();
}
