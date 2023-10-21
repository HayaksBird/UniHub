package online.unihub.backend.app.service;

import online.unihub.backend.app.dao.ProfessorRepository;
import online.unihub.backend.app.entity.Professor;
import online.unihub.backend.exception.ItemNotFoundException;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class ProfessorService {
    private final ProfessorRepository professorRepository;
    private final StringSimilarityService stringSimilarityService;


    public ProfessorService(ProfessorRepository professorRepository,
                            StringSimilarityService stringSimilarityService) {

        this.professorRepository = professorRepository;
        this.stringSimilarityService = stringSimilarityService;
    }


    public List<Professor> getProfessor(String fullName) {
        List<Professor> similarProfs = new LinkedList<>();
        List<Professor> allProfs;

        allProfs = professorRepository.findAll();

        for (Professor prof : allProfs) {
            if (stringSimilarityService.areSimilar(fullName, prof.getFullName()))
                similarProfs.add(prof);
        }

        if (similarProfs.isEmpty())
            throw new ItemNotFoundException(Professor.class, fullName);

        return similarProfs;
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