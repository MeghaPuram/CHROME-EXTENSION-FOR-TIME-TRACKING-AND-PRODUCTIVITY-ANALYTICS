package com.app.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.app.model.WebsiteActivity;

public interface WebsiteActivityRepository extends MongoRepository<WebsiteActivity, String> {
    
	List<WebsiteActivity> findByUserId(String userId);
}
