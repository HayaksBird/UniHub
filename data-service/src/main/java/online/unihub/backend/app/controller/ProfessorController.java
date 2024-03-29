package online.unihub.backend.app.controller;

import online.unihub.backend.app.entity.Professor;
import online.unihub.backend.app.service.ProfessorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/professors")
@RestController
public class ProfessorController {
    private final ProfessorService professorService;


    //CONSTRUCTORS
    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }


    @PostMapping("")
    public ResponseEntity<Void> addProfessor(@RequestBody Professor professor) {
        professorService.addProfessor(professor);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/{input}")
    public ResponseEntity<List<Professor>> getProfessor(@PathVariable String input,
                                                        @RequestParam(name = "byName") boolean byName) {
        if (byName)
            return new ResponseEntity<>(professorService.getProfessorsByName(input), HttpStatus.OK);
        else
            return new ResponseEntity<>(professorService.getProfessorsByCourse(input), HttpStatus.OK);
    }


    @GetMapping("")
    public ResponseEntity<List<Professor>> getProfessors() {
        return new ResponseEntity<>(professorService.getAllProfessors(), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable int id) {
        professorService.deleteProfessor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
