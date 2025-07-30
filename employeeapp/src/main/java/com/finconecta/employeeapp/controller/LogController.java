package com.finconecta.employeeapp.controller;

import com.finconecta.employeeapp.mongo.ActivityLog;
import com.finconecta.employeeapp.mongo.ActivityLogRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogController {

    private final ActivityLogRepository repo;

    public LogController(ActivityLogRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<ActivityLog> getAllLogs() {
        return repo.findAll();
    }
}