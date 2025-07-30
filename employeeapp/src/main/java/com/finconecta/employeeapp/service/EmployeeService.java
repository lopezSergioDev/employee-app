package com.finconecta.employeeapp.service;

import com.finconecta.employeeapp.entity.Employee;
import com.finconecta.employeeapp.exception.EmployeeNotFoundException;
import com.finconecta.employeeapp.mongo.ActivityLog;
import com.finconecta.employeeapp.mongo.ActivityLogRepository;
import com.finconecta.employeeapp.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;
    private final ActivityLogRepository activityLogRepo;

    public EmployeeService(EmployeeRepository repo, ActivityLogRepository activityLogRepo) {
        this.repo = repo;
        this.activityLogRepo = activityLogRepo;
    }

    public List<Employee> getAll() {
        return repo.findAll();
    }

    public Employee getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    public Employee create(Employee employee) {
        Employee saved = repo.save(employee);

        activityLogRepo.save(new ActivityLog(
                null,
                "Created employee: " + saved.getFirstName() + " " + saved.getLastName(),
                "admin",
                new java.util.Date()
        ));

        return saved;
    }

    public Employee update(Long id, Employee updatedEmployee) {
        Employee existing = getById(id);
        existing.setFirstName(updatedEmployee.getFirstName());
        existing.setLastName(updatedEmployee.getLastName());
        existing.setEmail(updatedEmployee.getEmail());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
        activityLogRepo.save(new ActivityLog(
                null,
                "Deleted employee ID: " + id,
                "admin",
                new java.util.Date()
        ));
    }
}
