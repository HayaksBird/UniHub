package online.unihub.backend.service;

import online.unihub.backend.dao.ProfessorRepository;
import online.unihub.backend.entity.Professor;
import online.unihub.backend.exception.ItemNotFoundException;
import org.springframework.stereotype.Service;

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


    public void addProfessor(Professor professor) {
        professorRepository.save(professor);
    }


    public void deleteProfessor(int id) {
        professorRepository.deleteById(id);
    }
}
