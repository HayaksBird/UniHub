package online.unihub.backend.app.service;

import online.unihub.backend.app.dao.CourseRepository;
import online.unihub.backend.app.entity.Course;
import online.unihub.backend.exception.ItemNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;


    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }


    public Course getCourse(String courseName) {
        //Bring to correct format
        courseName = courseName.replaceAll("\\s", "").toUpperCase();

        var course = courseRepository.findByCourseName(courseName);

        if (course.isPresent()) return course.get();
        throw new ItemNotFoundException(Course.class, courseName);
    }


    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }


    public void addCourse(Course course) {
        courseRepository.save(course);
    }


    public void deleteCourse(int id) {
        courseRepository.deleteById(id);
    }
}