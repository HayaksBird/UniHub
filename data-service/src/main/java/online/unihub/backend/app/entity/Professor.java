package online.unihub.backend.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "professor")
public class Professor {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "university")
    private String university;

    @Column(name = "photo_reference")
    private String photoReference;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REMOVE,
            fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id",
            referencedColumnName = "id")
    private List<Review> reviews;

    @JsonIgnore
    @ManyToMany(mappedBy = "professors")
    private List<Course> courses;
}