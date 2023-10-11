package online.unihub.backend.app.service;

import online.unihub.backend.app.dao.ProfessorRepository;
import online.unihub.backend.app.entity.Professor;
import online.unihub.backend.exception.ItemNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {
    private final ProfessorRepository professorRepository;


    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }


    public Professor getProfessor(int id) {
        var professor = professorRepository.findById(id);

        if (professor.isPresent()) return professor.get();
        throw new ItemNotFoundException(Professor.class, id);
    }


    public List<Professor> getAllProfessors() {
        return professorRepository.findAll();
    }


    public void addProfessor(Professor professor) {
        professorRepository.save(professor);
    }


    public void deleteProfessor(int id) {
        professorRepository.deleteById(id);
    }
}
