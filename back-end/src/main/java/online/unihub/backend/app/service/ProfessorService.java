package online.unihub.backend.app.service;

import online.unihub.backend.app.dao.ProfessorRepository;
import online.unihub.backend.app.entity.Course;
import online.unihub.backend.app.entity.Professor;
import online.unihub.backend.exception.ItemNotFoundException;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class ProfessorService {
    private final ProfessorRepository professorRepository;
    private final StringSimilarityService stringSimilarityService;
    private final CourseService courseService;


    public ProfessorService(ProfessorRepository professorRepository,
                            StringSimilarityService stringSimilarityService,
                            CourseService courseService) {

        this.professorRepository = professorRepository;
        this.stringSimilarityService = stringSimilarityService;
        this.courseService = courseService;
    }


    /**
     *
     */
    public List<Professor> getProfessorsByCourse(String courseName) {
        Course course = courseService.getCourse(courseName);

        return course.getProfessors();
    }


    /**
     *
     */
    public List<Professor> getProfessorsByName(String fullName) {
        fullName = fullName.trim();

        String[] fullNameSplit = fullName.split(" ", 2);
        List<Professor> similarProfs = new LinkedList<>();
        List<Professor> allProfs;

        allProfs = professorRepository.findAll();
        //If user added extra spaces in between
        if (fullNameSplit.length > 1) fullNameSplit[1] = fullNameSplit[1].trim();

        for (Professor prof : allProfs) {
            if (IsSimilarToProf(fullNameSplit[0], prof.getFullName()))
                similarProfs.add(prof);
            else if (fullNameSplit.length > 1 && IsSimilarToProf(fullNameSplit[1], prof.getFullName()))
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


    /**
     *
     */
    private boolean IsSimilarToProf(String input, String profName) {
        String[] fullName = profName.split(" ");

        //Compare input with professor's name
        if (stringSimilarityService.areSimilar(input, fullName[0]))
            return true;
        //Compare input with professor's lastname
        if (stringSimilarityService.areSimilar(input, fullName[1]))
            return true;

        return false;
    }
}