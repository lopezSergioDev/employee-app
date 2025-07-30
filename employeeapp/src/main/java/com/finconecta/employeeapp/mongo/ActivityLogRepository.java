package com.finconecta.employeeapp.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {}