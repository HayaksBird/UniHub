package online.unihub.backend.app.controller;

import online.unihub.backend.app.entity.Professor;
import online.unihub.backend.app.service.ProfessorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/test")
@RestController
public class TestController {
    private final ProfessorService professorService;


    //CONSTRUCTORS
    public TestController(ProfessorService professorService) {
        this.professorService = professorService;
    }


    @PostMapping("/professors")
    public ResponseEntity<Void> addProfessor(@RequestBody Professor professor) {
        professorService.addProfessor(professor);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/professors/{id}")
    public ResponseEntity<Professor> getProfessor(@PathVariable int id) {
        return new ResponseEntity<>(professorService.getProfessor(id), HttpStatus.OK);
    }


    @GetMapping("/professors")
    public ResponseEntity<List<Professor>> getProfessors() {
        return new ResponseEntity<>(professorService.getAllProfessors(), HttpStatus.OK);
    }


    @DeleteMapping("/professors/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable int id) {
        professorService.deleteProfessor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
