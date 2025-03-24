package com.app.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.model.WebsiteActivity;
import com.app.repository.WebsiteActivityRepository;

@Service
public class WebsiteActivityService {
	@Autowired
	private WebsiteActivityRepository repository;

	public WebsiteActivity saveActivity(WebsiteActivity activity) {
		activity.setTimestamp(LocalDateTime.now());
		return repository.save(activity);
	}

	public List<WebsiteActivity> getUserActivities(String userId) {
		return repository.findByUserId(userId);
	}

	public Map<String, Integer> getWeeklyProductivityReport(String userId) {
		List<WebsiteActivity> activities = repository.findByUserId(userId);

		int totalProductiveTime = 0;
		int totalUnproductiveTime = 0;

		for (WebsiteActivity activity : activities) {
			if (isProductive(activity.getUrl())) {
				totalProductiveTime += activity.getDuration();
			} else {
				totalUnproductiveTime += activity.getDuration();
			}
		}

		Map<String, Integer> report = new HashMap<>();
		report.put("totalProductiveTime", totalProductiveTime);
		report.put("totalUnproductiveTime", totalUnproductiveTime);

		return report;
	}

	private boolean isProductive(String url) {
		return url.contains("leetcode") || url.contains("github") || url.contains("stackoverflow");
	}

	public void delete(String userId) {
		repository.deleteById(userId);

	}

	public List<WebsiteActivity> getWebsiteActivity() {
		List<WebsiteActivity> listOfuser = repository.findAll();
		return listOfuser;
	}
}
