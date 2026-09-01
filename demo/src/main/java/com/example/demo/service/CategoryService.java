package com.example.demo.service;

import com.example.demo.dao.CategoryDao;
import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.CategoryBean;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryDao categoryDao;

    public List<CategoryBean> getAllCategories(){
        return categoryDao.findAll();
    }

    public CategoryBean getCategoryById(String id){
        return categoryDao.get(id);
    }

    @Transactional
    public void createCategory(CategoryBean categoryBean){
        categoryDao.create(categoryBean);
    }

    @Transactional
    public boolean deleteCategoryById(String id){
        var categoryBean = categoryDao.get(id);
        if(categoryBean == null){
            return false;
        }

        categoryDao.delete(categoryBean);
        return true;
    }

    @Transactional
    public boolean updateCategory(String id, CategoryBean categoryBean){
        var category = categoryDao.get(id);
        if(category== null){
            return false;
        }

        category.setName(categoryBean.getName());
        category.setDescription(categoryBean.getDescription());
        categoryDao.update(category);
        return true;
    }
}
