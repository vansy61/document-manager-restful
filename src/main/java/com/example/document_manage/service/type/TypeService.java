package com.example.document_manage.service.type;

import com.example.document_manage.model.DTO.ITypeWithCountDocument;
import com.example.document_manage.model.Type;
import com.example.document_manage.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeService implements ITypeService {
    @Autowired
    private TypeRepository typeRepository;

    @Override
    public Iterable<Type> findAll() {
        return typeRepository.findAll();
    }

    @Override
    public Iterable<ITypeWithCountDocument> findAllWithCountDocument() {
        return typeRepository.findAllWithCountDocument();
    }

    @Override
    public void save(Type type) {
        typeRepository.save(type);
    }

    @Override
    public Type findById(Long id) {
        return typeRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        typeRepository.deleteById(id);
    }
}
