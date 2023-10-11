package online.unihub.backend.app.dao;

import online.unihub.backend.app.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
