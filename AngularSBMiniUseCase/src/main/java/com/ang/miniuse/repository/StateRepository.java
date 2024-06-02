package com.ang.miniuse.repository;

import com.ang.miniuse.entities.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateRepository extends JpaRepository<State, Integer> {

    List<State> findByCountryId(Integer id);

}
