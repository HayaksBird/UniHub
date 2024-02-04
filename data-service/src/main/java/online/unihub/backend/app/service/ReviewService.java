package online.unihub.backend.app.service;

import online.unihub.backend.app.dao.ProfessorRepository;
import online.unihub.backend.app.dao.ReviewRepository;
import online.unihub.backend.app.entity.Professor;
import online.unihub.backend.app.entity.Review;
import online.unihub.backend.exception.ItemNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProfessorRepository professorRepository;


    public ReviewService(ReviewRepository reviewRepository,
                         ProfessorRepository professorRepository) {

        this.reviewRepository = reviewRepository;
        this.professorRepository = professorRepository;
    }


    public List<Review> getProfessorsReviews(int id) {
        var professor = professorRepository.findById(id);

        if (professor.isPresent()) return  professor.get().getReviews();
        throw new ItemNotFoundException(Professor.class, id);
    }


    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }


    public void addReview(Review review) {
        reviewRepository.save(review);
    }


    public void deleteReview(int id) {
        reviewRepository.deleteById(id);
    }
}