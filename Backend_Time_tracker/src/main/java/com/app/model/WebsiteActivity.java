package com.app.model;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "website_activity")
public class WebsiteActivity {
	 @Id
	    private String id;
	    private String userId;
	    private String url;
	    private long duration;
	    private LocalDateTime timestamp;
	    
	    public WebsiteActivity(String userId, String url, long duration, LocalDateTime timestamp) {
	        this.userId = userId;
	        this.url = url;
	        this.duration = duration;
	        this.timestamp = timestamp;
	    }   
}
