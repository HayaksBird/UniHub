package online.unihub.backend.app.dao;

import online.unihub.backend.app.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Integer> {
    Optional<Professor> findByFullName(String fullName);
}
