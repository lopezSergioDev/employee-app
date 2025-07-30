package com.finconecta.employeeapp.mongo;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "activity_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLog {

    @Id
    private String id;

    private String action;   // e.g., "Created employee"
    private String actor;    // e.g., "admin"
    private Date timestamp;
}