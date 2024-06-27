package com.example.document_manage.service.document;

import com.example.document_manage.model.Document;
import com.example.document_manage.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class DocumentService implements IDocumentService {
    @Autowired
    private DocumentRepository documentRepository;
    @Override
    public Page<Document> findAll(int page, int size, String sortString, String search, Long typeId) {
        //sort is "name desc" or "name asc"
        Sort sort;
        System.out.println(sortString);
        if(sortString != null && !sortString.isEmpty()) {
            String[] sorts = sortString.split(" ");
            sort = Sort.by(sorts[1].equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sorts[0]);
        }else {
           sort = Sort.by(Sort.Direction.DESC, "id");
        }
        Pageable pageable = PageRequest.of(page, size, sort);

        if(search != null && !search.isEmpty() && typeId != null ) {
            return documentRepository.searchByMultipleColumnsAndType(search, typeId, pageable);
        }
        else if(typeId != null) {
            return documentRepository.findByTypeId(typeId, pageable);
        } else if (search != null && !search.isEmpty()) {
            return documentRepository.searchByMultipleColumns(search, pageable);

    }else {
            return documentRepository.findAll(pageable);
        }
    }

    @Override
    public void save(Document document) {
        documentRepository.save(document);
    }

    @Override
    public Document findById(Long id) {
        return documentRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        documentRepository.deleteById(id);
    }
}
