package com.ramiyappan.studentsystem.service;

import com.ramiyappan.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
