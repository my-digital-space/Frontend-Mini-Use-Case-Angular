package com.ang.miniuse.controller;

import com.ang.miniuse.dto.CityDto;
import com.ang.miniuse.dto.StateDto;
import com.ang.miniuse.entities.Country;
import com.ang.miniuse.service.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cache")
@CrossOrigin(origins = "http://localhost:4200")
public class CacheController {

    @Autowired
    private CacheService cacheService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello World!";
    }

    @GetMapping("/getCountriesData")
    public ResponseEntity<List<Country>> getCountriesData() {
        return ResponseEntity.ok(cacheService.getCountryList());
    }

    @GetMapping("/getStatesData")
    public ResponseEntity<List<StateDto>> getStatesData() {
        return ResponseEntity.ok(cacheService.getStateList());
    }

    // get all states for a particular Country ID
    @GetMapping("/getStatesDataById")
    public ResponseEntity<List<StateDto>> getStatesDataById(
            @RequestHeader(required = true) Integer countryId) {
        return ResponseEntity.ok(cacheService.getStateListById(countryId));
    }

    @GetMapping("/getCitiesData")
    public ResponseEntity<List<CityDto>> getCitiesData() {
        return ResponseEntity.ok(cacheService.getCityList());
    }

    // get all cities for a particular State ID
    @GetMapping("/getCitiesDataById")
    public ResponseEntity<List<CityDto>> getCitiesDataById(
            @RequestHeader(required = true) Integer stateId) {
        return ResponseEntity.ok(cacheService.getCityListById(stateId));
    }


}
