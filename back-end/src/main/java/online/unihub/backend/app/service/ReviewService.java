package online.unihub.backend.app.service;

import online.unihub.backend.app.dao.ReviewRepository;
import online.unihub.backend.app.entity.Review;
import online.unihub.backend.exception.ItemNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;


    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }


    public Review getReview(int id) {
        var review = reviewRepository.findById(id);

        if (review.isPresent()) return review.get();
        throw new ItemNotFoundException(Review.class, id);
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