package online.unihub.backend.app.controller;

import online.unihub.backend.app.entity.Review;
import online.unihub.backend.app.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/reviews")
@RestController
public class ReviewController {
    private final ReviewService reviewService;


    //CONSTRUCTORS
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    @PostMapping("")
    public ResponseEntity<Void> addReview(@RequestBody Review review) {
        reviewService.addReview(review);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Review> getReview(@PathVariable int id) {
        return new ResponseEntity<>(reviewService.getReview(id), HttpStatus.OK);
    }


    @GetMapping("")
    public ResponseEntity<List<Review>> getReviews() {
        return new ResponseEntity<>(reviewService.getAllReviews(), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable int id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
