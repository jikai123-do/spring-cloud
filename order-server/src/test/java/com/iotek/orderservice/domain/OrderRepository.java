package com.iotek.orderservice.domain;
import org.springframework.data.repository.CrudRepository;

public class OrderRepository implements CrudRepository<Order, Long> {



     void  save(S order){}

    @Override
    public <S extends Order> S save(S s) {
        return null;
    }

    @Override
    public <S extends Order> Iterable<S> saveAll(Iterable<S> iterable) {
        return null;
    }

    Order findById  (Long id){

        return null;
         }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public Iterable<com.iotek.orderservice.domain.Order> findAll() {
        return null;
    }

    @Override
    public Iterable<com.iotek.orderservice.domain.Order> findAllById(Iterable<Long> iterable) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public void deleteAll(Iterable<? extends com.iotek.orderservice.domain.Order> iterable) {

    }

    @Override
    public void delete(com.iotek.orderservice.domain.Order order) {

    }


}
