package online.unihub.backend.app.controller;

import online.unihub.backend.app.entity.Course;
import online.unihub.backend.app.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/courses")
@RestController
public class CourseController {
    private final CourseService courseService;


    //CONSTRUCTORS
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }


    @PostMapping("")
    public ResponseEntity<Void> addCourse(@RequestBody Course course) {
        courseService.addCourse(course);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/{courseName}")
    public ResponseEntity<Course> getCourse(@PathVariable String courseName) {
        return new ResponseEntity<>(courseService.getCourse(courseName), HttpStatus.OK);
    }


    @GetMapping("")
    public ResponseEntity<List<Course>> getCourses() {
        return new ResponseEntity<>(courseService.getAllCourses(), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable int id) {
        courseService.deleteCourse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}