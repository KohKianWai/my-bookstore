package com.example.demo.service;

import com.example.demo.dao.AuthorDao;
import com.example.demo.dto.AuthorDto;
import com.example.demo.entity.AuthorBean;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthorService {

    private final AuthorDao authorDao;

    public List<AuthorBean> getAllAuthors(){
        return authorDao.findAll();
    }

    public AuthorBean getAuthorById(String id){
        return authorDao.get(id);
    }

    @Transactional
    public void createAuthor(AuthorBean authorBean) {
        authorDao.create(authorBean);
    }

    @Transactional
    public boolean updateAuthor(String id, AuthorBean authorBean) {
        var author = authorDao.get(id);
        if (author == null) {
            return false;
        }

        author.setName(authorBean.getName());
        author.setEmail(authorBean.getEmail());
        author.setCountry(authorBean.getCountry());
        authorDao.update(author);
        return true;
    }

    @Transactional
    public boolean deleteAuthorById(String id) {
        var author = authorDao.get(id);
        if (author == null) {
            return false;
        }
        authorDao.delete(author);
        return true;
    }
}
