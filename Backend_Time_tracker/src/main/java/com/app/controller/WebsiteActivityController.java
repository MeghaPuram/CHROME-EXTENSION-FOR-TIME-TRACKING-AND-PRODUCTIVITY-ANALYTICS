package com.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.WebsiteActivity;
import com.app.service.WebsiteActivityService;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin("http://localhost:5173")
public class WebsiteActivityController {
	@Autowired
	private WebsiteActivityService service;

	// API to get all tracked users data (GET/api/activity)
	@GetMapping
	public ResponseEntity<List<WebsiteActivity>> getWebsiteActivity() {
		return new ResponseEntity<>(service.getWebsiteActivity(), HttpStatus.FOUND);
	}

	// API to add data for a user (POST /api/activity/track)
	@PostMapping("/track")
	public ResponseEntity<String> trackWebsiteActivity(@RequestBody WebsiteActivity activity) {
		System.out.println("Received activity: " + activity.getUrl());
		service.saveActivity(activity);
		return ResponseEntity.ok("Activity tracked successfully.");
	}
	

	// API to get all tracked websites for a user(GET/api/activity/user-report/{userId})
	@GetMapping("/user-report/{userId}")
	public ResponseEntity<List<WebsiteActivity>> getUserActivity(@PathVariable String userId) {
		System.out.println("Fetching activities for user: " + userId);
		List<WebsiteActivity> activities = service.getUserActivities(userId);
		return ResponseEntity.ok(activities);
	}

	// API to get weekly productivity report (GET /api/activity/weekly-report/{userId})
	@GetMapping("/weekly-report/{userId}")
	public ResponseEntity<Map<String, Integer>> getUserWeeklyReport(@PathVariable String userId) {
		System.out.println("Fetching weekly report for user: " + userId);
		Map<String, Integer> report= service.getWeeklyProductivityReport(userId);
		return ResponseEntity.ok(report);
		
	}

	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<String> delete(@PathVariable String userId) {
		service.delete(userId);
		return ResponseEntity.ok("Activity delete successfully.");
	}

}
