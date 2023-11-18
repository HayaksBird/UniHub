package online.unihub.backend.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "review")
public class Review {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "professor_id")
    private int profId;

    @Column(name = "review_text")
    private String reviewText;

    @Column(name = "rating")
    private int rating;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "course_id")
    private int courseId;

    @Column(name = "created_at")
    private Timestamp timestamp;
}