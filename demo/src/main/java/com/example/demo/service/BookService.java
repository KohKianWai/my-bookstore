package com.example.demo.service;

import com.example.demo.dao.BookDao;
import com.example.demo.dto.BookDto;
import com.example.demo.entity.BookBean;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookService {

    private final BookDao bookDao;

    public List<BookBean> getAllBooks(){
        return bookDao.findAll();
    }

    public BookBean getBookById(String id){
        return bookDao.get(id);
    }

    @Transactional
    public BookBean createBook(BookBean bookBean) {
        bookBean.setCreatedDate(LocalDateTime.now());
        bookDao.create(bookBean);
        return bookBean;
    }

    @Transactional
    public void uploadContent(String id, byte[] content) {
        var bookBean = bookDao.get(id);
        if(bookBean != null){
            bookBean.setContent(content);
        }
        bookDao.update(bookBean);
    }

    @Transactional
    public void uploadCoverImage(String id, byte[] content) {
        var bookBean = bookDao.get(id);
        if (bookBean != null) {
            bookBean.setCoverImage(content);
        }
        bookDao.update(bookBean);
    }

    @Transactional
    public boolean updateBook(String id, BookBean bookBean) {
        BookBean existingBook = bookDao.get(id);
        if (existingBook == null) {
            return false;
        }

        existingBook.setName(bookBean.getName());
        existingBook.setSubject(bookBean.getSubject());
        existingBook.setDescription(bookBean.getDescription());
        existingBook.setAuthorId(bookBean.getAuthorId());
        existingBook.setCategoryId(bookBean.getCategoryId());
        existingBook.setPrice(bookBean.getPrice());

        bookDao.update(existingBook);

        return true;
    }

    @Transactional
    public boolean deleteBookById(String id) {
        var book = bookDao.get(id);
        if (book == null) {
            return false;
        }

        bookDao.delete(book);
        return true;
    }
}
