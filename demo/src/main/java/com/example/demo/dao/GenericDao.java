package com.example.demo.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.io.Serializable;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GenericDao<T, ID extends Serializable> {

    @PersistenceContext
    protected EntityManager entityManager;

    private final Class<T> entityClass;

    public void create(T entity) {
        entityManager.persist(entity);
    }

    public T get(ID id) {
        return entityManager.find(entityClass, id);
    }

    public void update(T entity) {
        entityManager.merge(entity);
    }

    public void delete(T entity) {
        entityManager.remove(entity);
    }

    public List<T> findAll() {
        String jpql = "SELECT e FROM " + entityClass.getSimpleName() + " e";

        return entityManager
            .createQuery(jpql, entityClass)
            .getResultList();
    }
}
